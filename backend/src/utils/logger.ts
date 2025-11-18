import winston from 'winston';
import { ENV } from '../configs/env';

const logger = winston.createLogger({
  level: ENV.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  defaultMeta: { service: 'ecommerce-api' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      handleExceptions: true,
    }),
  ],
});

if (ENV.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}

export default logger;
