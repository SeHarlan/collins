import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export type ApiResponseSuccess<T = unknown> = {
  success: true;
  data: T;
}

export type ApiResponseError = {
  success: false;
  error: ApiError;
}

export type ApiResponse<T = unknown> = ApiResponseSuccess<T> | ApiResponseError;


/** Create a success response */
export function successResponse<T>(
  data: T,
  status: number = 200,
): NextResponse<ApiResponseSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  );
}

/** Create an error response */
export function errorResponse(
  message: string,
  status: number = 400,
  code?: string,
  details?: unknown,
): NextResponse<ApiResponseError> {
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
): NextResponse<ApiResponseError> {
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
): NextResponse<ApiResponseError> {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

/**
 * Handle forbidden requests
 */
export function forbiddenResponse(
  message: string = 'Forbidden',
): NextResponse<ApiResponseError> {
  return errorResponse(message, 403, 'FORBIDDEN');
}

/**
 * Handle not found
 */
export function notFoundResponse(
  message: string = 'Resource not found',
): NextResponse<ApiResponseError> {
  return errorResponse(message, 404, 'NOT_FOUND');
}

/**
 * Handle internal server errors
 */
export function serverErrorResponse(
  message: string = 'Internal server error',
  details?: unknown,
): NextResponse<ApiResponseError> {
  // In production, don't expose internal error details
  const isDev = process.env.NODE_ENV === 'development';
  return errorResponse(
    message,
    500,
    'INTERNAL_ERROR',
    isDev ? details : undefined,
  );
}
