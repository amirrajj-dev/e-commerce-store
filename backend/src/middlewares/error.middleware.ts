import type { Request, Response, NextFunction } from 'express';
import { ApiResponseHelper } from '../helpers/api.helper';
import logger from '../utils/logger';
import { Prisma } from '@prisma/client';
import { ENV } from '../configs/env';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  errors?: any[];
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  logger.error('Unhandled Error', {
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'Resource already exists';
    }
    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Resource not found';
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Validation errors (express-validator)
  if (Array.isArray(err)) {
    statusCode = 400;
    const errorResponse = ApiResponseHelper.error(
      'Validation failed',
      'VALIDATION_ERROR',
      req.path,
    );
    (errorResponse as any).errors = err;
    return res.status(statusCode).json(errorResponse);
  }

  const errorResponse = ApiResponseHelper.error(message, err.code, req.path);

  if (err.errors && Array.isArray(err.errors)) {
    (errorResponse as any).errors = err.errors;
  }

  if (ENV.NODE_ENV !== 'production') {
    (errorResponse as any).stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};
