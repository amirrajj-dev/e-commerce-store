import type { NextFunction, Request, Response } from 'express';
import { ApiResponseHelper } from '../helpers/api.helper.js';
import { stripe } from '../utils/stripe.js';
import prisma from '../utils/prisma.js';
import { ENV } from '../configs/env.js';
import { createNewCoupon } from '../helpers/create-new-coupon.js';
import { createStripeCoupon } from '../helpers/create-stripe-coupon.js';
import type { CreateCheckoutSessionDto } from '../types/dtos/payment.dto';
import { Prisma } from '@prisma/client';
import logger from '../utils/logger.js';

export const createCheckoutSession = async (
  req: Request<{}, {}, CreateCheckoutSessionDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json(ApiResponseHelper.error('', 'Invalid or empty products array', req.path));
    }

    let totalAmount = 0;

    const lineItems = products.map((product) => {
      const amount = Math.round(product.price * 100); // cents
      totalAmount += amount * (product.quantity || 1);

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        },
        quantity: product.quantity || 1,
      };
    });

    let coupon = null;
    let stripeCouponId: string | null = null;

    if (couponCode) {
      coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, userId: req.user?.id, isActive: true },
      });

      if (coupon) {
        stripeCouponId = await createStripeCoupon(coupon.discountPercentage); // Must return a string
        totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${ENV.FRONTEND_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ENV.FRONTEND_URL}/purchase-cancel`,
      discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
      metadata: {
        userId: req.user?.id?.toString() ?? '',
        couponCode: couponCode || '',
        products: JSON.stringify(
          products.map((p) => ({
            id: p.id,
            quantity: p.quantity,
            price: p.price,
          })),
        ),
      },
    });

    if (totalAmount >= 20000) {
      // 20000 cents = 200$
      await createNewCoupon(req.user!.id, totalAmount / 100);
    }

    return res.status(200).json(
      ApiResponseHelper.success(
        'checkout session created succesfully',
        {
          id: session.id,
          totalAmount: totalAmount / 100,
          url: session.url,
        },
        req.path,
      ),
    );
  } catch (error) {
    next(error);
  }
};

export const checkoutSuccess = async (
  req: Request<{}, {}, { sessionId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sessionId } = req.body;
    logger.info(`Processing checkout success for session: ${sessionId}`);

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res
        .status(400)
        .json(ApiResponseHelper.error('PAYMENT_ERROR', 'Payment not completed', req.path));
    }

    if (!session.metadata?.userId) {
      return res
        .status(400)
        .json(ApiResponseHelper.error('MISSING_METADATA', 'User ID missing in session metadata'));
    }

    // Use transaction to handle race conditions atomically
    const result = await prisma.$transaction(
      async (tx) => {
        // Check if order already exists WITHIN the transaction
        const existingOrder = await tx.order.findUnique({
          where: { stripeSessionId: sessionId },
        });

        if (existingOrder) {
          logger.warn(`Order already exists for session: ${sessionId}`);
          return {
            orderId: existingOrder.id,
            totalAmount: existingOrder.totalAmount,
            isNew: false,
          };
        }

        logger.info(`Creating new order for session: ${sessionId}`);

        // Parse products
        const products: { id: string; price: number; quantity: number }[] = JSON.parse(
          session?.metadata?.products || '[]',
        );

        // Deactivate coupon if used
        if (session?.metadata?.couponCode) {
          logger.info(`Deactivating coupon: ${session.metadata.couponCode}`);

          const updateResult = await tx.coupon.updateMany({
            where: {
              code: session.metadata.couponCode,
              isActive: true, // Only update active coupons
            },
            data: { isActive: false },
          });

          logger.info(`Coupons deactivated: ${updateResult.count}`);
        }

        // Create the order
        const newOrder = await tx.order.create({
          data: {
            userId: (session?.metadata?.userId as string) || (req?.user?.id as string),
            totalAmount: (session.amount_total ?? 0) / 100,
            stripeSessionId: sessionId,
            orderItems: {
              create: products.map((product) => ({
                productId: product.id,
                quantity: product.quantity,
                price: product.price,
              })),
            },
          },
        });

        logger.info(`Order created: ${newOrder.id}`);

        // Update product quantities
        for (const product of products) {
          console.log('Updating product stock:', product.id, 'quantity:', product.quantity);
          await tx.product.update({
            where: { id: product.id },
            data: {
              quantity: {
                decrement: product.quantity,
              },
            },
          });
        }

        return {
          orderId: newOrder.id,
          totalAmount: newOrder.totalAmount,
          isNew: true,
        };
      },
      {
        // Increase timeout for complex transactions
        timeout: 30000,
      },
    );

    const message = result.isNew
      ? 'Payment successful, order created, product stock updated, and coupon deactivated if used.'
      : 'Order already processed successfully.';

    logger.info(message);

    return res.status(200).json(
      ApiResponseHelper.success(
        message,
        {
          orderId: result.orderId,
          totalAmount: result.totalAmount,
        },
        req.path,
      ),
    );
  } catch (error) {
    console.error('Error in checkoutSuccess:', error);

    // specific Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Unique constraint violation - order already exists
        logger.error('P2002 error - order already exists, fetching existing order');
        try {
          const existingOrder = await prisma.order.findUnique({
            where: { stripeSessionId: req.body.sessionId },
          });

          if (existingOrder) {
            return res.status(200).json(
              ApiResponseHelper.success(
                'Order processed successfully.',
                {
                  orderId: existingOrder.id,
                  totalAmount: existingOrder.totalAmount,
                },
                req.path,
              ),
            );
          }
        } catch (findError) {
          console.error('Error finding existing order:', findError);
        }
      }
    }

    next(error);
  }
};
