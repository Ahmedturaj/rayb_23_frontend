import React from "react";

const BusinessCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-4 lg:p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-5">
        {/* Image Skeleton */}
        <div className="flex-shrink-0 w-full sm:w-[200px] h-[160px] sm:h-[200px] rounded-lg bg-gray-200" />

        {/* Content Skeleton */}
        <div className="flex-1 w-full space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded-full" />
            <div className="h-4 w-10 bg-gray-200 rounded" />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
            <div className="h-10 w-24 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BusinessCardSkeleton;
