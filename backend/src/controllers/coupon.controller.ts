import type { NextFunction, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { ApiResponseHelper } from '../helpers/api.helper';
import { body, validationResult } from 'express-validator';
import logger from '../utils/logger';
import type { CreateCouponDto, ValidateCouponDto } from '../types/dtos/coupon.dto';

export const getCoupon = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: {
        userId: req.user!.id,
      },
    });
    return res
      .status(200)
      .json(ApiResponseHelper.success('Coupon Fetched Succesfully', coupon || null, req.path));
  } catch (error) {
    next(error);
  }
};

export const validateCoupon = [
  body('code').trim().notEmpty().withMessage('Coupon code is required'),
  async (req: Request<{}, {}, ValidateCouponDto>, res: Response, next: NextFunction) => {
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

      const { code } = req.body;

      const coupon = await prisma.coupon.findUnique({ where: { code } });

      if (!coupon) {
        return res.status(404).json(ApiResponseHelper.notFound('Coupon not found', req.path));
      }

      if (!coupon.isActive) {
        return res
          .status(406)
          .json(ApiResponseHelper.error('INACTIVE_COUPON', 'Coupon is inactive', req.path));
      }

      if (coupon.expirationDate < new Date()) {
        return res
          .status(406)
          .json(ApiResponseHelper.error('EXPIRED_ERROR', 'Coupon has expired', req.path));
      }

      return res.status(200).json(ApiResponseHelper.success('Valid coupon'));
    } catch (error) {
      next(error);
    }
  },
];

export const createCoupon = async (
  req: Request<{}, {}, CreateCouponDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, discountPercentage, expirationDate, userId } = req.body;

    const newCoupon = await prisma.coupon.create({
      data: {
        code,
        discountPercentage,
        expirationDate: new Date(expirationDate),
        userId,
      },
    });

    return res
      .status(201)
      .json(ApiResponseHelper.success('Coupon created successfully', newCoupon, req.path));
  } catch (error) {
    next(error);
  }
};
