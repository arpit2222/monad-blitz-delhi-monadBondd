"use client";

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
          <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
          <p className="mb-6 text-muted-foreground">
            We're sorry, but an unexpected error occurred. Please try again later.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
          {this.state.error && (
            <details className="mt-4 text-left text-sm text-muted-foreground">
              <summary className="cursor-pointer">Error details</summary>
              <pre className="mt-2 overflow-auto rounded bg-muted p-2 text-xs">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }
  }
};

// Client component wrapper for the error boundary
const ErrorBoundary = ({ children, fallback, onError }: Props) => {
  return <ErrorBoundaryClass fallback={fallback} onError={onError}>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<{ error: Error | null }>
) => {
  return (props: P) => (
    <ErrorBoundary 
      fallback={
        FallbackComponent ? (
          <FallbackComponent error={null} />
        ) : undefined
      }
    >
      <Component {...props} />
    </ErrorBoundary>
  );
};
