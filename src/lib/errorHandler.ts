import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'APP_ERROR',
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ValidationError extends AppError {
  constructor(
    message: string = 'Validation failed',
    public fields?: Record<string, string[]>
  ) {
    super(message, 'VALIDATION_ERROR', { fields });
    this.name = 'ValidationError';
  }
}

export const handleError = (error: unknown, context: string = 'Operation') => {
  console.error(`[${context}] Error:`, error);
  
  if (error instanceof AppError) {
    switch (error.code) {
      case 'NETWORK_ERROR':
        toast.error('Network Error', {
          description: 'Unable to connect to the server. Please check your connection.',
        });
        break;
      case 'VALIDATION_ERROR':
        toast.error('Validation Error', {
          description: error.message || 'Please check your input and try again.',
        });
        break;
      default:
        toast.error('Error', {
          description: error.message || 'An unexpected error occurred.',
        });
    }
  } else if (error instanceof Error) {
    toast.error('Error', {
      description: error.message || 'An unexpected error occurred.',
    });
  } else {
    toast.error('Error', {
      description: 'An unexpected error occurred. Please try again.',
    });
  }
  
  return error;
};

export const safeJsonParse = <T>(json: string): { data: T } | { error: Error } => {
  try {
    return { data: JSON.parse(json) };
  } catch (error) {
    return { 
      error: new AppError(
        'Failed to parse response', 
        'PARSE_ERROR', 
        { originalError: error instanceof Error ? error.message : String(error) }
      ) 
    };
  }
};

export const safeFetch = async <T>(
  input: RequestInfo | URL, 
  init?: RequestInit
): Promise<{ data: T } | { error: Error }> => {
  try {
    const response = await fetch(input, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AppError(
        errorData.message || `Request failed with status ${response.status}`,
        `HTTP_${response.status}`,
        { status: response.status, ...errorData }
      );
    }

    const responseData = await response.json() as T;
    return { data: responseData };
  } catch (error) {
    if (error instanceof AppError) {
      return { error };
    }
    return { 
      error: new NetworkError(
        error instanceof Error ? error.message : 'Network request failed'
      ) 
    };
  }
};
