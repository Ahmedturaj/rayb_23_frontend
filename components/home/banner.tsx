"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LocationEdit, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";

interface Service {
  newInstrumentName: string;
  selectedInstrumentsGroup?: string;
  // Add other service properties as needed
}

interface MusicLesson {
  newInstrumentName: string;
  selectedInstrumentsGroupMusic?: string;
  // Add other lesson properties as needed
}

interface BusinessInfo {
  image?: string[];
  name?: string;
  // Add other business info properties as needed
}

interface User {
  _id: string;
  name?: string;
  // Add other user properties as needed
}

interface Business {
  _id: string;
  businessInfo?: BusinessInfo;
  user?: User;
  services?: Service[];
  musicLessons?: MusicLesson[];
  // Add other business properties as needed
}

export default function BannerHome() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, setLocation] = useState<string>("San Francisco, CA");
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Fetch businesses based on search query
  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/business?search=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [debouncedQuery]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-result`);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
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

          <div
            className="relative w-full max-w-[526px] mx-auto lg:mx-0"
            ref={searchRef}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowResults(searchQuery.length > 0)}
                placeholder="Guitar, strings, restringing..."
                className="pl-10 w-full h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center">Searching...</div>
                ) : searchResults.length === 0 && searchQuery ? (
                  <div className="p-4 text-gray-500">No results found</div>
                ) : (
                  <ul>
                    {searchResults.slice(0, 5).map((business) => (
                      <Link
                        href={`/search-result/${business?._id}`}
                        key={business._id}
                      >
                        <li
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            router.push(`/business/${business._id}`);
                            setShowResults(false);
                          }}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-3">
                              {business.businessInfo?.image?.[0] && (
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={business.businessInfo.image[0]}
                                    alt={
                                      business.businessInfo.name ||
                                      "Business image"
                                    }
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="font-medium">
                                  {business.businessInfo?.name ||
                                    "Unknown Business"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {business.services
                                    ?.slice(0, 2)
                                    .map((s) => s.newInstrumentName)
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <li
                        className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                        onClick={handleSearch}
                      >
                        View all {searchResults.length} results
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row justify-center md:justify-between gap-4 md:gap-0">
            <Button className="h-[48px] w-full sm:w-[250px] bg-[#F7F8F8] border border-gray-200 text-black hover:text-white">
              <LocationEdit className="mr-2" />
              <span>{location}</span>
            </Button>

            <Button
              className="h-[48px] w-full sm:w-[250px]"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
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
