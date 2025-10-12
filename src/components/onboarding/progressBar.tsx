"use client";

import { cn } from "@/lib/utils/ui-utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  completed: number;
}

export function ProgressBar({ current, total, className, completed }: ProgressBarProps) {
  const percentage = (completed / total) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}% complete</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
