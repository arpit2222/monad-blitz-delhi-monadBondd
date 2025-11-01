import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from "@/lib/utils"
import { Button } from "./button"

type SuccessAlertProps = {
  message: string;
  onClose?: () => void;
  className?: string;
  autoDismiss?: boolean;
  dismissAfter?: number;
  closeText?: string;
};

export function SuccessAlert({
  message,
  onClose,
  className,
  autoDismiss = true,
  dismissAfter = 5000,
  closeText = 'Dismiss',
}: SuccessAlertProps) {
  useEffect(() => {
    if (autoDismiss && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, dismissAfter);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissAfter, onClose]);

  return (
    <div
      className={cn(
        'relative rounded-md bg-success/15 p-4 text-success-foreground',
        'border border-success/20',
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-0 text-success/70 hover:bg-success/20 hover:text-success"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
      {onClose && autoDismiss && (
        <div className="mt-2 h-0.5 w-full bg-success/10 overflow-hidden">
          <div 
            className="h-full bg-success/50 transition-all duration-[5000ms] ease-linear"
            style={{
              animation: `progress ${dismissAfter}ms linear forwards`,
            }}
          />
          <style jsx>{`
            @keyframes progress {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
