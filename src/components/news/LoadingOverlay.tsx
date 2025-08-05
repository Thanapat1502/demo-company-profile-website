"use client";

import { getLoadingText } from "@/utils/bilingual";

interface LoadingOverlayProps {
  locale: string;
  context?: string;
}

export default function LoadingOverlay({ locale, context = "news" }: LoadingOverlayProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">
          {getLoadingText(locale, context)}
        </p>
      </div>
    </div>
  );
}

// News Card Skeleton
export function NewsCardSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-100/50 rounded-lg overflow-hidden animate-pulse">
      <div className="p-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>

        {/* Image skeleton */}
        <div className="h-40 bg-gray-200 rounded-lg mb-6"></div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>

          {/* Meta skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="w-px h-3 bg-gray-200"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// News Grid Skeleton
export function NewsGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </div>
  );
}
