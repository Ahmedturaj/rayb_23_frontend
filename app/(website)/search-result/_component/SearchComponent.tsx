"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Star, X, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllbusiness } from "@/lib/api";
import Link from "next/link";

interface BusinessItem {
  email: string;
  name: string;
  image: string;
}

interface Service {
  serviceName: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  instrumentInfo: Service[];
}

export default function SearchComponent() {
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(
    "All"
  );
  const [openNow, setOpenNow] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const instrumentFamilies = [
    { name: "Guitar", count: 45 },
    { name: "Saxophone", count: 23 },
    { name: "Piano", count: 67 },
    { name: "Keyboard", count: 34 },
    { name: "Other", count: 89 },
  ];

  const instruments = [
    "Violin",
    "Guitar",
    "Piano",
    "Harp",
    "Singing",
    "Bass",
    "Vocals",
  ];

  const serviceTypes = [
    "All",
    "Recording",
    "Lessons",
    "Tuning",
    "Repairs",
    "Setup and Adjustments",
  ];

  const { data: allBusiness = [] } = useQuery({
    queryKey: ["all-business-search-result"],
    queryFn: async () => {
      const response = await getAllbusiness();
      return response.data;
    },
  });

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filters Button */}
      <div className="lg:hidden p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold">Online Classes</h1>
        <Button
          variant="outline"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
          <div className="absolute inset-0 flex">
            <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Instrument Family */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Instrument Family</h3>
                  <div className="space-y-3">
                    {instrumentFamilies.map((family) => (
                      <div
                        key={family.name}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={`family-${family.name}`}
                          name="instrumentFamily"
                          value={family.name}
                          checked={selectedFamily === family.name}
                          onChange={() => setSelectedFamily(family.name)}
                          className="w-4 h-4 text-teal-600 border-gray-300"
                        />
                        <label
                          htmlFor={`family-${family.name}`}
                          className="text-sm"
                        >
                          {family.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Instruments */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Select Instruments</h3>
                  <div className="space-y-3">
                    {instruments.map((instrument) => (
                      <div
                        key={instrument}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={`instrument-${instrument}`}
                          name="selectedInstrument"
                          value={instrument}
                          checked={selectedInstrument === instrument}
                          onChange={() => setSelectedInstrument(instrument)}
                          className="w-4 h-4 text-teal-600 border-gray-300"
                        />
                        <label
                          htmlFor={`instrument-${instrument}`}
                          className="text-sm"
                        >
                          {instrument}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Type */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Service Type</h3>
                  <div className="space-y-3">
                    {serviceTypes.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={`service-${service}`}
                          name="serviceType"
                          value={service}
                          checked={selectedServiceType === service}
                          onChange={() => setSelectedServiceType(service)}
                          className="w-4 h-4 text-teal-600 border-gray-300"
                        />
                        <label
                          htmlFor={`service-${service}`}
                          className="text-sm"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      min={0}
                      step={5}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-4 pb-6 border-t">
                  <Button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    Show Results
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Filters - Desktop */}
      <div className="hidden lg:block border-r pr-6 w-64 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>

        {/* Instrument Family */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Instrument Family</h3>
          <div className="space-y-3">
            {instrumentFamilies.map((family) => (
              <div key={family.name} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`family-${family.name}`}
                  name="instrumentFamily"
                  value={family.name}
                  checked={selectedFamily === family.name}
                  onChange={() => setSelectedFamily(family.name)}
                  className="w-4 h-4 text-teal-600 border-gray-300"
                />
                <label htmlFor={`family-${family.name}`} className="text-sm">
                  {family.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Select Instruments */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Select Instruments</h3>
          <div className="space-y-3">
            {instruments.map((instrument) => (
              <div key={instrument} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`instrument-${instrument}`}
                  name="selectedInstrument"
                  value={instrument}
                  checked={selectedInstrument === instrument}
                  onChange={() => setSelectedInstrument(instrument)}
                  className="w-4 h-4 text-teal-600 border-gray-300"
                />
                <label htmlFor={`instrument-${instrument}`} className="text-sm">
                  {instrument}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Service Type */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Service Type</h3>
          <div className="space-y-3">
            {serviceTypes.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`service-${service}`}
                  name="serviceType"
                  value={service}
                  checked={selectedServiceType === service}
                  onChange={() => setSelectedServiceType(service)}
                  className="w-4 h-4 text-teal-600 border-gray-300"
                />
                <label htmlFor={`service-${service}`} className="text-sm">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              min={0}
              step={5}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Header - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="space-y-2">
            <p className="text-gray-500">24 result for</p>
            <h1 className="text-2xl font-semibold">Online Classes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by</span>
            <Select defaultValue="price-low">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price Low to High</SelectItem>
                <SelectItem value="price-high">Price High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-6 lg:mb-8 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {selectedFamily && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                {selectedFamily}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedFamily(null)}
                >
                  ×
                </button>
              </div>
            )}

            {selectedInstrument && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                {selectedInstrument}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedInstrument(null)}
                >
                  ×
                </button>
              </div>
            )}

            {selectedServiceType && selectedServiceType !== "All" && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                {selectedServiceType}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedServiceType("All")}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <input
              id="open-now"
              type="checkbox"
              checked={openNow}
              onChange={(e) => setOpenNow(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="open-now" className="text-sm">
              Open Now
            </label>
          </div>
        </div>

        {/* Open Now - Mobile */}
        <div className="lg:hidden flex items-center space-x-2 mb-4">
          <input
            id="open-now-mobile"
            type="checkbox"
            checked={openNow}
            onChange={(e) => setOpenNow(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="open-now-mobile" className="text-sm">
            Open Now
          </label>
        </div>

        {/* Sort - Mobile */}
        <div className="lg:hidden mb-6">
          <Select defaultValue="price-low">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price Low to High</SelectItem>
              <SelectItem value="price-high">Price High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Business List */}
        <div className="space-y-4 lg:space-y-8">
          {allBusiness?.map((business: Business) => (
            <div
              key={business?.businessInfo?.email}
              className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-4 lg:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-5">
                <div className="flex-shrink-0 overflow-hidden rounded-lg w-full sm:w-auto">
                  <Image
                    src={business?.businessInfo?.image[0] || "/placeholder.svg"}
                    alt={"business.png"}
                    width={1000}
                    height={1000}
                    className="rounded-lg object-cover w-full sm:w-[200px] h-[160px] sm:h-[200px] hover:scale-105 transition"
                  />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {business?.businessInfo?.name}
                      </h3>
                      <div className="flex items-center gap-1 my-2 lg:my-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{"3.7"}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {business?.instrumentInfo?.map((service, index) => (
                            <button
                              className="h-[40px] lg:h-[48px] px-4 lg:px-5 rounded-lg bg-[#F8F8F8] text-sm lg:text-base"
                              key={index}
                            >
                              {service?.serviceName}
                            </button>
                          ))}
                        </div>
                        <div>
                          <Link href={`/business/${business?._id}`}>
                            <button className="text-teal-500 text-sm lg:text-base">
                              See More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 my-6 lg:my-8">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-teal-600 hover:bg-teal-700"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <span className="text-gray-400 hidden sm:inline">...</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Add Business CTA */}
        <div className="border border-gray-200 bg-gray-50 mt-6 lg:mt-10 p-4 lg:p-5 rounded-lg flex flex-col md:flex-row justify-between items-start gap-4 lg:gap-6">
          <div className="flex gap-4 lg:gap-6 items-start">
            <div>
              <Image
                src={"/images/location.png"}
                alt="location.png"
                width={1000}
                height={1000}
                className="w-[40px] lg:w-[48px] h-[50px] lg:h-[60px]"
              />
            </div>
            <div>
              <h1 className="font-semibold text-lg lg:text-xl">
                Can&apos;t find the repair shop?
              </h1>
              <p className="text-[#485150] text-sm lg:text-[16px] mt-1 lg:mt-2">
                Adding a business to Instrufix is completely free!
              </p>
              <h1 className="font-medium text-teal-600 mt-3 lg:mt-5 text-sm lg:text-md">
                Got your own business? Add to Instrufix now!
              </h1>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Link href={"/add-a-business"}>
              <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-6 lg:px-8 h-[40px] lg:h-[48px] text-sm lg:text-base">
                Add Business
              </Button>
            </Link>
          </div>
        </div>

        {allBusiness.length === 0 && (
          <div className="text-center py-8 lg:py-12">
            <p className="text-gray-500">
              No instructors found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
