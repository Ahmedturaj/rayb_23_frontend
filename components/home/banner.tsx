"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchStore } from "./states/useSearchStore";
import { SearchForm } from "./SearchForm";

export default function BannerHome() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { location, setLocation } = useSearchStore();
  const router = useRouter();

  const handleSearch = () => {
    const searchLocation = location.trim() || "San Francisco, CA";

    if (searchQuery.trim() || searchLocation) {
      const queryParams = new URLSearchParams();
      if (searchQuery.trim()) {
        queryParams.append("q", searchQuery.trim());
      }
      queryParams.append("location", searchLocation);

      router.push(`/search-result?${queryParams.toString()}`);
    }
  };

  return (
    <section className="py-8 lg:py-20 relative">
      <div className="container flex flex-col lg:flex-row lg:justify-between items-center gap-8">
        {/* Text Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] font-bold leading-tight">
            Bring Your Instrument
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] font-bold text-[#139a8e] leading-tight my-5">
            Back to Life
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-800 font-medium mb-4">
            Find the best instrument repair shops near you.
          </p>

          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            onSearch={handleSearch}
          />
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:-mr-7">
          <Image
            src={"/images/banner.svg"}
            alt="Instrument repair services"
            width={1000}
            height={1000}
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[800px] h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
