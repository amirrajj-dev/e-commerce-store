import { redis } from '../utils/redis';

export const storeRefreshToken = async (userId: string, refreshToken: string) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, 'EX', 7 * 24 * 60 * 60);
};
