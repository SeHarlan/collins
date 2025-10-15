import { AxiosResponse } from 'axios';
import { API_ROUTES, QUERY_KEYS } from '@/constants/apiRoutes';
import { AssessmentData } from '@/lib/db/schemas/assessment.schema';
import { ApiResponse } from '@/lib/api/utils/response';
import { AssessmentCreateRequest, AssessmentCreateResponse } from './types';
import { apiClient, parseApiError } from '../utils/client';
import { AuthUser } from '@/lib/auth';

/** Assessment API functions using Axios */
export const assessmentApi = {
  /** Create a new assessment */
  async create(
    assessment: Partial<AssessmentData>,
    authUser: AuthUser | null,
  ): Promise<AssessmentCreateResponse> {
    try {

      if (!authUser) {
        throw new Error('Auth user not provided');
      }

      const response = await apiClient.post<
        ApiResponse<AssessmentCreateResponse>,
        AxiosResponse<ApiResponse<AssessmentCreateResponse>>,
        AssessmentCreateRequest
      >(API_ROUTES.ASSESSMENTS, { assessment, authUser });

      if (response.data.success === false) {
        console.log("🚀 ~ create ~ response.data.success = false:", response.data)
        throw new Error(
          response.data.error.message ||
            'Unknown error occurred while creating assessment',
        );
      }

      return response.data.data;
    } catch (error) {
      throw parseApiError(error);
    }
  },

  //EXAMPLES
  // /** Get assessment by ID */
  // async getById(id: string): Promise<AssessmentData> {
  //   try {
  //     const response: AxiosResponse<ApiResponse<AssessmentData>> =
  //       await apiClient.get(`${API_ROUTES.ASSESSMENTS}/${id}`);

  //     if (!response.data.success) {
  //       throw new Error(
  //         response.data.error?.message || 'Failed to fetch assessment',
  //       );
  //     }

  //     return response.data.data!;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const errorData = error.response
  //         ?.data as ApiResponse<AssessmentApiError>;
  //       throw new Error(errorData?.error?.message || error.message);
  //     }
  //     throw error;
  //   }
  // },

  // /** Get all assessments for a user */
  // async getByUserId(userId: string): Promise<AssessmentData[]> {
  //   try {
  //     const response: AxiosResponse<ApiResponse<AssessmentData[]>> =
  //       await apiClient.get(`${API_ROUTES.ASSESSMENTS}?userId=${userId}`);

  //     if (!response.data.success) {
  //       throw new Error(
  //         response.data.error?.message || 'Failed to fetch assessments',
  //       );
  //     }

  //     return response.data.data!;
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       const errorData = error.response
  //         ?.data as ApiResponse<AssessmentApiError>;
  //       throw new Error(errorData?.error?.message || error.message);
  //     }
  //     throw error;
  //   }
  // },
};

/** TanStack Query keys for assessments */
export const assessmentQueryKeys = {
  all: QUERY_KEYS.ASSESSMENTS,
  byId: (id: string) => QUERY_KEYS.ASSESSMENT(id),
  byUserId: (userId: string) =>
    [...QUERY_KEYS.ASSESSMENTS, 'user', userId] as const,
} as const;
