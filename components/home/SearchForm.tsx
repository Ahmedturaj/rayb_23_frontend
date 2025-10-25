"use client";

import React, { useRef, useEffect, KeyboardEvent } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { LocationAutocomplete } from "./LocationAutocomplete";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (location: string) => void;
  onSearch: () => void;
}

export function SearchForm({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  onSearch,
}: SearchFormProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        // Results will be closed by individual components
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div
      className="relative w-full lg:max-w-[540px] mx-auto lg:mx-0"
      ref={searchRef}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <SearchAutocomplete
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="mt-5 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
        <div className="lg:w-1/2 sm:flex-none">
          <LocationAutocomplete
            location={location}
            setLocation={setLocation}
            onKeyDown={handleKeyPress}
          />
        </div>

        <div className="lg:w-1/2">
          <Button
            className="h-[48px] w-full bg-[#00998E] text-white hover:bg-teal-700"
            onClick={onSearch}
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
