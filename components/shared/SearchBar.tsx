"use client";
import { Input } from "@/components/ui/input";
import { Search, X, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import Image from "next/image";
import { useFilterStore } from "@/zustand/stores/search-store";
import { Button } from "../ui/button";

interface Business {
  _id: string;
  businessInfo?: {
    image?: string[];
    name?: string;
    location?: string;
  };
  services?: {
    newInstrumentName: string;
    selectedInstrumentsGroup?: string;
  }[];
}

interface PlaceResult {
  display_name: string;
  address: {
    city?: string;
    state?: string;
    country?: string;
  };
}

interface SearchBarProps {
  variant?: "desktop" | "mobile";
  onResultClick?: () => void;
}

const SearchBar = ({ variant = "desktop", onResultClick }: SearchBarProps) => {
  const router = useRouter();

  // Search functionality state
  const { search, setSearch } = useFilterStore();
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const [location, setLocation] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Update local state when store changes
  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  // Fetch businesses
  const fetchBusinesses = async () => {
    if (!searchQuery.trim() && !location.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (searchQuery.trim()) queryParams.append("search", searchQuery.trim());
      if (location.trim()) queryParams.append("location", location.trim());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/business?${queryParams}`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching businesses:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // OpenStreetMap location suggestions
  useEffect(() => {
    if (!location || location.length < 2) {
      setLocationSuggestions([]);
      setShowLocationDropdown(false);
      return;
    }

    const fetchLocations = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            location
          )}&format=json&addressdetails=1&limit=5`
        );
        const data: PlaceResult[] = await res.json();

        const results = data
          .map((place) => {
            // Only show if city exists
            const city =
              place.address.city ||
              "";
            if (!city) return null;
            const state = place.address.state ? `, ${place.address.state}` : "";
            return `${city}${state}`;
          })
          .filter((v): v is string => v !== null); // remove nulls

        setLocationSuggestions(Array.from(new Set(results)));
        setShowLocationDropdown(results.length > 0);
      } catch (err) {
        console.error(err);
        setLocationSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchLocations, 400);
    return () => clearTimeout(timeout);
  }, [location]);

  const handleLocationSelect = (selected: string) => {
    setLocation(selected);
    setShowLocationDropdown(false);
  };

  // Common handlers
  const handleSearch = () => {
    if (searchQuery.trim() || location.trim()) {
      setSearch(searchQuery.trim());
      fetchBusinesses();
    }
  };

  const handleSearchAndNavigate = () => {
    if (searchQuery.trim() || location.trim()) {
      setSearch(searchQuery.trim());
      router.push(`/search-result`);
      setShowResults(false);
      onResultClick?.();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearch("");
    setShowResults(false);
    setSearchResults([]);
  };

  const clearLocation = () => {
    setLocation("");
    setShowResults(false);
    setShowLocationDropdown(false);
  };

  const handleResultClick = () => {
    setShowResults(false);
    onResultClick?.();
  };

  // Styles (unchanged)
  const containerClass =
    variant === "mobile"
      ? "relative"
      : "hidden md:flex flex-1 max-w-2xl mx-auto items-center relative bg-[#F7F8F8] rounded-lg";
  const inputContainerClass =
    variant === "mobile" ? "flex flex-col" : "flex items-center w-full";
  const searchInputClass =
    variant === "mobile"
      ? "flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
      : "pl-10 w-full h-[48px] focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner rounded-none rounded-l-lg border-none";
  const locationInputClass =
    variant === "mobile"
      ? "flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none "
      : "pl-10 w-full md:w-48 h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg shadow-inner rounded-none";
  const resultsClass =
    variant === "mobile"
      ? "absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto top-full"
      : "absolute z-50 top-14 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto";
  const locationDropdownClass =
    "absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[200px] overflow-y-auto";

  return (
    <div className={containerClass} ref={searchRef}>
      <div className={inputContainerClass}>
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              placeholder="Guitar, strings, restringing..."
              className={searchInputClass}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="h-[35px] border-r border-r-gray-300"></div>

        {/* Location Input */}
        <div className="flex-1 md:flex-none relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() =>
                locationSuggestions.length > 0 && setShowLocationDropdown(true)
              }
              placeholder="Location"
              className={locationInputClass}
            />
            {location && (
              <button
                onClick={clearLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Location Suggestions Dropdown */}
          {showLocationDropdown && locationSuggestions.length > 0 && (
            <div className={locationDropdownClass}>
              <ul>
                {locationSuggestions.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleLocationSelect(item)}
                  >
                    <div className="p-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{item}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div>
          <Button className="h-[48px] -ml-1" onClick={handleSearch}>
            <Search />
          </Button>
        </div>

        {variant === "mobile" && (
          <button
            onClick={handleSearch}
            className="bg-[#00998E] text-white rounded-lg px-4 py-2 hover:bg-teal-700 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className={resultsClass}>
          {isLoading ? (
            <div className="p-4 text-center">Searching...</div>
          ) : searchResults.length === 0 && (searchQuery || location) ? (
            <div className="p-4 text-gray-500">
              No results found {location && `in ${location}`}
            </div>
          ) : (
            <ul>
              {searchResults.slice(0, 5).map((business) => (
                <Link
                  href={`/search-result/${business._id}`}
                  key={business._id}
                >
                  <li
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                    onClick={handleResultClick}
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
              {searchResults.length > 5 && (
                <li
                  className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleSearchAndNavigate();
                    handleResultClick();
                  }}
                >
                  View all {searchResults.length} results
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
