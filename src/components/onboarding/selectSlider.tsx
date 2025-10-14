import { FC } from 'react';
import { Slider } from '../ui/slider';
import { OnboardingQuestion } from '@/lib/api/assessments/questions';
import { cn } from '@/lib/utils/ui-utils';
import { Button } from '../ui/button';

interface SelectSliderProps {
  currentValue?: string;
  handleSliderChange: (value: number[]) => void;
  onNext: () => void;
  currentQuestion: OnboardingQuestion;
  withLabels?: boolean;
  onCurrentQuestion: boolean;
}

export const SelectSlider: FC<SelectSliderProps> = ({
  currentValue,
  handleSliderChange,
  onNext,
  currentQuestion,
  withLabels = true,
  onCurrentQuestion,
}) => {
  const currentOption = currentQuestion.options.find(
    (option) => option.value === currentValue,
  );

  const getSliderValue = () => {
    if (currentQuestion.type !== 'slider') return 0;
    const currentIndex = currentQuestion.options.findIndex(
      (option) => option.value === currentValue,
    );
    return currentIndex >= 0 ? currentIndex : 0;
  };

  const handleButtonClick = (value: number) => {
    handleSliderChange([value]);
    if (onCurrentQuestion) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  };

  return (
    <div className="relative space-y-4 pt-6">
      <div
        className="shrink-0"
        style={{
          //half a grid cell plus half the slider thumb width (16px)
          padding: `0 calc(${100 / (currentQuestion.options.length * 2)}% - 8px)`,
        }}
      >
        <Slider
          value={[getSliderValue()]}
          onValueChange={handleSliderChange}
          max={currentQuestion.options.length - 1}
          step={1}
          className="w-full"
        />
      </div>

      {withLabels && (
        <div className="md:hidden">
          <div
            key={currentOption?.value}
            className={cn(
              'h-full flex-col gap-0 p-1 transition-colors duration-500',
              'mx-auto w-fit rounded-md',
              'px-4 py-2 text-center',
              currentValue === currentOption?.value
                ? 'text-foreground bg-primary/50 hover:bg-primary/60'
                : 'text-muted-foreground',
            )}
          >
            <p className="leading-none">
              {currentOption?.label || 'Nothing selected'}
            </p>
            <p className="text-xs">{currentOption?.description || '...'}</p>
          </div>
        </div>
      )}

      {/* Option labels */}
      {withLabels && (
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: `repeat(${currentQuestion.options.length}, minmax(0, 1fr))`,
          }}
        >
          {currentQuestion.options.map((option, index) => (
            <Button
              key={option.value}
              className={cn(
                'h-full w-full flex-col gap-0 p-1 transition-colors duration-500',
                currentValue === option.value
                  ? 'text-foreground bg-primary/50 hover:bg-primary/60'
                  : 'text-muted-foreground',
              )}
              variant="ghost"
              onClick={() => handleButtonClick(index)}
            >
              <p className="leading-none">{option.label}</p>
              <p className="text-xs">{option.description}</p>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
