import Redis from 'ioredis';
import { ENV } from '../configs/env';

export const redis = new Redis(ENV.UPSTASH_REDIS_URL!);
