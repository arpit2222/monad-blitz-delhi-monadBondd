import { AlertCircle, X } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Button } from "./button"

type ErrorAlertProps = {
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
  className?: string;
  retryText?: string;
  closeText?: string;
};

export function ErrorAlert({
  message,
  onRetry,
  onClose,
  className,
  retryText = 'Try Again',
  closeText = 'Dismiss',
}: ErrorAlertProps) {
  return (
    <div
      className={cn(
        'relative rounded-md bg-destructive/15 p-4 text-destructive dark:bg-destructive/25',
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
                onClick={onRetry}
              >
                {retryText}
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:bg-destructive/10"
                onClick={onClose}
              >
                {closeText}
              </Button>
            )}
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </div>
  );
}
