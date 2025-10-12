/**
 * Assessment API implementation using Axios
 * Provides better error handling, interceptors, and TypeScript support
 */

import axios, { AxiosResponse } from 'axios';
import { API_ROUTES, QUERY_KEYS } from '@/constants/apiRoutes';
import { AssessmentData } from '@/lib/db/schemas/assessment.schema';
import { ApiResponse } from '@/lib/api/utils/response';

/**
 * Assessment API response types
 */
export interface AssessmentCreateResponse {
  message: string;
  assessmentId?: string;
}

export interface AssessmentApiError {
  message: string;
  code?: string;
  details?: unknown;
}

/**
 * Create axios instance with default config
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * Assessment API functions using Axios
 */
export const assessmentApi = {
  /**
   * Create a new assessment
   */
  async create(data: AssessmentData): Promise<AssessmentCreateResponse> {
    try {
      const response: AxiosResponse<ApiResponse<AssessmentCreateResponse>> = 
        await apiClient.post(API_ROUTES.ASSESSMENTS, data);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to create assessment');
      }
      
      return response.data.data!;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ApiResponse<AssessmentApiError>;
        throw new Error(errorData?.error?.message || error.message);
      }
      throw error;
    }
  },

  /**
   * Get assessment by ID
   */
  async getById(id: string): Promise<AssessmentData> {
    try {
      const response: AxiosResponse<ApiResponse<AssessmentData>> = 
        await apiClient.get(`${API_ROUTES.ASSESSMENTS}/${id}`);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to fetch assessment');
      }
      
      return response.data.data!;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ApiResponse<AssessmentApiError>;
        throw new Error(errorData?.error?.message || error.message);
      }
      throw error;
    }
  },

  /**
   * Get all assessments for a user
   */
  async getByUserId(userId: string): Promise<AssessmentData[]> {
    try {
      const response: AxiosResponse<ApiResponse<AssessmentData[]>> = 
        await apiClient.get(`${API_ROUTES.ASSESSMENTS}?userId=${userId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to fetch assessments');
      }
      
      return response.data.data!;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ApiResponse<AssessmentApiError>;
        throw new Error(errorData?.error?.message || error.message);
      }
      throw error;
    }
  },
};

/**
 * TanStack Query keys for assessments
 */
export const assessmentQueryKeys = {
  all: QUERY_KEYS.ASSESSMENTS,
  byId: (id: string) => QUERY_KEYS.ASSESSMENT(id),
  byUserId: (userId: string) => [...QUERY_KEYS.ASSESSMENTS, 'user', userId] as const,
} as const;
