import { memo } from "react";

export const LoadingSpinner = memo(() => {
  return (
    <div className="pt-20 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Skeleton */}
        <div className="relative h-96 md:h-[500px] bg-gray-200 rounded-3xl overflow-hidden animate-pulse mb-8">
          <div className="absolute bottom-8 left-8 right-8">
            <div className="h-8 bg-gray-300 rounded w-32 mb-4"></div>
            <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="flex gap-4">
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
              <div className="h-6 bg-gray-300 rounded w-28"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Author Card Skeleton */}
          <div className="p-8">
            <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-2xl animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-48"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="px-8 pb-8 space-y-6 animate-pulse">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            <div className="h-48 bg-gray-200 rounded-xl"></div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          {/* Tags Skeleton */}
          <div className="px-8 pb-8">
            <div className="p-6 bg-gray-50 rounded-2xl animate-pulse">
              <div className="h-6 bg-gray-300 rounded w-16 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-300 rounded-full w-20"></div>
                <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                <div className="h-8 bg-gray-300 rounded-full w-16"></div>
              </div>
            </div>
          </div>

          {/* Social Share Skeleton */}
          <div className="px-8 pb-8">
            <div className="p-6 bg-gray-50 rounded-2xl animate-pulse">
              <div className="flex justify-between items-center">
                <div className="h-10 bg-gray-300 rounded w-24"></div>
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-300 rounded"></div>
                  <div className="h-10 w-10 bg-gray-300 rounded"></div>
                  <div className="h-10 w-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";
