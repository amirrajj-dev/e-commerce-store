import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../configs/env';
import prisma from '../utils/prisma';
import { ApiResponseHelper } from '../helpers/api.helper';
import type { UserWithCart } from '../types/interfaces/user.interface';

declare global {
  namespace Express {
    export interface Request {
      user?: UserWithCart;
    }
  }
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json(ApiResponseHelper.unauthorized('No access token. Please log in.', req.path));
    }

    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, ENV.ACCESS_JWT_SECRET!) as { userId: string };
    } catch (err) {
      return res
        .status(401)
        .json(ApiResponseHelper.unauthorized('Invalid access token. Please log in.', req.path));
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      omit: { password: true },
      include: {
        cartItems: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json(ApiResponseHelper.error('User not found. Please log in.', req.path));
    }

    req.user = user as UserWithCart;
    next();
  } catch (error) {
    next(error);
  }
};

export const adminRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    return res
      .status(403)
      .json(ApiResponseHelper.forbidden('Access denied. Admins only.', req.path));
  }
};
