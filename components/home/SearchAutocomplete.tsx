"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Service {
  newInstrumentName: string;
  selectedInstrumentsGroup?: string;
}

interface BusinessInfo {
  image?: string[];
  name?: string;
  location?: string;
}

interface Business {
  _id: string;
  businessInfo?: BusinessInfo;
  services?: Service[];
}

interface SearchAutocompleteProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchAutocomplete({
  searchQuery,
  setSearchQuery,
  onKeyDown,
  placeholder = "Guitar, strings, restringing...",
}: SearchAutocompleteProps) {
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch businesses based on search query
  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        queryParams.append("search", encodeURIComponent(searchQuery));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/business?${queryParams}`
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

    const timeoutId = setTimeout(fetchBusinesses, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
  };

  const handleFocus = () => {
    setShowResults(searchQuery.length > 0);
  };

  const handleBusinessClick = (businessId: string) => {
    router.push(`/business/${businessId}`);
    setShowResults(false);
  };

  return (
    <div className="flex-1 relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowResults(e.target.value.length > 0);
          }}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
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
        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto">
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
                    onClick={() => handleBusinessClick(business._id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        {business.businessInfo?.image?.[0] && (
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={business.businessInfo.image[0]}
                              alt={
                                business.businessInfo.name || "Business image"
                              }
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium">
                            {business.businessInfo?.name || "Unknown Business"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {business.services
                              ?.slice(0, 2)
                              .map((s) => s.newInstrumentName)
                              .join(", ")}
                          </p>
                          {business.businessInfo?.location && (
                            <p className="text-xs text-gray-500 mt-1">
                              📍 {business.businessInfo.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
