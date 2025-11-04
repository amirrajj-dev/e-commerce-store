import morgan from 'morgan';
import logger from './logger';
import { ENV } from '../configs/env';

// Create a stream that uses winston for logging
const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Skip logging in test environment
const skip = () => {
  const env = ENV.NODE_ENV || 'development';
  return env === 'test';
};

// Custom token for user ID
morgan.token('user', (req: any) => req.user?.id || 'anonymous');

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms - user::user',
  { stream, skip },
);

export default morganMiddleware;
