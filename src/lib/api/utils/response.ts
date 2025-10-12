import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  message: string,
  status: number = 400,
  code?: string,
  details?: unknown,
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        code,
        details,
      },
    },
    { status },
  );
}

/**
 * Handle Zod validation errors
 */
export function validationErrorResponse(
  error: ZodError,
): NextResponse<ApiResponse> {
  return errorResponse(
    'Validation failed',
    400,
    'VALIDATION_ERROR',
    error.flatten(),
  );
}

/**
 * Handle unauthorized requests
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized',
): NextResponse<ApiResponse> {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

/**
 * Handle forbidden requests
 */
export function forbiddenResponse(
  message: string = 'Forbidden',
): NextResponse<ApiResponse> {
  return errorResponse(message, 403, 'FORBIDDEN');
}

/**
 * Handle not found
 */
export function notFoundResponse(
  message: string = 'Resource not found',
): NextResponse<ApiResponse> {
  return errorResponse(message, 404, 'NOT_FOUND');
}

/**
 * Handle internal server errors
 */
export function serverErrorResponse(
  message: string = 'Internal server error',
  details?: unknown,
): NextResponse<ApiResponse> {
  // In production, don't expose internal error details
  const isDev = process.env.NODE_ENV === 'development';
  return errorResponse(
    message,
    500,
    'INTERNAL_ERROR',
    isDev ? details : undefined,
  );
}
