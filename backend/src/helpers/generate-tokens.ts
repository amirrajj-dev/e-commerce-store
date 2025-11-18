import jwt from 'jsonwebtoken';
import { ENV } from '../configs/env';
import logger from '../utils/logger';

export const generateTokens = (userId: string) => {
  try {
    const accessToken = jwt.sign({ userId }, ENV.ACCESS_JWT_SECRET!, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ userId }, ENV.REFRESH_JWT_SECRET!, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  } catch (error) {
    logger.error('error signing tokens => ', error instanceof Error ? error.message : error);
    return {
      accessToken: null,
      refreshToken: null,
    };
  }
};
