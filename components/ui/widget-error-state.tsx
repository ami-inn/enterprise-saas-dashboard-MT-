import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";

interface WidgetErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  className?: string;
}

export const WidgetErrorState: React.FC<WidgetErrorStateProps> = ({
  title = "Failed to load data",
  message = "An error occurred while fetching widget data from the endpoint.",
  onRetry,
  className = "",
}) => {
  return (
    <div className={`rounded-lg border border-rose-200/80 bg-rose-50/40 p-4 text-center dark:border-rose-900/50 dark:bg-rose-950/20 ${className}`}>
      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300">
        <AlertCircle className="h-4 w-4" />
      </div>
      <p className="mt-2 text-xs font-semibold text-rose-900 dark:text-rose-200">{title}</p>
      <p className="mt-0.5 text-[11px] text-rose-700 dark:text-rose-300/80 max-w-sm mx-auto">{message}</p>
      <div className="mt-3">
        <Button
          size="xs"
          variant="outline"
          onClick={onRetry}
          className="border-rose-200 bg-white text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:bg-zinc-900 dark:text-rose-300 gap-1.5 font-medium"
        >
          <RefreshCw className="h-3 w-3 text-rose-600" />
          Retry Request
        </Button>
      </div>
    </div>
  );
};
