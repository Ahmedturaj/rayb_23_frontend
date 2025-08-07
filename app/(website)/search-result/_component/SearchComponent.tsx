/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllbusiness, getAllInstrument } from "@/lib/api";
import Link from "next/link";
import BusinessCard from "./BusinessCard";
import { getPageNumbers } from "@/utils/paginate";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Instruments {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: string[];
  serviceType: string;
}

export default function SearchComponent() {
  // Filter states
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [buyInstruments, setBuyInstruments] = useState(false);
  const [sellInstruments, setSellInstruments] = useState(false);
  const [offerMusicLessons, setOfferMusicLessons] = useState(false);
  const [sortOption, setSortOption] = useState("low-to-high");
  const [openNow, setOpenNow] = useState(false);
  const [postalCode, setPostalCode] = useState("");

  // UI states
  const [priceRangeOpen, setPriceRangeOpen] = useState(true);
  const [alsoOffersOpen, setAlsoOffersOpen] = useState(true);
  const [instrumentFamilyOpen, setInstrumentFamilyOpen] = useState(true);
  const [selectInstrumentsOpen, setSelectInstrumentsOpen] = useState(false);
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Build query params
  const queryParams = {
    instrumentFamily: selectedFamily || undefined,
    selectedInstrumentsGroup: selectedInstrument || undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    buyInstruments: buyInstruments || undefined,
    sellInstruments: sellInstruments || undefined,
    offerMusicLessons: offerMusicLessons || undefined,
    sort: sortOption,
    openNow: openNow || undefined,
    postalCode: postalCode || undefined,
    page: currentPage,
    limit: itemsPerPage
  };

  // Fetch businesses with filters
  const { data: businessData = { data: [], total: 0 }, isLoading: isBusinessLoading } = useQuery({
    queryKey: ["all-business-search-result", queryParams],
    queryFn: () => getAllbusiness(queryParams),
  });

  // Fetch instrument families
  const { data: instrumentFamilies, isLoading: isInstrumentLoading } = useQuery({
    queryKey: ["all-instrument"],
    queryFn: async () => {
      const res = await getAllInstrument();
      return res?.data;
    },
  });

  // Handler functions
  const handleFamilySelect = (family: string) => {
    setSelectedFamily(family);
    setSelectedInstrument(null);
    setSelectedServiceType(null);
    setSelectInstrumentsOpen(true);
    setServiceTypeOpen(false);
    setCurrentPage(1);
  };

  const handleInstrumentSelect = (instrument: string) => {
    setSelectedInstrument(instrument);
    setServiceTypeOpen(true); // This ensures Service Type section opens
    setCurrentPage(1);
    
    // Find and set the service type for the selected family
    const selectedFamilyData = instrumentFamilies?.find(
      (item: Instruments) => item.instrumentFamily === selectedFamily
    );
    if (selectedFamilyData) {
      setSelectedServiceType(selectedFamilyData.serviceType);
    }
  };

  const handleClearFamily = () => {
    setSelectedFamily(null);
    setSelectedInstrument(null);
    setSelectedServiceType(null);
    setSelectInstrumentsOpen(false);
    setServiceTypeOpen(false);
    setCurrentPage(1);
  };

  const handleClearInstrument = () => {
    setSelectedInstrument(null);
    setSelectedServiceType(null);
    setServiceTypeOpen(false);
    setCurrentPage(1);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value) : null;
    if (type === 'min') {
      setMinPrice(numValue);
    } else {
      setMaxPrice(numValue);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil(businessData.total / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  // Utility functions
  const getInstrumentsForFamily = () => {
    if (!selectedFamily) return [];
    const family = instrumentFamilies?.find(
      (f: Instruments) => f.instrumentFamily === selectedFamily
    );
    return family?.instrumentTypes || [];
  };

  const getServiceTypeForFamily = () => {
    if (!selectedFamily) return null;
    const family = instrumentFamilies?.find(
      (f: Instruments) => f.instrumentFamily === selectedFamily
    );
    return family?.serviceType || null;
  };

  // Accent color
  const accentColor = "#139A8E";

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
                <Collapsible
                  open={instrumentFamilyOpen}
                  onOpenChange={setInstrumentFamilyOpen}
                >
                  <CollapsibleTrigger className="flex justify-between w-full text-left">
                    <h3 className="font-medium mb-4">Instrument Family</h3>
                    <ChevronDown
                      className={`h-4 w-4 mt-1 transition-transform ${
                        instrumentFamilyOpen ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 border-b border-gray-200 pb-5">
                    {isInstrumentLoading ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    ) : (
                      instrumentFamilies?.map((family: Instruments) => (
                        <div
                          key={family._id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            id={`family-${family.instrumentFamily}`}
                            name="instrumentFamily"
                            value={family.instrumentFamily}
                            checked={selectedFamily === family.instrumentFamily}
                            onChange={() => handleFamilySelect(family.instrumentFamily)}
                            className="w-4 h-4 border-gray-300"
                            style={{ accentColor }}
                          />
                          <label
                            htmlFor={`family-${family.instrumentFamily}`}
                            className="text-sm"
                          >
                            {family.instrumentFamily}
                          </label>
                        </div>
                      ))
                    )}
                  </CollapsibleContent>
                </Collapsible>

                {/* Select Instruments */}
                {selectedFamily && (
                  <Collapsible
                    open={selectInstrumentsOpen}
                    onOpenChange={setSelectInstrumentsOpen}
                  >
                    <CollapsibleTrigger className="flex justify-between w-full text-left pt-5">
                      <h3 className="font-medium mb-4">Select Instruments</h3>
                      <ChevronDown
                        className={`h-4 w-4 mt-1 transition-transform ${
                          selectInstrumentsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="border-b border-gray-200 pb-2">
                      {getInstrumentsForFamily().map((instrument: string) => (
                        <div
                          key={instrument}
                          className="flex items-center space-x-2 mb-3"
                        >
                          <input
                            type="radio"
                            id={`instrument-${instrument}`}
                            name="instrument"
                            value={instrument}
                            checked={selectedInstrument === instrument}
                            onChange={() => handleInstrumentSelect(instrument)}
                            className="w-4 h-4 border-gray-300"
                            style={{ accentColor }}
                          />
                          <label
                            htmlFor={`instrument-${instrument}`}
                            className="text-sm"
                          >
                            {instrument}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Service Type - Only show if instrument is selected */}
                {selectedInstrument && (
                  <Collapsible
                    open={serviceTypeOpen}
                    onOpenChange={setServiceTypeOpen}
                  >
                    <CollapsibleTrigger className="flex justify-between w-full text-left pt-5">
                      <h3 className="font-medium mb-4">Service Type</h3>
                      <ChevronDown
                        className={`h-4 w-4 mt-1 transition-transform ${
                          serviceTypeOpen ? "rotate-180" : ""
                        }`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 border-b border-gray-200 pb-5">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={`service-${getServiceTypeForFamily()}`}
                          name="serviceType"
                          value={getServiceTypeForFamily() || ''}
                          checked={true}
                          onChange={() => {}}
                          className="w-4 h-4 border-gray-300"
                          style={{ accentColor }}
                        />
                        <label
                          htmlFor={`service-${getServiceTypeForFamily()}`}
                          className="text-sm"
                        >
                          {getServiceTypeForFamily()}
                        </label>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {/* Price Range */}
                <Collapsible
                  open={priceRangeOpen}
                  onOpenChange={setPriceRangeOpen}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left pt-5">
                    <h3 className="text-lg font-medium text-gray-900">
                      Price Range
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        priceRangeOpen ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 mt-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Label
                          htmlFor="min-price"
                          className="text-sm text-gray-600"
                        >
                          Min
                        </Label>
                        <Input
                          id="min-price"
                          type="number"
                          placeholder="0"
                          className="mt-1"
                          value={minPrice || ''}
                          onChange={(e) => handlePriceChange('min', e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor="max-price"
                          className="text-sm text-gray-600"
                        >
                          Max
                        </Label>
                        <Input
                          id="max-price"
                          type="number"
                          placeholder="1000"
                          className="mt-1"
                          value={maxPrice || ''}
                          onChange={(e) => handlePriceChange('max', e.target.value)}
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Also Offers */}
                <Collapsible
                  open={alsoOffersOpen}
                  onOpenChange={setAlsoOffersOpen}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left mt-5">
                    <h3 className="text-lg font-medium text-gray-900">
                      Also Offers
                    </h3>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        alsoOffersOpen ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="buy"
                          checked={buyInstruments}
                          onCheckedChange={(checked) => {
                            setBuyInstruments(checked as boolean);
                            setCurrentPage(1);
                          }}
                          style={{ accentColor }}
                        />
                        <Label
                          htmlFor="buy"
                          className="text-sm font-normal text-gray-700 cursor-pointer"
                        >
                          Buy Instruments
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sell"
                          checked={sellInstruments}
                          onCheckedChange={(checked) => {
                            setSellInstruments(checked as boolean);
                            setCurrentPage(1);
                          }}
                          style={{ accentColor }}
                        />
                        <Label
                          htmlFor="sell"
                          className="text-sm font-normal text-gray-700 cursor-pointer"
                        >
                          Sell Instruments
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lessons"
                          checked={offerMusicLessons}
                          onCheckedChange={(checked) => {
                            setOfferMusicLessons(checked as boolean);
                            setCurrentPage(1);
                          }}
                          style={{ accentColor }}
                        />
                        <Label
                          htmlFor="lessons"
                          className="text-sm font-normal text-gray-700 cursor-pointer"
                        >
                          Music Lessons
                        </Label>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Postal Code */}
                <div className="mt-5">
                  <Label htmlFor="postal-code" className="text-sm text-gray-600">
                    Postal Code
                  </Label>
                  <Input
                    id="postal-code"
                    type="text"
                    placeholder="Enter postal code"
                    className="mt-1"
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {/* Open Now */}
                <div className="flex items-center space-x-2 mt-5">
                  <Checkbox
                    id="open-now-mobile"
                    checked={openNow}
                    onCheckedChange={(checked) => {
                      setOpenNow(checked as boolean);
                      setCurrentPage(1);
                    }}
                    style={{ accentColor }}
                  />
                  <label htmlFor="open-now-mobile" className="text-sm">
                    Open Now
                  </label>
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
        <Collapsible
          open={instrumentFamilyOpen}
          onOpenChange={setInstrumentFamilyOpen}
        >
          <CollapsibleTrigger className="flex justify-between w-full text-left">
            <h3 className="font-medium mb-4">Instrument Family</h3>
            <ChevronDown
              className={`h-4 w-4 mt-1 transition-transform ${
                instrumentFamilyOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 border-b border-gray-200 pb-5">
            {isInstrumentLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              instrumentFamilies?.map((family: Instruments) => (
                <div key={family._id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`family-${family.instrumentFamily}`}
                    name="instrumentFamily"
                    value={family.instrumentFamily}
                    checked={selectedFamily === family.instrumentFamily}
                    onChange={() => handleFamilySelect(family.instrumentFamily)}
                    className="w-4 h-4 border-gray-300"
                    style={{ accentColor }}
                  />
                  <label
                    htmlFor={`family-${family.instrumentFamily}`}
                    className="text-sm"
                  >
                    {family.instrumentFamily}
                  </label>
                </div>
              ))
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Select Instruments */}
        {selectedFamily && (
          <Collapsible
            open={selectInstrumentsOpen}
            onOpenChange={setSelectInstrumentsOpen}
          >
            <CollapsibleTrigger className="flex justify-between w-full text-left pt-5">
              <h3 className="font-medium mb-4">Select Instruments</h3>
              <ChevronDown
                className={`h-4 w-4 mt-1 transition-transform ${
                  selectInstrumentsOpen ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="border-b border-gray-200 pb-2">
              {getInstrumentsForFamily().map((instrument: string) => (
                <div
                  key={instrument}
                  className="flex items-center space-x-2 mb-3"
                >
                  <input
                    type="radio"
                    id={`instrument-${instrument}`}
                    name="instrument"
                    value={instrument}
                    checked={selectedInstrument === instrument}
                    onChange={() => handleInstrumentSelect(instrument)}
                    className="w-4 h-4 border-gray-300"
                    style={{ accentColor }}
                  />
                  <label
                    htmlFor={`instrument-${instrument}`}
                    className="text-sm"
                  >
                    {instrument}
                  </label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Service Type - Only show if instrument is selected */}
        {selectedInstrument && (
          <Collapsible
            open={serviceTypeOpen}
            onOpenChange={setServiceTypeOpen}
          >
            <CollapsibleTrigger className="flex justify-between w-full text-left pt-5">
              <h3 className="font-medium mb-4">Service Type</h3>
              <ChevronDown
                className={`h-4 w-4 mt-1 transition-transform ${
                  serviceTypeOpen ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 border-b border-gray-200 pb-5">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`service-${getServiceTypeForFamily()}`}
                  name="serviceType"
                  value={getServiceTypeForFamily() || ''}
                  checked={true}
                  onChange={() => {}}
                  className="w-4 h-4 border-gray-300"
                  style={{ accentColor }}
                />
                <label
                  htmlFor={`service-${getServiceTypeForFamily()}`}
                  className="text-sm"
                >
                  {getServiceTypeForFamily()}
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Price Range */}
        <Collapsible open={priceRangeOpen} onOpenChange={setPriceRangeOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left pt-5">
            <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                priceRangeOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="min-price" className="text-sm text-gray-600">
                  Min
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  className="mt-1"
                  value={minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="max-price" className="text-sm text-gray-600">
                  Max
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="1000"
                  className="mt-1"
                  value={maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Also Offers */}
        <Collapsible open={alsoOffersOpen} onOpenChange={setAlsoOffersOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-left mt-5">
            <h3 className="text-lg font-medium text-gray-900">Also Offers</h3>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                alsoOffersOpen ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="buy"
                  checked={buyInstruments}
                  onCheckedChange={(checked) => {
                    setBuyInstruments(checked as boolean);
                    setCurrentPage(1);
                  }}
                  style={{ accentColor }}
                />
                <Label
                  htmlFor="buy"
                  className="text-sm font-normal text-gray-700 cursor-pointer"
                >
                  Buy Instruments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sell"
                  checked={sellInstruments}
                  onCheckedChange={(checked) => {
                    setSellInstruments(checked as boolean);
                    setCurrentPage(1);
                  }}
                  style={{ accentColor }}
                />
                <Label
                  htmlFor="sell"
                  className="text-sm font-normal text-gray-700 cursor-pointer"
                >
                  Sell Instruments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lessons"
                  checked={offerMusicLessons}
                  onCheckedChange={(checked) => {
                    setOfferMusicLessons(checked as boolean);
                    setCurrentPage(1);
                  }}
                  style={{ accentColor }}
                />
                <Label
                  htmlFor="lessons"
                  className="text-sm font-normal text-gray-700 cursor-pointer"
                >
                  Music Lessons
                </Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Postal Code */}
        <div className="mt-5">
          <Label htmlFor="postal-code" className="text-sm text-gray-600">
            Postal Code
          </Label>
          <Input
            id="postal-code"
            type="text"
            placeholder="Enter postal code"
            className="mt-1"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Open Now */}
        <div className="flex items-center space-x-2 mt-5">
          <Checkbox
            id="open-now"
            checked={openNow}
            onCheckedChange={(checked) => {
              setOpenNow(checked as boolean);
              setCurrentPage(1);
            }}
            style={{ accentColor }}
          />
          <label htmlFor="open-now" className="text-sm">
            Open Now
          </label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Header - Desktop */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <div className="space-y-2">
            <p className="text-gray-500">{businessData.total} results</p>
            <h1 className="text-2xl font-semibold">Online Classes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by</span>
            <Select 
              value={sortOption}
              onValueChange={(value) => {
                setSortOption(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-to-high">Price Low to High</SelectItem>
                <SelectItem value="high-to-low">Price High to Low</SelectItem>
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
                  onClick={handleClearFamily}
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
                  onClick={handleClearInstrument}
                >
                  ×
                </button>
              </div>
            )}

            {minPrice !== null && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Min: ${minPrice}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setMinPrice(null);
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {maxPrice !== null && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Max: ${maxPrice}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setMaxPrice(null);
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {buyInstruments && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Buy
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setBuyInstruments(false);
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {sellInstruments && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Sell
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setSellInstruments(false);
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {offerMusicLessons && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Lessons
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setOfferMusicLessons(false);
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {openNow && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Open Now
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setOpenNow(false);
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {postalCode && (
              <div className="flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full">
                Near {postalCode}
                <button
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setPostalCode("");
                    setCurrentPage(1);
                  }}
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
              onChange={(e) => {
                setOpenNow(e.target.checked);
                setCurrentPage(1);
              }}
              style={{ accentColor }}
            />
            <label htmlFor="open-now" className="text-sm">
              Open Now
            </label>
          </div>
        </div>

        {/* Sort - Mobile */}
        <div className="lg:hidden mb-6">
          <Select 
            value={sortOption}
            onValueChange={(value) => {
              setSortOption(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low-to-high">Price Low to High</SelectItem>
              <SelectItem value="high-to-low">Price High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Business List */}
        {isBusinessLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="space-y-4 lg:space-y-8">
              {businessData.data?.map((business: any) => (
                <BusinessCard key={business?._id} business={business} />
              ))}
            </div>

            {/* Pagination */}
            {businessData.total > 0 && (
              <div className="flex items-center justify-center space-x-2 my-6 lg:my-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {getPageNumbers(
                  currentPage, 
                  Math.ceil(businessData.total / itemsPerPage)
                ).map((page, index) =>
                  typeof page === "number" ? (
                    <button
                      key={index}
                      className={`${
                        currentPage === page
                          ? "text-white"
                          : "text-gray-700"
                      } h-10 w-10 rounded-md font-medium`}
                      onClick={() => handlePageChange(page)}
                      style={{
                        backgroundColor: currentPage === page ? accentColor : "transparent",
                        border: currentPage === page ? "none" : `1px solid ${accentColor}`
                      }}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="text-gray-400 px-2">
                      {page}
                    </span>
                  )
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(businessData.total / itemsPerPage)}
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

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
                  <h1 className="font-medium mt-3 lg:mt-5 text-sm lg:text-md" style={{ color: accentColor }}>
                    Got your own business? Add to Instrufix now!
                  </h1>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link href={"/add-a-business"}>
                  <Button 
                    className="w-full md:w-auto text-white px-6 lg:px-8 h-[40px] lg:h-[48px] text-sm lg:text-base"
                    style={{ backgroundColor: accentColor }}
                  >
                    Add Business
                  </Button>
                </Link>
              </div>
            </div>

            {businessData.total === 0 && (
              <div className="text-center py-8 lg:py-12">
                <p className="text-gray-500">
                  No instructors found matching your search.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}