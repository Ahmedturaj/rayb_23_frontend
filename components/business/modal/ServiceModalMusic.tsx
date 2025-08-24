import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInstrumentTypes } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

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

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Add A Service</h2>

        {/* Service Name Input - Updated to Select dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name
          </label>
          <Select
            value={newInstrumentName}
            onValueChange={(value) => setNewInstrumentName(value)}
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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
              <input
                type="text"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
              />
            </div>
          ) : (
            <input
              type="text"
              placeholder="$  Service Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddInstrumentMusic}
            className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
          >
            Add Instrument
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