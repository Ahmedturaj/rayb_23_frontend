import React from "react";
import FilterInfo from "./filter-and-business/filter-info";
import BusinessInfo from "./filter-and-business/business-info";
import { FilterDrawer } from "./filter-and-business/drawer";

const SearchComponent = () => {
  return (
    <div className="min-h-[calc(100vh-300px)]">
      {/* for desktop version */}
      <div className="hidden lg:block">
        <div className="flex items-start gap-8 ">
          <div className="w-[20%] flex items-start justify-between sticky top-36 z-40">
            <div >
              <FilterInfo />
            </div>

            <div className="border-r-2 border-[#e7e9e9] min-h-screen"></div>
          </div>

          <div className="flex-1">
            <BusinessInfo />
          </div>
        </div>
      </div>

      {/* for mobile version */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="font-bold text-xl">Search Results</h1>
          </div>

          <div>
            <FilterDrawer />
          </div>
        </div>

        <div className="pt-6">
          <BusinessInfo />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
