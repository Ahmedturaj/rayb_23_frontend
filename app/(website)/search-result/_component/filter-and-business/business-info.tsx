"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BusinessCard from "../BusinessCard";
import BusinessCardSkeleton from "./BusinessCardSkeleton";
import TagsAndOpenNow from "./tags-open-now";
import ResultsFiltering from "./results-fiiltering";
import Pagination from "./Pagination";
import AddBusinessSection from "@/components/shared/AddBusinessSection";

interface BusinessItem {
  email: string;
  name: string;
  image: string[];
  address: string;
  phone: string;
  website: string;
  description: string;
}

interface Service {
  newInstrumentName: string;
  price: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  services: Service[];
}

const BusinessInfo = () => {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const { data: allBusiness = {}, isLoading } = useQuery({
    queryKey: ["get-all-business", page],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/business?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      return data;
    },
  });

  const totalPages = Math.ceil((allBusiness?.pagination?.total || 0) / limit);

  return (
    <div>
      <ResultsFiltering />
      <TagsAndOpenNow />

      <div className="space-y-6 mt-8">
        {isLoading
          ? [...Array(limit)].map((_, i) => <BusinessCardSkeleton key={i} />)
          : allBusiness.data?.map((business: Business) => (
              <BusinessCard business={business} key={business._id} />
            ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
      />

      <AddBusinessSection />
    </div>
  );
};

export default BusinessInfo;
