"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { MapPin, X } from "lucide-react";

interface LocationAutocompleteProps {
  location: string;
  setLocation: (location: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

interface CountryData {
  country: string;
  cities: string[];
}

export function LocationAutocomplete({
  location,
  setLocation,
  onKeyDown,
  placeholder = "San Francisco, CA",
}: LocationAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allCities, setAllCities] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all cities on component mount
  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.json();

        if (data.error === false && data.data) {
          const cities = data.data.flatMap(
            (country: CountryData) => country.cities
          );
          setAllCities(cities);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchAllCities();
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    const filterSuggestions = () => {
      if (!location || location.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsLoading(true);
      try {
        const filteredCities = allCities
          .filter((city) => city.toLowerCase().includes(location.toLowerCase()))
          .slice(0, 10);

        setSuggestions(filteredCities);
        setShowSuggestions(filteredCities.length > 0);
      } catch (error) {
        console.error("Error filtering locations:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(filterSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [location, allCities]);

  const handleLocationSelect = (selectedCity: string) => {
    setLocation(selectedCity);
    setShowSuggestions(false);
  };

  const clearLocation = () => {
    setLocation("San Francisco, CA");
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (location.length >= 2 && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
        <Input
          ref={inputRef}
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="pl-10 w-full h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner"
        />
        {location && location !== "San Francisco, CA" && (
          <button
            onClick={clearLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear location"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Location Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">Loading locations...</div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-gray-500">No locations found</div>
          ) : (
            <ul>
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleLocationSelect(city)}
                >
                  <div className="p-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{city}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
