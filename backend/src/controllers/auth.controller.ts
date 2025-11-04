import type { NextFunction, Request, Response } from 'express';
import { validationResult, body } from 'express-validator';
import logger from '../utils/logger';
import { passwordReg } from '../regex/password.regex';
import prisma from '../utils/prisma';
import { ApiResponseHelper } from '../helpers/api.helper';
import bcrypt from 'bcryptjs';
import { ENV } from '../configs/env';
import { generateTokens } from '../helpers/generate-tokens';
import { storeRefreshToken } from '../helpers/store-refresh-token';
import { setCookies } from '../helpers/set-cookie';
import type { SignedUpUser } from '../types/interfaces/user.interface';
import jwt from 'jsonwebtoken';
import { redis } from '../utils/redis';
import type { SignInDto, SignUpDto } from '../types/dtos/auth.dto';

export const signup = [
  body('name')
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage('name must be atleast 6 characters long and most 100 character'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
  body('password')
    .trim()
    .matches(passwordReg)
    .withMessage(
      'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character',
    ),
  async (req: Request<{}, {}, SignUpDto>, res: Response, next: NextFunction) => {
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
      const { name, email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              name,
            },
            {
              email,
            },
          ],
        },
      });
      if (user) {
        return res.status(409).json(ApiResponseHelper.error('user already exists', '', req.path));
      }
      const salt = await bcrypt.genSalt(ENV.SALT ? parseInt(ENV.SALT as string) : 12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        omit: {
          password: true,
        },
      });
      const { accessToken, refreshToken } = generateTokens(newUser.id);
      if (!refreshToken || !accessToken) {
        return res
          .status(500)
          .json(ApiResponseHelper.error('GENERATE_TOKEN_ERROR', 'something goes wrong', req.path));
      }
      await storeRefreshToken(newUser.id, refreshToken as string);
      setCookies(res, accessToken as string, refreshToken as string);
      return res
        .status(200)
        .json(
          ApiResponseHelper.success<SignedUpUser>('User Created Succesfully', newUser, req.path),
        );
    } catch (error) {
      next(error);
    }
  },
];

export const signin = [
  body('email').isEmail().normalizeEmail().withMessage('invalid email format'),
  body('password')
    .trim()
    .matches(passwordReg)
    .withMessage(
      'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character',
    ),
  async (req: Request<{}, {}, SignInDto>, res: Response, next: NextFunction) => {
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
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.status(404).json(ApiResponseHelper.notFound('user not found', req.path));
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json(ApiResponseHelper.unauthorized('invalid credentials', req.path));
      }
      const { accessToken, refreshToken } = generateTokens(user.id);
      if (!refreshToken || !accessToken) {
        return res
          .status(500)
          .json(ApiResponseHelper.error('GENERATE_TOKEN_ERROR', 'something goes wrong', req.path));
      }
      await storeRefreshToken(user.id, refreshToken);
      setCookies(res, accessToken, refreshToken);
      const responseUser = { ...user, password: null };
      return res
        .status(200)
        .json(ApiResponseHelper.success('User Logged In Succesfully', responseUser, req.path));
    } catch (error) {
      next(error);
    }
  },
];

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, ENV.REFRESH_JWT_SECRET!) as { userId: string };
      await redis.del(`refresh_token:${decoded.userId}`);
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json(ApiResponseHelper.success('Logged Out Succesfully'));
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json(ApiResponseHelper.unauthorized('No RefreshToken Provided'));
    }
    const decoded = (await jwt.verify(refreshToken, ENV.REFRESH_JWT_SECRET!)) as { userId: string };
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);
    if (refreshToken !== storedToken) {
      return res.status(401).json(ApiResponseHelper.unauthorized('Invalid Refrsh Token Provided'));
    }
    const accessToken = await jwt.sign({ userId: decoded.userId }, ENV.ACCESS_JWT_SECRET!);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
      secure: ENV.NODE_ENV === 'production',
    });
    return res.status(200).json(ApiResponseHelper.success('token refreshed succesfully'));
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res
      .status(200)
      .json(ApiResponseHelper.success('User profile fetched successfully', req.user));
  } catch (error) {
    next(error);
  }
};
