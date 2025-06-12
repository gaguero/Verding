import { isDev } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Custom error classes
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, code?: string) {
    super(message, 400, code);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_REQUIRED');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, 'INSUFFICIENT_PERMISSIONS');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'RESOURCE_NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, 'RESOURCE_CONFLICT');
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

// Error response interface
interface ErrorResponse {
  error: string;
  message: string;
  code?: string;
  timestamp: string;
  path: string;
  details?: any;
  stack?: string;
}

// Handle Zod validation errors
const handleZodError = (error: ZodError): ValidationError => {
  const message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
  return new ValidationError(`Validation failed: ${message}`, 'VALIDATION_ERROR');
};

// Handle Prisma errors
const handlePrismaError = (error: any): AppError => {
  switch (error.code) {
    case 'P2002':
      return new ConflictError('A record with this data already exists');
    case 'P2025':
      return new NotFoundError('Record not found');
    case 'P2003':
      return new ValidationError('Foreign key constraint failed');
    case 'P2014':
      return new ValidationError('Invalid ID provided');
    default:
      logger.error('Unhandled Prisma error:', error);
      return new InternalServerError('Database operation failed');
  }
};

// Main error handler middleware
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  _next: NextFunction
): void => {
  let appError: AppError;

  // Handle different error types
  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof ZodError) {
    appError = handleZodError(error);
  } else if ((error as any).name === 'PrismaClientKnownRequestError') {
    appError = handlePrismaError(error);
  } else if ((error as any).name === 'PrismaClientValidationError') {
    appError = new ValidationError('Invalid data provided to database');
  } else {
    // Unknown error
    logger.error('Unhandled error:', error);
    appError = new InternalServerError('Something went wrong');
  }

  // Log error
  const logLevel = appError.statusCode >= 500 ? 'error' : 'warn';
  logger[logLevel](
    `${appError.statusCode} - ${appError.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );

  // Prepare error response
  const errorResponse: ErrorResponse = {
    error: appError.constructor.name,
    message: appError.message,
    code: appError.code,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  };

  // Add stack trace in development
  if (isDev && appError.stack) {
    errorResponse.stack = appError.stack;
  }

  // Send error response
  res.status(appError.statusCode).json(errorResponse);
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
