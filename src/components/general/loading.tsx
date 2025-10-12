import { Loader2Icon } from 'lucide-react';

export const LoadingDisplay = () => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-center font-serif">
        Collins is sipping a pina colada...
      </p>
      <Loader2Icon className="text-primary mx-auto size-12 animate-spin" />
    </div>
  );
};
