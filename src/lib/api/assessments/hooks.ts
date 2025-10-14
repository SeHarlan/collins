import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  assessmentApi,
  assessmentQueryKeys,
} from './client-services';
import { AssessmentData } from '@/lib/db/schemas/assessment.schema';
import { AssessmentCreateResponse } from './types';
import { usePrivy } from '@privy-io/react-auth';
import { useAuth, useRequireAuth } from '@/lib/auth/hooks';

/** Hook to create a new assessment */
export function useCreateAssessment() {
  const queryClient = useQueryClient();
  const { authUser } = useAuth();

  return useMutation({
    mutationFn: (data: Partial<AssessmentData>) => assessmentApi.create(data, authUser),
    onSuccess: (data) => {
      // Invalidate and refetch assessments queries
      queryClient.invalidateQueries({ queryKey: assessmentQueryKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to create assessment:', error);
    },
  });
}



//EXAMPLES
// /** Hook to get assessment by ID */
// export function useAssessment(id: string, enabled: boolean = true) {
//   return useQuery({
//     queryKey: assessmentQueryKeys.byId(id),
//     queryFn: () => assessmentApi.getById(id),
//     enabled: enabled && !!id,
//   });
// }

// /** Hook to get assessments by user ID */
// export function useAssessmentsByUserId(
//   userId: string,
//   enabled: boolean = true,
// ) {
//   return useQuery({
//     queryKey: assessmentQueryKeys.byUserId(userId),
//     queryFn: () => assessmentApi.getByUserId(userId),
//     enabled: enabled && !!userId,
//   });
// }
