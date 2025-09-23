"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { logger } from "@/lib/error-utils";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary component for handling errors in the UI
 */
export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(error, "ErrorBoundary");
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center bg-red-50 rounded-lg">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        We apologize for the inconvenience. Please try again or contact support if the problem persists.
      </p>
      <Button 
        onClick={reset}
        className="bg-viet-green-medium hover:bg-viet-green-dark text-white"
      >
        Try again
      </Button>
    </div>
  );
}