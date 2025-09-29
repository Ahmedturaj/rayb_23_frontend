"use client";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";
import { useFilterStore } from "@/zustand/stores/search-store";

interface Business {
  _id: string;
  businessInfo?: {
    image?: string[];
    name?: string;
  };
  services?: {
    newInstrumentName: string;
    selectedInstrumentsGroup?: string;
  }[];
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
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);

  // Update local state when store changes
  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

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
      setSearch(searchQuery.trim());
      router.push(`/search-result`);
      setShowResults(false);
      onResultClick?.();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearch("");
    setShowResults(false);
    setSearchResults([]);
  };

  const handleResultClick = () => {
    setShowResults(false);
    onResultClick?.();
  };

  const handleInputFocus = () => {
    setShowResults(searchQuery.length > 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  // Styles based on variant
  const containerClass = variant === "mobile" 
    ? "relative" 
    : "hidden md:flex flex-1 max-w-xl mx-auto items-center relative";

  const inputContainerClass = variant === "mobile"
    ? "flex items-center bg-[#F7F8F8] rounded-xl shadow-inner overflow-hidden"
    : "relative w-full";

  const inputClass = variant === "mobile"
    ? "flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
    : "pl-10 w-full h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner";

  const resultsClass = variant === "mobile"
    ? "absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto"
    : "absolute z-50 top-14 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto";

  return (
    <div className={containerClass} ref={searchRef}>
      <div className={inputContainerClass}>
        {variant === "desktop" && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
        )}
        {variant === "mobile" && (
          <Search className="ml-3 text-gray-500 h-5 w-5" />
        )}
        
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={handleInputFocus}
          placeholder="Guitar, strings, restringing..."
          className={inputClass}
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={variant === "mobile" ? "px-3 text-gray-500 hover:text-gray-700" : "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"}
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className={resultsClass}>
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
                    onClick={handleResultClick}
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
                  onClick={() => {
                    handleSearch();
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