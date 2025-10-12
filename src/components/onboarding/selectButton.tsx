import { FC } from 'react';
import { Button } from '../ui/button';
import { OnboardingOption } from '@/lib/onboarding/questions';
import { cn } from '@/lib/utils/ui-utils';

interface SelectButtonProps {
  option: OnboardingOption;
  currentValue?: string;
  handleSelect: (value: string) => void;
}

export const SelectButton: FC<SelectButtonProps> = ({
  option,
  currentValue,
  handleSelect,
}) => {
  return (
    <Button
      key={option.value}
      type="button"
      variant={currentValue === option.value ? 'default' : 'outline'}
      className={cn(
        'w-full h-auto justify-start px-4 py-3 text-left md:py-4',
        currentValue === option.value && 'ring-primary ring-2 ring-offset-2',
      )}
      onClick={() => handleSelect(option.value)}
    >
      <div className="flex w-full items-center gap-3">
        {option.icon && <span className="text-2xl">{option.icon}</span>}
        <div className="">
          <p className="">{option.label}</p>
          {option.description && (
            <p
              className={cn(
                'text-muted-foreground text-sm',
                currentValue === option.value && 'text-primary-foreground/66',
              )}
            >
              {option.description}
            </p>
          )}
        </div>
      </div>
    </Button>
  );
};
