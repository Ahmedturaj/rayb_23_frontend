"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BusinessCard from "../BusinessCard";
import BusinessCardSkeleton from "./BusinessCardSkeleton";
import TagsAndOpenNow from "./tags-open-now";
import ResultsFiltering from "./results-fiiltering";
import Pagination from "./Pagination";
import AddBusinessSection from "@/components/shared/AddBusinessSection";
import { useFilterStore } from "@/zustand/stores/search-store";

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

  const {
    familyTag,
    instrumentTag,
    serviceTag,
    minPriceRange,
    maxPriceRange,
    offers,
    open,
    sort,
    search
  } = useFilterStore();

  const { data: allBusiness = {}, isLoading } = useQuery({
    queryKey: [
      "get-all-business",
      page,
      familyTag,
      instrumentTag,
      serviceTag,
      minPriceRange,
      maxPriceRange,
      offers,
      open,
      sort,
      search
    ],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/business?page=${page}&limit=${limit}&instrumentFamily=${familyTag}&selectedInstrumentsGroup=${instrumentTag}&newInstrumentName=${serviceTag}&minPrice=${minPriceRange}&maxPrice=${maxPriceRange}&buyInstruments=${offers}&sellInstruments=${offers}&offerMusicLessons=${offers}&openNow=${open}&sort=${sort}&search=${search}`
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
        {isLoading ? (
          [...Array(limit)].map((_, i) => <BusinessCardSkeleton key={i} />)
        ) : allBusiness.data && allBusiness.data.length > 0 ? (
          allBusiness.data.map((business: Business) => (
            <BusinessCard business={business} key={business._id} />
          ))
        ) : (
          <div className="text-center text-gray-500 min-h-[450px] flex flex-col items-center justify-center">
            <p className="text-xl">No businesses found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {allBusiness.data && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={(p) => setPage(p)}
        />
      )}

      <AddBusinessSection />
    </div>
  );
};

export default BusinessInfo;
