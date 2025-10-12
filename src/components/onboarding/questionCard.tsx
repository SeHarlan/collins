"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils/ui-utils";
import { ONBOARDING_QUESTIONS, OnboardingQuestion } from "@/lib/onboarding/questions";
import { useAtom } from "jotai";
import { onboardingDataAtom, onboardingQuestionIndexAtom } from "@/lib/state/atoms/onboarding.atom";
import { ProgressBar } from "./progressBar";
import { SelectButton } from "./selectButton";
import { SelectSlider } from "./selectSlider";
import { useRef } from "react";

interface QuestionCardProps {
  onNext: () => void;
  onPrevious: () => void;
}

export function QuestionCard({ 
  onNext, 
  onPrevious, 
}: QuestionCardProps) {
  const [onboardingData, setOnboardingData] = useAtom(onboardingDataAtom);
  const [currentQuestionIndex] = useAtom(onboardingQuestionIndexAtom);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];
  const currentValue = onboardingData[currentQuestion.id];
  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === ONBOARDING_QUESTIONS.length - 1;
  
  const completed = Object.values(onboardingData).filter(value => value !== undefined).length;
  const onCurrentQuestion = currentQuestionIndex === completed;

  const handleSelect = (optionValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setOnboardingData(prev => ({
      ...prev,
      [currentQuestion.id]: optionValue
    }));

    if (onCurrentQuestion) {
      // if on current question auto-advance
      timeoutRef.current = setTimeout(() => {
        onNext();
      }, 500);
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
    <Card>
      <CardHeader className="space-y-4 text-center">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={ONBOARDING_QUESTIONS.length}
          completed={completed}
        />

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

      <CardContent className="space-y-6">
        <div>
          <label className="sr-only">{currentQuestion.title}</label>
          <div>
            {currentQuestion.type === 'buttons' && (
              <div className="grid gap-3">
                {currentQuestion.options.map((option) => (
                  <SelectButton
                    option={option}
                    currentValue={currentValue}
                    handleSelect={handleSelect}
                  />
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
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onPrevious}
            disabled={isFirst}
            className="min-w-26"
          >
            Previous
          </Button>

          <Button
            type="button"
            onClick={onNext}
            disabled={!currentValue}
            className="min-w-26"
          >
            {isLast ? 'Complete' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
