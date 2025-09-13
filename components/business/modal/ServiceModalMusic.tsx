"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInstrumentTypes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface ServiceModalProps {
  newInstrumentName: string;
  setNewInstrumentName: (value: string) => void;
  handleAddInstrumentMusic: () => void;
  setServiceModalMusic: (value: boolean) => void;
  pricingType: string;
  setPricingType: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  selectedInstrumentsGroup: string;
  selectedInstrumentsGroupMusic: string;
}

const ServiceModalMusic: React.FC<ServiceModalProps> = ({
  newInstrumentName,
  setNewInstrumentName,
  handleAddInstrumentMusic,
  setServiceModalMusic,
  pricingType,
  setPricingType,
  price,
  setPrice,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedInstrumentsGroup,
  selectedInstrumentsGroupMusic,
}) => {
  const { data: instrumentTypes = [] } = useQuery<string[]>({
    queryKey: [
      "get-instrument-instrument",
      selectedInstrumentsGroup,
      selectedInstrumentsGroupMusic,
    ],
    queryFn: async () => {
      const res = await getInstrumentTypes(
        selectedInstrumentsGroup,
        selectedInstrumentsGroupMusic
      );
      return res?.data?.serviceType as string[];
    },
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    instrumentName: "",
    price: "",
    minPrice: "",
    maxPrice: "",
  });

  // Validate numeric input (positive numbers only)
  const validateNumber = (value: string): boolean => {
    if (value === "") return true;
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0;
  };

  // Handle price change with validation
  const handlePriceChange = (value: string) => {
    // Allow empty string or valid numbers
    if (value === "" || validateNumber(value)) {
      setPrice(value);
      setErrors({ ...errors, price: "" });
    }
  };

  // Handle min price change with validation
  const handleMinPriceChange = (value: string) => {
    if (value === "" || validateNumber(value)) {
      setMinPrice(value);
      
      // Validate if max price exists and is less than min price
      if (maxPrice && value && parseFloat(value) > parseFloat(maxPrice)) {
        setErrors({ ...errors, minPrice: "Min price cannot be higher than max price", maxPrice: "Max price cannot be lower than min price" });
      } else {
        setErrors({ ...errors, minPrice: "", maxPrice: "" });
      }
    }
  };

  // Handle max price change with validation
  const handleMaxPriceChange = (value: string) => {
    if (value === "" || validateNumber(value)) {
      setMaxPrice(value);
      
      // Validate if min price exists and is greater than max price
      if (minPrice && value && parseFloat(value) < parseFloat(minPrice)) {
        setErrors({ ...errors, maxPrice: "Max price cannot be lower than min price", minPrice: "Min price cannot be higher than max price" });
      } else {
        setErrors({ ...errors, maxPrice: "", minPrice: "" });
      }
    }
  };

  // Validate the entire form before submission
  const validateForm = (): boolean => {
    const newErrors = {
      instrumentName: "",
      price: "",
      minPrice: "",
      maxPrice: "",
    };

    let isValid = true;

    // Validate service name
    if (!newInstrumentName) {
      newErrors.instrumentName = "Please select a service";
      isValid = false;
    }

    // Validate pricing based on type
    if (pricingType === "exact" || pricingType === "hourly") {
      if (!price || !validateNumber(price)) {
        newErrors.price = "Please enter a valid price";
        isValid = false;
      }
    } else if (pricingType === "range") {
      if (!minPrice || !validateNumber(minPrice)) {
        newErrors.minPrice = "Please enter a valid minimum price";
        isValid = false;
      }
      if (!maxPrice || !validateNumber(maxPrice)) {
        newErrors.maxPrice = "Please enter a valid maximum price";
        isValid = false;
      }
      if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
        newErrors.minPrice = "Min price cannot be higher than max price";
        newErrors.maxPrice = "Max price cannot be lower than min price";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission with validation
  const handleSubmit = () => {
    if (validateForm()) {
      handleAddInstrumentMusic();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Add A Service</h2>

        {/* Service Name Input - Updated to Select dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <Select
            value={newInstrumentName}
            onValueChange={(value) => {
              setNewInstrumentName(value);
              setErrors({ ...errors, instrumentName: "" });
            }}
          >
            <SelectTrigger className="w-full h-[48px] text-sm bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none">
              <SelectValue placeholder="Select instrument" />
            </SelectTrigger>
            <SelectContent>
              {instrumentTypes.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.instrumentName && (
            <p className="text-red-500 text-xs mt-1">{errors.instrumentName}</p>
          )}
        </div>

        {/* Service Pricing Input */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <label className="block text-xl font-medium text-gray-700 mb-2">
              Service Pricing
            </label>

            <div className="flex items-center space-x-4 mb-3">
              {["Exact", "Range", "Hourly"].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-1 text-sm text-gray-600"
                >
                  <input
                    type="radio"
                    name="pricingType"
                    value={type.toLowerCase()}
                    checked={pricingType === type.toLowerCase()}
                    onChange={() => setPricingType(type.toLowerCase())}
                    className="accent-teal-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Pricing Inputs */}
          {pricingType === "range" ? (
            <div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                  />
                  {errors.minPrice && (
                    <p className="text-red-500 text-xs mt-1">{errors.minPrice}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                  />
                  {errors.maxPrice && (
                    <p className="text-red-500 text-xs mt-1">{errors.maxPrice}</p>
                  )}
                </div>
              </div>
              {minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice) && (
                <p className="text-red-500 text-xs mt-1">
                  Minimum price cannot be higher than maximum price
                </p>
              )}
            </div>
          ) : (
            <div>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="$ Service Price"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
          >
            Add
          </button>
          <button
            onClick={() => setServiceModalMusic(false)}
            className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModalMusic;