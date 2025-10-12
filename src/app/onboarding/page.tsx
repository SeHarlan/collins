"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { LoadingDisplay } from "@/components/general/loading";
import { useRequireAuth } from "@/lib/auth/hooks";
import { WelcomeCard } from "@/components/onboarding/welcomeCard";
import { QuestionCard } from "@/components/onboarding/questionCard";
import { CompletionCard } from "@/components/onboarding/completionCard";
import { 
  onboardingQuestionIndexAtom, 
  onboardingDataAtom, 
  onboardingCompletedAtom, 
  onboardingStartedAtom
} from "@/lib/state/atoms/onboarding.atom";
import { ONBOARDING_QUESTIONS } from "@/lib/onboarding/questions";
import { CLIENT_PATHWAYS } from "@/constants/clientPathways";
import { Button } from "@/components/ui/button";

type OnboardingStep = 'welcome' | 'questions' | 'completion';

export default function OnboardingPage() {
  const { user, authReady } = useRequireAuth();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useAtom(onboardingQuestionIndexAtom);
  const [started, setStarted] = useAtom(onboardingStartedAtom);
  const [completed, setCompleted] = useAtom(onboardingCompletedAtom);
  const [onboardingData, setOnboardingData] = useAtom(onboardingDataAtom);

  // Derive state from currentQuestionIndex
  const currentStep: OnboardingStep =
    !started
      ? 'welcome'
      : currentQuestionIndex >= ONBOARDING_QUESTIONS.length
        ? 'completion'
        : 'questions';
  

  useEffect(() => {
    // Redirect to dashboard if onboarding is completed
    if (completed) {
      router.push(CLIENT_PATHWAYS.DASHBOARD);
      return;
    }    
  }, [completed, router]);

  const handleStart = () => {
    setCurrentQuestionIndex(0);
    setStarted(true);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const reset = () => {
    setCurrentQuestionIndex(0);
    setStarted(false);
    setCompleted(false);
    setOnboardingData({});
  };



  if (!authReady || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingDisplay />
      </div>
    );
  }
  
  return (
    <div className="bg-muted flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {currentStep === 'welcome' && <WelcomeCard onStart={handleStart} />}
        {currentStep === 'questions' && (
          <QuestionCard onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 'completion' && (
          <CompletionCard onPrevious={handlePrevious} />
        )}
        <Button variant="link" onClick={reset} className="mx-auto block text-muted-foreground">restart</Button>
      </div>
    </div>
  );
}