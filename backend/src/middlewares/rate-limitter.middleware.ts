import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../utils/redis';
import type Redis from 'ioredis';

export const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: Parameters<Redis['call']>) =>
      redis.call(...args) as Promise<import('rate-limit-redis').RedisReply>,
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, slow down!' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: Parameters<Redis['call']>) =>
      redis.call(...args) as Promise<import('rate-limit-redis').RedisReply>,
  }),
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts, try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
