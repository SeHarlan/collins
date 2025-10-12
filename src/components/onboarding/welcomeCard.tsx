"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "./progressBar";
import { FC } from "react";
import { ONBOARDING_QUESTIONS } from "@/lib/onboarding/questions";

interface WelcomeCardProps {
  onStart: () => void;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ onStart }) => {
  const totalQuestions = ONBOARDING_QUESTIONS.length;
  return (
    <Card>
      <CardHeader className="space-y-4 text-center">
        <ProgressBar current={0} total={totalQuestions} completed={0} />

        <p className="text-[5rem] leading-none">🐢</p>

        <CardTitle className="text-2xl md:text-3xl">
          Let's tailor your experience
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm md:text-lg">
          in under 1 minute
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3 text-center">
          <div className="text-lg font-medium">
            We'll ask you {totalQuestions} quick questions about:
          </div>
          <div className="text-muted-foreground grid grid-cols-2 gap-4 text-sm">
            <div>• Your experience level</div>
            <div>• Investment timeline</div>
            <div>• Risk tolerance</div>
            <div>• Financial goals</div>
          </div>
        </div>

        <Button type="button" onClick={onStart} size="lg" className="w-full">
          Start Assessment
        </Button>
      </CardContent>
    </Card>
  );
}
