import { atomWithStorage } from 'jotai/utils';
import { AssessmentData } from '@/lib/db/schemas/assessment.schema';

// Onboarding state atoms with persistence
export const onboardingQuestionIndexAtom = atomWithStorage<number>('onboarding-question-index', 0);
export const onboardingDataAtom = atomWithStorage<Partial<AssessmentData>>('onboarding-data', {});
export const onboardingCompletedAtom = atomWithStorage<boolean>('onboarding-completed', false);
export const onboardingStartedAtom = atomWithStorage<boolean>('onboarding-started', false);

