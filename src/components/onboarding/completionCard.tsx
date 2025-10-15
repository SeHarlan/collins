'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, ButtonHoverWrapper } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  onboardingCompletedAtom,
  onboardingDataAtom,
} from '@/lib/state/atoms/onboarding.atom';
import { useRouter } from 'next/navigation';
import { CLIENT_PATHWAYS } from '@/constants/clientPathways';
import { ONBOARDING_QUESTIONS } from '@/lib/api/assessments/questions';
import { ProgressBar } from './progressBar';
import { ArrowLeftIcon } from 'lucide-react';
import { useCreateAssessment } from '@/lib/api/assessments/hooks';
import { toast } from 'sonner';
import { useAuth } from '@/lib/auth/hooks';



interface CompletionCardProps {
  onPrevious: () => void;
}

export function CompletionCard({ onPrevious }: CompletionCardProps) {
  const router = useRouter();
  const [onboardingData] = useAtom(onboardingDataAtom);
  const [_, setCompleted] = useAtom(onboardingCompletedAtom);
  const { authUser } = useAuth();

  const createAssessmentMutation = useCreateAssessment();

  const getRiskProfile = () => {
    //placeholder risk profile
    const riskFactors = [];

    if (
      onboardingData.maxDrawdown === '5_percent' ||
      onboardingData.maxDrawdown === '10_percent'
    ) {
      riskFactors.push('conservative');
    }
    if (
      onboardingData.portfolioDropReaction === 'sell_everything' ||
      onboardingData.portfolioDropReaction === 'sell_some'
    ) {
      riskFactors.push('risk-averse');
    }
    if (
      onboardingData.investingExperience === 'none' ||
      onboardingData.investingExperience === 'beginner'
    ) {
      riskFactors.push('beginner');
    }

    if (riskFactors.length >= 2) return 'Conservative';
    if (riskFactors.length === 1) return 'Moderate';
    return 'Aggressive';
  };

  const riskProfile = getRiskProfile();

  const handleSave = async () => {
    if (!authUser) return;
    try {
      // Transform onboarding data to assessment data

      await createAssessmentMutation.mutateAsync(onboardingData);

      toast.success('Congratulations!', {
        description: 'You can now start investing.',
      });
      setCompleted(true);
      router.push(CLIENT_PATHWAYS.DASHBOARD);
    } catch (_error) {
      // Request error handling is managed by TanStack Query
      toast.error('Something went wrong.', {
        description: 'Please refresh the page and try again.',
      });
    }
  };

  return (
    <Card className="w-full space-y-6">
      <ProgressBar
        current={ONBOARDING_QUESTIONS.length}
        total={ONBOARDING_QUESTIONS.length}
        completed={ONBOARDING_QUESTIONS.length}
        className="p-6"
      />
      <CardHeader className="space-y-4 py-0 text-center">
        <div className="hidden text-[5rem] leading-none md:block">🎉</div>
        <CardTitle className="text-2xl md:text-3xl">
          Assessment Complete!
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm md:text-lg">
          Based on your answers, here&apos;s your ideal setup
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 py-0">
        <div className="bg-muted rounded-lg p-6 text-center">
          <p className="text-primary mb-2 text-2xl font-bold">
            {riskProfile} Portfolio
          </p>
          <p className="text-muted-foreground">
            You can adjust the risk profile later at any time
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Key Insights:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Experience Level:</span>
              <span className="font-medium capitalize">
                {onboardingData.investingExperience?.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Horizon:</span>
              <span className="font-medium">
                {onboardingData.timeHorizon?.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk Tolerance:</span>
              <span className="font-medium">{riskProfile}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="flex gap-4 p-6">
        <ButtonHoverWrapper>
          <Button
            type="button"
            onClick={onPrevious}
            variant="secondary"
            size="lg"
            className="w-12 p-0"
          >
            <ArrowLeftIcon />
          </Button>
        </ButtonHoverWrapper>
        <ButtonHoverWrapper disabled={createAssessmentMutation.isPending} className="w-full" scale={1.015}>
          <Button
            onClick={handleSave}
            type="submit"
            size="lg"
            className="w-full"
            disabled={createAssessmentMutation.isPending}
          >
            {createAssessmentMutation.isPending ? 'Saving...' : 'Save & Continue'}
          </Button>
        </ButtonHoverWrapper>
      </div>
    </Card>
  );
}
