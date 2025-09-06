import React from "react";

const FilterSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((_, idx) => (
        <div key={idx} className="flex items-center gap-2 animate-pulse">
          <div className="h-4 w-4 rounded-full bg-gray-200" />
          <div className="h-5 w-32 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
};

export default FilterSkeleton;
