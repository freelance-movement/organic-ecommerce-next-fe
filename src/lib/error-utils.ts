export type ErrorWithMessage = {
  message: string;
  [key: string]: any;
};

/**
 * Safely extracts error message from any error type
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
    return error.message;
  }
  return 'An unknown error occurred';
}

/**
 * Logger utility for consistent error handling
 */
export const logger = {
  info: (message: string, ...data: any[]) => {
    // In development, still show info logs
    if (process.env.NODE_ENV === 'development') {
      console.info(`[INFO] ${message}`, ...data);
    }
  },
  warn: (message: string, ...data: any[]) => {
    console.warn(`[WARNING] ${message}`, ...data);
  },
  error: (error: unknown, context?: string) => {
    const message = getErrorMessage(error);
    console.error(`[ERROR]${context ? ` [${context}]` : ''} ${message}`);
    
    // Could add error reporting service integration here
    // reportToErrorService(error, context);
  }
};