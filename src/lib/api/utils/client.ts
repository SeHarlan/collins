import axios from "axios";
import { ApiResponseError } from "./response";

/** Create axios instance with default config */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const parseApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorData: ApiResponseError = error.response?.data;
    return new Error(errorData.error.message || error.message);
  }

  // Handle different types of non-axios errors
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === 'string') {
    return new Error(error);
  }

  if (typeof error === 'object' && error !== null) {
    // Try to extract meaningful message from object
    const errorObj = error as Record<string, unknown>;
    if (errorObj.message && typeof errorObj.message === 'string') {
      return new Error(errorObj.message);
    }
    if (errorObj.error && typeof errorObj.error === 'string') {
      return new Error(errorObj.error);
    }
    if (errorObj.reason && typeof errorObj.reason === 'string') {
      return new Error(errorObj.reason);
    }
  }

  // Fallback for unknown error types
  return new Error('An unexpected error occurred');
};