import AddBusiness from "@/components/business/common/AddBusiness";
import PathTracker from "@/components/shared/PathTracker";
import React from "react";

const page = () => {
  return (
    <div className="container pt-8 pb-16">
      <div>
        <PathTracker
          title={"Please fill out all the details of the business."}
        />
      </div>

      <div className=" border-b border-gray-200 pt-8"></div>

      {/* add functionality here */}
      <div className="pt-8">
        <AddBusiness />
      </div>
    </div>
  );
};

export default page;
