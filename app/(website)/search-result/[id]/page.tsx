"use client";
import PathTracker from "@/components/shared/PathTracker";
import { getSingleBusiness } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import BusinessDetails from "../_component/BusinessDetails";

const Page = () => {
  const { id } = useParams();

  const { data: singleBusiness = {}, isLoading } = useQuery({
    queryKey: ["get-single-business"],
    queryFn: async () => {
      const res = await getSingleBusiness(id);
      return res.data;
    },
  });

  return (
    <div className=" container">
      <div className="py-5">
        <PathTracker
          title=""
          header={singleBusiness?.businessInfo?.name}
          id={singleBusiness?._id}
          isLoading={isLoading}
        />
      </div>

      {singleBusiness?.businessInfo && (
        <BusinessDetails singleBusiness={singleBusiness} />
      )}
    </div>
  );
};

export default Page;
