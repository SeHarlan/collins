'use client';

import { useState, useEffect, FC } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { LoadingDisplay } from '@/components/general/loading';
import { useRequireAuth } from '@/lib/auth/hooks';
import { WelcomeCard } from '@/components/onboarding/welcomeCard';
import { QuestionCard } from '@/components/onboarding/questionCard';
import { CompletionCard } from '@/components/onboarding/completionCard';
import {
  onboardingQuestionIndexAtom,
  onboardingDataAtom,
  onboardingCompletedAtom,
  onboardingIdAtom,
} from '@/lib/state/atoms/onboarding.atom';
import { ONBOARDING_QUESTIONS } from '@/lib/api/assessments/questions';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

type OnboardingStep = 'welcome' | 'questions' | 'completion';

export default function OnboardingPage() {
  const { authUser, authReady } = useRequireAuth();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useAtom(
    onboardingQuestionIndexAtom,
  );
  
  const [onboardingId, setOnboardingId] = useAtom(onboardingIdAtom);
  const [completed, setCompleted] = useAtom(onboardingCompletedAtom);
  const setOnboardingData = useSetAtom(onboardingDataAtom);
  const [direction, setDirection] = useState(1);

  // Derive state from currentQuestionIndex
  const currentStep: OnboardingStep = !onboardingId
    ? 'welcome'
    : currentQuestionIndex >= ONBOARDING_QUESTIONS.length
      ? 'completion'
      : 'questions';

  const handleStart = () => {
    if (!authUser?.privyId) {
      return;
    }

    setCurrentQuestionIndex(0);
    setOnboardingId(authUser.privyId);
    setDirection(1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setDirection(1);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setDirection(-1);
    }
  };

  const reset = () => {
    setDirection(-1);
    setCurrentQuestionIndex(0);
    setOnboardingId('');
    setCompleted(false);
    setOnboardingData({});
  };

  useEffect(() => {
    if (!authUser?.privyId || !onboardingId) return;

    // If user has changed reset the onboarding process
    if (onboardingId !== authUser.privyId) {
      reset();
    }
  }, [authUser?.privyId, onboardingId]);

  useEffect(() => {
    // Redirect to dashboard if onboarding is completed
    if (completed) {
      // router.push(CLIENT_PATHWAYS.DASHBOARD);
      return;
    }
  }, [completed, router]);


  if (!authReady || !authUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <LoadingDisplay />
      </div>
    );
  }

  return (
    <div className="bg-muted flex h-screen flex-col items-center justify-center">
      <div className="relative flex h-198 w-full max-w-xl p-4 sm:h-225">
        {currentStep === 'welcome' && (
          <CardWrapper direction={direction}>
            <WelcomeCard onStart={handleStart} />
          </CardWrapper>
        )}

        {currentStep === 'questions' && (
          <CardWrapper direction={direction}>
            <QuestionCard onNext={handleNext} onPrevious={handlePrevious} />
          </CardWrapper>
        )}

        {currentStep === 'completion' && (
          <CardWrapper direction={1}>
            <CompletionCard onPrevious={handlePrevious} />
          </CardWrapper>
        )}
      </div>
      <Button
        variant="link"
        onClick={reset}
        className="text-muted-foreground fixed bottom-4 mx-auto block"
      >
        restart
      </Button>
    </div>
  );
}

interface CardWrapperProps {
  children: React.ReactNode;
  direction: number;
}

const CardWrapper: FC<CardWrapperProps> = ({ children }) => { 
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95}}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
      className="h-full w-full flex justify-center items-center"
    >
      {children}
    </motion.div>
  );
}