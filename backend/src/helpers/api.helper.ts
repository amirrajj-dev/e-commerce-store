import type { ApiResponse } from '../types/api/api.response';
import logger from '../utils/logger';

export class ApiResponseHelper {
  static success<T>(message: string, data?: T, path: string = '/'): ApiResponse<T> {
    logger.info('API Success', {
      message,
      path,
      data: data ? 'present' : 'absent',
    });

    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
      path,
    };
  }

  static error(message: string, error?: string, path: string = '/'): ApiResponse {
    logger.warn('API Error', {
      message,
      error,
      path,
    });

    return {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
      path,
    };
  }

  static created<T>(message: string, data?: T, path: string = '/'): ApiResponse<T> {
    logger.info('Resource Created', {
      message,
      path,
      data: data ? 'present' : 'absent',
    });

    return this.success(message, data, path);
  }

  static notFound(message: string = 'Resource not found', path: string = '/'): ApiResponse {
    logger.warn('Not Found', {
      message,
      path,
    });

    return this.error(message, 'NOT_FOUND', path);
  }

  static unauthorized(message: string = 'Unauthorized', path: string = '/'): ApiResponse {
    logger.warn('Unauthorized', {
      message,
      path,
    });

    return this.error(message, 'UNAUTHORIZED', path);
  }

  static badRequest(message: string = 'Bad request', path: string = '/'): ApiResponse {
    logger.warn('Bad Request', {
      message,
      path,
    });

    return this.error(message, 'BAD_REQUEST', path);
  }

  static forbidden(message: string = 'Forbidden', path: string = '/'): ApiResponse {
    logger.warn('Forbidden', {
      message,
      path,
    });

    return this.error(message, 'FORBIDDEN', path);
  }

  static validationError(message: string = 'Validation failed', path: string = '/'): ApiResponse {
    logger.warn('Validation Error', {
      message,
      path,
    });

    return this.error(message, 'VALIDATION_ERROR', path);
  }

  static internalError(message: string = 'Internal server error', path: string = '/'): ApiResponse {
    logger.error('Internal Server Error', {
      message,
      path,
    });

    return this.error(message, 'INTERNAL_ERROR', path);
  }
}
