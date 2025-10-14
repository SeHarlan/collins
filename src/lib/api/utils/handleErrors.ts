import { API_MESSAGES } from "@/constants/apiMessages";
import { errorResponse, serverErrorResponse, unauthorizedResponse } from "./response";

export const handleErrorResponse = (error: unknown) => {
  if (error instanceof Error) {
    // Handle authentication errors specifically
    if (error.message === API_MESSAGES.AUTH_REQUIRED_ERROR) {
      return unauthorizedResponse(error.message);
    }
    return errorResponse(error.message, 400);
  }

  return serverErrorResponse('Failed to save assessment', error);
};