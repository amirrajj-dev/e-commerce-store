import type { NextFunction, Request, Response } from 'express';
import type { CreateCartDto, DeleteCartDto } from '../types/dtos/cart.dto';
import prisma from '../utils/prisma';
import { ApiResponseHelper } from '../helpers/api.helper';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';

export const getCartProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId: req.user!.id,
      },
      include: {
        product: true,
      },
    });
    return res
      .status(200)
      .json(ApiResponseHelper.success('Cart Items Fetched Successfully', cartItems, req.path));
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (
  req: Request<{}, {}, CreateCartDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.body;
    const existingCart = req.user?.cartItems.find(
      (item) => String(item.productId) === String(productId),
    );
    if (existingCart) {
      // first check the quantity of the product is less than the existing cart quantity + 1
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      if (!product) {
        return res
          .status(404)
          .json(ApiResponseHelper.error('PRODUCT_NOT_FOUND', 'Product not found', req.path));
      }
      if (product.quantity < existingCart.quantity + 1) {
        return res
          .status(400)
          .json(
            ApiResponseHelper.error(
              'INSUFFICIENT_STOCK',
              'Not enough stock available for this product',
              req.path,
            ),
          );
      }
      await prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: req.user!.id,
            productId,
          },
        },
        data: {
          quantity: existingCart.quantity + 1,
        },
      });
      return res
        .status(200)
        .json(ApiResponseHelper.success('Product Cart Quantity Updated Succesfully'));
    } else {
      await prisma.cartItem.create({
        data: {
          productId,
          userId: req.user!.id,
        },
      });
      return res
        .status(201)
        .json(ApiResponseHelper.success('Product Added To The Cart Succesfully'));
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (
  req: Request<{}, {}, DeleteCartDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.body;
    await prisma.cartItem.delete({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId,
        },
      },
    });
    return res
      .status(200)
      .json(ApiResponseHelper.success('Product Removed From The Cart Succesfully'));
  } catch (error) {
    next(error);
  }
};

export const updateProductQuantity = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  async (
    req: Request<{ id: string }, {}, { quantity: number }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`Validation errors: ${JSON.stringify(errors.array())}`);
        return res
          .status(400)
          .json(
            ApiResponseHelper.error(
              'VALIDATION_ERROR',
              JSON.parse(JSON.stringify(errors.array())),
              req.path,
            ),
          );
      }
      const { id } = req.params;
      const existingCart = req.user?.cartItems.find(
        (item) => String(item.productId) === String(id),
      );
      if (!existingCart) {
        return res
          .status(404)
          .json(ApiResponseHelper.error('CART_ITEM_NOT_FOUND', 'Cart item not found', req.path));
      }
      const { quantity } = req.body;
      const product = await prisma.product.findUnique({
        where: {
          id,
        },
      });
      if (!product) {
        return res
          .status(404)
          .json(ApiResponseHelper.error('PRODUCT_NOT_FOUND', 'Product not found', req.path));
      }
      if (product.quantity < quantity) {
        return res
          .status(400)
          .json(
            ApiResponseHelper.error(
              'INSUFFICIENT_STOCK',
              'Not enough stock available for this product',
              req.path,
            ),
          );
      }
      await prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: req.user!.id,
            productId: id,
          },
        },
        data: {
          quantity,
        },
      });
      return res
        .status(200)
        .json(ApiResponseHelper.success('Product Cart Quantity Updated Succesfully'));
    } catch (error) {
      next(error);
    }
  },
];
