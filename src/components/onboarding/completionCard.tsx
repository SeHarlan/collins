"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { onboardingCompletedAtom, onboardingDataAtom } from "@/lib/state/atoms/onboarding.atom";
import { useRouter } from "next/navigation";
import { CLIENT_PATHWAYS } from "@/constants/clientPathways";
import { ONBOARDING_QUESTIONS } from "@/lib/onboarding/questions";
import { ProgressBar } from "./progressBar";
import { ArrowLeftIcon } from "lucide-react";
import { useCreateAssessment } from "@/lib/api/hooks/useAssessments";
import { AssessmentData } from "@/lib/db/schemas/assessment.schema";
import { toast } from "sonner";

interface CompletionCardProps {
  onPrevious: () => void;
}

export function CompletionCard({ 
  onPrevious, 
}: CompletionCardProps) {
  const router = useRouter();
  const [onboardingData] = useAtom(onboardingDataAtom);
  const [_, setCompleted] = useAtom(onboardingCompletedAtom);

  const createAssessmentMutation = useCreateAssessment();
  
  const getRiskProfile = () => {
    //placeholder risk profile
    const riskFactors = [];
    
    if (onboardingData.maxDrawdown === '5_percent' || onboardingData.maxDrawdown === '10_percent') {
      riskFactors.push('conservative');
    }
    if (onboardingData.portfolioDropReaction === 'sell_everything' || onboardingData.portfolioDropReaction === 'sell_some') {
      riskFactors.push('risk-averse');
    }
    if (onboardingData.investingExperience === 'none' || onboardingData.investingExperience === 'beginner') {
      riskFactors.push('beginner');
    }
    
    if (riskFactors.length >= 2) return 'Conservative';
    if (riskFactors.length === 1) return 'Moderate';
    return 'Aggressive';
  };

  const riskProfile = getRiskProfile();

  const handleSave = async () => {
    try {
      // Transform onboarding data to assessment data
      const assessmentData: AssessmentData = {
        userId: 'temp-user-id', // TODO: Get actual user ID from auth context
        timeHorizon: onboardingData.timeHorizon!,
        maxDrawdown: onboardingData.maxDrawdown!,
        portfolioDropReaction: onboardingData.portfolioDropReaction!,
        incomeStability: onboardingData.incomeStability!,
        emergencyFundMonths: onboardingData.emergencyFundMonths!,
        investingExperience: onboardingData.investingExperience!,
        cryptoComfort: onboardingData.cryptoComfort!,
        goalCriticality: onboardingData.goalCriticality!,
        pastLossReaction: onboardingData.pastLossReaction!,
        rebalancingWillingness: onboardingData.rebalancingWillingness!,
      };

      await createAssessmentMutation.mutateAsync(assessmentData);
      
      toast.success('Assessment saved successfully!', {
        description: 'You can now start investing',
      });
      setCompleted(true);
      router.push(CLIENT_PATHWAYS.DASHBOARD);
    } catch (error) {
      console.error('Failed to save assessment:', error);
      // Error handling is managed by TanStack Query
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-4 text-center">
        <ProgressBar
          current={ONBOARDING_QUESTIONS.length}
          total={ONBOARDING_QUESTIONS.length}
          completed={ONBOARDING_QUESTIONS.length}
        />
        <div className="hidden text-[5rem] leading-none md:block">🎉</div>
        <CardTitle className="text-2xl md:text-3xl">
          Assessment Complete!
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm md:text-lg">
          Based on your answers, here's your ideal setup
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
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

        <div className="flex gap-4">
          <Button
            type="button"
            onClick={onPrevious}
            variant="secondary"
            size="lg"
            className="w-12 p-0"
          >
            <ArrowLeftIcon />
          </Button>
          <Button 
            onClick={handleSave} 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={createAssessmentMutation.isPending}
          >
            {createAssessmentMutation.isPending ? 'Saving...' : 'Save & Continue'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
