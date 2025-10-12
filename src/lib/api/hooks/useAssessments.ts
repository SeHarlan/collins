import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  assessmentApi,
  assessmentQueryKeys,
  AssessmentCreateResponse,
} from '../assessments';
import { AssessmentData } from '@/lib/db/schemas/assessment.schema';

/**
 * Hook to create a new assessment
 */
export function useCreateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssessmentData) => assessmentApi.create(data),
    onSuccess: (data: AssessmentCreateResponse) => {
      // Invalidate and refetch assessments queries
      queryClient.invalidateQueries({ queryKey: assessmentQueryKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to create assessment:', error);
    },
  });
}

/**
 * Hook to get assessment by ID
 */
export function useAssessment(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: assessmentQueryKeys.byId(id),
    queryFn: () => assessmentApi.getById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to get assessments by user ID
 */
export function useAssessmentsByUserId(
  userId: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: assessmentQueryKeys.byUserId(userId),
    queryFn: () => assessmentApi.getByUserId(userId),
    enabled: enabled && !!userId,
  });
}
