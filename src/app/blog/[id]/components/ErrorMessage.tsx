import { memo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = memo<ErrorMessageProps>(({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="pt-20 py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          {/* Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {message}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRefresh}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="px-8 py-3"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ErrorMessage.displayName = "ErrorMessage";
