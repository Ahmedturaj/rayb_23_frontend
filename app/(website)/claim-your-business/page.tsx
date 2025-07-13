import PathTracker from "@/components/shared/PathTracker";
import React from "react";
import ClaimReviewBusiness from "./_components/ClaimReviewBusiness";

const page = () => {
  return (
    <div className="container pt-8 pb-16">
      <div>
        <PathTracker
          title={"Search and claim your business to gain exclusive rights."}
        />
      </div>

      <div>
        <ClaimReviewBusiness />
      </div>
    </div>
  );
};

export default page;
