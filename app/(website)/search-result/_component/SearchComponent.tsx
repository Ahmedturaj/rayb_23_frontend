"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

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

  const handleInstrumentChange = (instrument: string, checked: boolean) => {
    if (checked) {
      setSelectedInstruments([...selectedInstruments, instrument]);
    } else {
      setSelectedInstruments(
        selectedInstruments.filter((i) => i !== instrument)
      );
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    }
  };

  const { data: allBusiness = [] } = useQuery({
    queryKey: ["all-business-search-result"],
    queryFn: async () => {
      const response = await getAllbusiness();
      return response.data;
    },
  });

  console.log(allBusiness);

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="border-r pr-6">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>

        {/* Instrument Family */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Instrument Family</h3>
          <div className="space-y-3">
            {instrumentFamilies.map((family) => (
              <div
                key={family.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox id={family.name} />
                  <label htmlFor={family.name} className="text-sm">
                    {family.name}
                  </label>
                </div>
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
                <Checkbox
                  id={instrument}
                  checked={selectedInstruments.includes(instrument)}
                  onCheckedChange={(checked) =>
                    handleInstrumentChange(instrument, checked as boolean)
                  }
                />
                <label htmlFor={instrument} className="text-sm">
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
                <Checkbox
                  id={service}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={(checked) =>
                    handleServiceChange(service, checked as boolean)
                  }
                />
                <label htmlFor={service} className="text-sm">
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
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="open-now" />
              <label htmlFor="open-now" className="text-sm">
                Open Now
              </label>
            </div> */}
          </div>
        </div>

        <div className="mb-8">tags section</div>

        {/* Instructor Cards */}
        <div className="grid gap-4">
          {/* {instructors.map((instructor) => (
            <Card key={instructor.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {instructor.name}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(instructor.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {instructor.rating} ({instructor.reviews})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {instructor.distance}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          {instructor.services.map((service) => (
                            <Badge
                              key={service}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                          <span className="text-sm font-semibold text-teal-600">
                            {instructor.price}
                          </span>
                        </div>
                      </div>
                      <Button variant="link" className="text-teal-600 p-0">
                        See More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))} */}
        </div>

        <div className="space-y-8">
          {allBusiness?.map((business: Business) => (
            <div
              key={business?.businessInfo?.email}
              className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-6"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
                {/* Profile Image */}
                <div className="flex-shrink-0 overflow-hidden rounded-lg w-full sm:w-auto">
                  <Image
                    src={business?.businessInfo?.image[0] || "/placeholder.svg"}
                    alt={"business.png"}
                    width={1000}
                    height={1000}
                    className="rounded-lg object-cover w-full sm:w-[200px] h-[200px] hover:scale-105 transition"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {business?.businessInfo?.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 my-3">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{"3.7"}</span>
                      </div>

                      {/* Services */}
                      <div className="flex items-center gap-2">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {business?.instrumentInfo?.map((service, index) => (
                            <button
                              className="h-[48px] px-5 rounded-lg bg-[#F8F8F8]"
                              key={index}
                            >
                              {service?.serviceName}
                            </button>
                          ))}
                        </div>

                        <div>
                          <Link href={`/business/${business?._id}`}>
                            <button className="text-teal-500">See More</button>
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
        <div className="flex items-center justify-center space-x-2 my-8">
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
          <span className="text-gray-400">...</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Add Business Section */}
        <div className="border border-gray-200 bg-gray-50 mt-10 p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex gap-6 items-start md:items-center">
            <div>
              <Image
                src={"/images/location.png"}
                alt="location.png"
                width={1000}
                height={1000}
                className="w-[48px] h-[60px]"
              />
            </div>

            <div>
              <h1 className="font-semibold text-xl">
                Can’t find your business?
              </h1>
              <p className="text-[#485150] text-[16px] mt-2">
                Adding your business to Instrufix is completely free!
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Link href={"/add-a-business"}>
              <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 h-[48px]">
                Add Business
              </Button>
            </Link>
          </div>
        </div>

        {/* No Results */}
        {allBusiness.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No instructors found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
