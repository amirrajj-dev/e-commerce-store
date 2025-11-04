import type { Response } from 'express';
import { ENV } from '../configs/env';

export const setCookies = async (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: ENV.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refreshToken', refreshToken, {
    sameSite: 'strict',
    secure: ENV.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
