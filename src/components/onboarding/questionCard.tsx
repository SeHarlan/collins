'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, ButtonHoverWrapper } from '@/components/ui/button';
import { AnimatePresence, motion } from 'motion/react';
import {
  ONBOARDING_QUESTIONS,
  OnboardingQuestion,
} from '@/lib/onboarding/questions';
import { useAtom } from 'jotai';
import {
  onboardingDataAtom,
  onboardingQuestionIndexAtom,
} from '@/lib/state/atoms/onboarding.atom';
import { ProgressBar } from './progressBar';
import { SelectButton } from './selectButton';
import { SelectSlider } from './selectSlider';
import { useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface QuestionCardProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionCard({ onNext, onPrevious }: QuestionCardProps) {
  const [onboardingData, setOnboardingData] = useAtom(onboardingDataAtom);
  const [currentQuestionIndex] = useAtom(onboardingQuestionIndexAtom);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const currentValue = onboardingData[currentQuestion.id];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1;

  const completed = Object.values(onboardingData).filter(
    (value) => value !== undefined,
  ).length;
  const onCurrentQuestion = currentQuestionIndex === completed;

  const handleSelect = (optionValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setOnboardingData((prev) => ({
      ...prev,
      [currentQuestion.id]: optionValue,
    }));

    if (onCurrentQuestion) {
      // if on current question auto-advance
      timeoutRef.current = setTimeout(() => {
        onNext();
      }, 300);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const selectedOption = currentQuestion.options[value[0]];
    if (selectedOption) {
      setOnboardingData((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedOption.value,
      }));
    }
  };

  return (
    <Card className="relative grid h-full max-h-[calc(100dvh-2rem)] w-full flex-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
      <ProgressBar
        current={currentQuestionIndex + 1}
        total={ONBOARDING_QUESTIONS.length}
        completed={completed}
        className="row-start-1 w-full p-6 pb-0"
      />

      <div className="relative row-start-2 min-h-0 py-3">
         <ScrollArea className="h-full [&_[data-slot=scroll-area-viewport]>div:first-child]:h-full">
          <div className="flex h-full flex-col justify-center space-y-6 px-6 py-3">
            <motion.div
              layout
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                duration: 1,
                bounce: 0.5,
              }}
            >
              <CardHeader className="space-y-4 p-0 text-center">
                <p className="hidden text-[5rem] leading-none md:block">
                  {currentQuestion.icon}
                </p>

                <CardTitle className="text-2xl md:text-3xl">
                  {currentQuestion.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm md:text-lg">
                  {currentQuestion.subtitle}
                </CardDescription>
              </CardHeader>
            </motion.div>

            <CardContent className="p-0">
              {currentQuestion.type === 'buttons' && (
                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        duration: 0.8,
                        bounce: 0.5,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        scale: 1.02,
                        // Will be used when gesture starts
                        transition: {
                          duration: 0.9,
                          type: 'spring',
                          bounce: 0.66,
                        },
                      }}
                      className="w-full"
                    >
                      <SelectButton
                        option={option}
                        currentValue={currentValue}
                        handleSelect={handleSelect}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
              {currentQuestion.type === 'slider' && (
                <SelectSlider
                  currentValue={currentValue}
                  handleSliderChange={handleSliderChange}
                  currentQuestion={currentQuestion}
                  onCurrentQuestion={onCurrentQuestion}
                  onNext={onNext}
                />
              )}
            </CardContent>
          </div>
        </ScrollArea>
      </div>

      <div className="row-start-3 flex w-full justify-between gap-4 p-6 pt-0">
        <ButtonHoverWrapper disabled={isFirst}>
          <Button
            type="button"
            variant="secondary"
            onClick={onPrevious}
            disabled={isFirst}
            className="min-w-26"
          >
            Previous
          </Button>
        </ButtonHoverWrapper>
        <ButtonHoverWrapper disabled={!currentValue}>
          <Button
            type="button"
            onClick={onNext}
            disabled={!currentValue}
            className="min-w-26"
          >
            {isLast ? 'Complete' : 'Next'}
          </Button>
        </ButtonHoverWrapper>
      </div>
    </Card>
  );
}
