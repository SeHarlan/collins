import { Loader2Icon } from "lucide-react";

export const LoadingDisplay = () => {
  return (
    <div className="space-y-4">
      <p className="text-center text-muted-foreground font-serif">
        Collins is sipping a pina colada...
      </p>
      <Loader2Icon className="mx-auto text-primary size-12 animate-spin" />
    </div>
  );
}