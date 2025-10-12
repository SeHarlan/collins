'use client';

import { cn } from '@/lib/utils/ui-utils';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  completed: number;
}

export function ProgressBar({
  current,
  total,
  className,
  completed,
}: ProgressBarProps) {
  const percentage = (completed / total) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="text-muted-foreground mb-2 flex items-center justify-between text-sm">
        <span>
          Question {current} of {total}
        </span>
        <span>{Math.round(percentage)}% complete</span>
      </div>
      <div className="bg-muted h-2 w-full rounded-full shadow-inner">
        <div
          className="bg-primary h-full transition-all duration-300 ease-out shadow-md rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
