import type { NextFunction, Request, Response } from 'express';
import { ApiResponseHelper } from '../helpers/api.helper.js';
import { stripe } from '../utils/stripe.js';
import prisma from '../utils/prisma.js';
import { ENV } from '../configs/env.js';
import { createNewCoupon } from '../helpers/create-new-coupon.js';
import { createStripeCoupon } from '../helpers/create-stripe-coupon.js';
import type { CreateCheckoutSessionDto } from '../types/dtos/payment.dto';

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
      await createNewCoupon(req.user!.id);
    }

    return res.status(200).json(
      ApiResponseHelper.success(
        'checkout session created succesfully',
        {
          id: session.id,
          totalAmount: totalAmount / 100,
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

    if (session.metadata.couponCode) {
      await prisma.coupon.update({
        where: { code: session.metadata.couponCode },
        data: { isActive: false },
      });
    }

    const products: { id: string; price: number; quantity: number }[] = JSON.parse(
      session.metadata.products || '[]',
    );

    const newOrder = await prisma.order.create({
      data: {
        userId: session.metadata.userId,
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

    for (const product of products) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          quantity: {
            decrement: product.quantity,
          },
        },
      });
    }

    return res
      .status(200)
      .json(
        ApiResponseHelper.success(
          'Payment successful, order created, product stock updated, and coupon deactivated if used.',
          { orderId: newOrder.id },
          req.path,
        ),
      );
  } catch (error) {
    next(error);
  }
};
