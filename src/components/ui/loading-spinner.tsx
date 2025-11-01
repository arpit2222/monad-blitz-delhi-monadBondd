import React from "react"
import { cn } from "@/lib/utils"

type LoadingSpinnerProps = {
  className?: string;
  text?: string;
  percentage?: number;
  showBackdrop?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export function LoadingSpinner({
  className,
  text = 'Loading...',
  percentage,
  showBackdrop = false,
  size = 'md',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-2',
      showBackdrop && 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50',
      className
    )}>
      <div className="relative">
        <div
          className={cn(
            'animate-spin rounded-full border-t-transparent',
            sizeClasses[size],
            'border-primary',
            'dark:border-primary/50'
          )}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
        {percentage !== undefined && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${textSizes[size]} font-medium`}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      {text && (
        <p className={`${textSizes[size]} text-muted-foreground`}>
          {text}
        </p>
      )}
    </div>
  );
}
