"use client";

import { useEffect } from "react";
import { Users, AlertCircle, RefreshCw } from "lucide-react";
import { useExecutiveStore } from "@/store/zustand/executiveStore";
import { getLoadingText } from "@/utils/bilingual";
import ExecutiveCard from "./ExecutiveCard";
import { useTranslations } from "next-intl";

interface ExecutiveGridProps {
  locale: string;
  variant?: "minimal" | "detailed" | "compact";
  className?: string;
}

export default function ExecutiveGrid({
  locale,
  variant = "minimal",
  className = "",
}: ExecutiveGridProps) {
  const { executiveMembers, loading, error, fetchExecutiveMembers } =
    useExecutiveStore();
  const t = useTranslations();

  useEffect(() => {
    if (!executiveMembers.length) {
      fetchExecutiveMembers();
    }
  }, [executiveMembers.length, fetchExecutiveMembers]);

  // Empty state
  if (!executiveMembers.length) {
    return (
      <div className={`text-center p-12 ${className}`}>
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t("common.noExecutiveInfo")}
        </h3>
        <p className="text-gray-500">
          {t("common.noExecutiveInfoDescription")}
        </p>
      </div>
    );
  }

  // Grid layout based on variant
  const getGridClass = () => {
    switch (variant) {
      case "compact":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";
      case "detailed":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    }
  };

  // Custom layout for md screens: first row 2 columns centered, second row 3 columns centered
  const renderCustomMdLayout = () => {
    const firstRowItems = executiveMembers.slice(0, 2);
    const secondRowItems = executiveMembers.slice(2, 5);
    const remainingItems = executiveMembers.slice(5);

    return (
      <div>
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            {t("company.navigation.team")}
          </h2>

          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-px bg-[var(--primary-blue)]"></div>
          </div>
        </div>
        <div className={`space-y-6 ${className}`}>
          {/* First row: 2 columns centered */}
          {firstRowItems.length > 0 && (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
                {firstRowItems.map((executive, index) => (
                  <ExecutiveCard
                    key={executive.id}
                    executive={executive}
                    locale={locale}
                    index={index}
                    variant={variant}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Second row: 3 columns centered */}
          {secondRowItems.length > 0 && (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                {secondRowItems.map((executive, index) => (
                  <ExecutiveCard
                    key={executive.id}
                    executive={executive}
                    locale={locale}
                    index={index + 2}
                    variant={variant}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Remaining items: regular grid */}
          {remainingItems.length > 0 && (
            <div className={getGridClass()}>
              {remainingItems.map((executive, index) => (
                <ExecutiveCard
                  key={executive.id}
                  executive={executive}
                  locale={locale}
                  index={index + 5}
                  variant={variant}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return renderCustomMdLayout();
}

// Loading skeleton component
export function ExecutiveGridSkeleton({
  variant = "minimal",
  count = 6,
}: {
  variant?: "minimal" | "detailed" | "compact";
  count?: number;
}) {
  const getSkeletonHeight = () => {
    switch (variant) {
      case "compact":
        return "h-20";
      case "detailed":
        return "h-80";
      default:
        return "h-64";
    }
  };

  const renderSkeletonItem = (index: number) => (
    <div
      key={index}
      className={`bg-white border border-gray-100/50 animate-pulse ${getSkeletonHeight()}`}>
      <div className="p-6 h-full flex flex-col">
        {variant === "compact" ? (
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Header skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
            </div>

            {/* Image skeleton */}
            <div className="relative mb-6">
              <div
                className={`${
                  variant === "detailed" ? "w-32 h-32" : "w-24 h-24"
                } mx-auto bg-gray-200 rounded-full`}></div>
            </div>

            {/* Content skeleton */}
            <div className="text-center space-y-3 flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>

              {variant === "detailed" && (
                <div className="flex justify-center space-x-3 pt-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Custom layout matching the main component
  const firstRowCount = Math.min(count, 2);
  const secondRowCount = Math.min(count - firstRowCount, 3);
  const remainingCount = Math.max(0, count - firstRowCount - secondRowCount);

  return (
    <div className="space-y-8">
      {/* First row: 2 columns centered */}
      {firstRowCount > 0 && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
            {Array.from({ length: firstRowCount }).map((_, index) =>
              renderSkeletonItem(index)
            )}
          </div>
        </div>
      )}

      {/* Second row: 3 columns centered */}
      {secondRowCount > 0 && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            {Array.from({ length: secondRowCount }).map((_, index) =>
              renderSkeletonItem(index + firstRowCount)
            )}
          </div>
        </div>
      )}

      {/* Remaining items: regular grid */}
      {remainingCount > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: remainingCount }).map((_, index) =>
            renderSkeletonItem(index + firstRowCount + secondRowCount)
          )}
        </div>
      )}
    </div>
  );
}
