"use client";
import { Button } from "@/components/ui/button";
import { Badge, MapPin, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface Instructor {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  services: string[];
  timeAgo: string;
}

const instructors: Instructor[] = [
  {
    id: 1,
    name: "Bronstein Music",
    image: "/images/guitar.png",
    rating: 4.7,
    reviewCount: 1346,
    distance: "3.8 km away",
    services: ["Recording", "Mastering", "Demo Removal", "Repairing"],
    timeAgo: "3 hours",
  },
  {
    id: 2,
    name: "San Francisco Guitar Tech",
    image: "/images/guitar.png",
    rating: 4.7,
    reviewCount: 1346,
    distance: "3.8 km away",
    services: ["Recording", "Mastering", "Demo Removal", "Repairing"],
    timeAgo: "3 hours",
  },
  {
    id: 3,
    name: "San Francisco Guitar Tech",
    image: "/images/guitar.png",
    rating: 4.7,
    reviewCount: 1346,
    distance: "3.8 km away",
    services: ["Recording", "Mastering", "Demo Removal", "Repairing"],
    timeAgo: "3 hours",
  },
  {
    id: 4,
    name: "Bronstein Music",
    image: "/images/guitar.png",
    rating: 4.7,
    reviewCount: 1346,
    distance: "3.8 km away",
    services: ["Recording", "Mastering", "Demo Removal", "Repairing"],
    timeAgo: "2 hours",
  },
  {
    id: 5,
    name: "Bronstein Music",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviewCount: 1346,
    distance: "3.8 km away",
    services: ["Recording", "Mastering", "Demo Removal", "Repairing"],
    timeAgo: "1 hours",
  },
  {
    id: 6,
    name: "Golden Gate Studios",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviewCount: 892,
    distance: "2.1 km away",
    services: ["Recording", "Mixing", "Mastering"],
    timeAgo: "4 hours",
  },
  {
    id: 7,
    name: "Bay Area Music Lab",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviewCount: 567,
    distance: "5.2 km away",
    services: ["Lessons", "Recording", "Equipment Rental"],
    timeAgo: "6 hours",
  },
  {
    id: 8,
    name: "Sound Wave Productions",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviewCount: 234,
    distance: "1.7 km away",
    services: ["Recording", "Mastering", "Live Sound"],
    timeAgo: "2 hours",
  },
];

const ClaimReviewBusiness = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.services.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInstructors = filteredInstructors.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-8">
      <div>
        {/* Search Section */}
        <div className="mb-10">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                placeholder="Search for instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border border-gray-200 bg-gray-50 h-[48px] focus:outline-none w-full rounded-md"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[48px]"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Instructors List */}
        <div className="space-y-6">
          {currentInstructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-6"
            >
              <div className="flex items-center gap-5">
                {/* Profile Image */}
                <div className="flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    width={1000}
                    height={1000}
                    className="rounded-lg object-cover h-[200px] w-[200px] hover:scale-105 transition"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {instructor.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {instructor.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({instructor.reviewCount.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      {/* Distance */}
                      <div className="flex items-center gap-1 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {instructor.distance}
                        </span>
                      </div>

                      {/* Services */}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {instructor.services.map((service, index) => (
                          <Badge key={index} className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      {/* Time */}
                      <div className="text-sm text-gray-500">
                        {instructor.timeAgo}
                      </div>
                    </div>

                    {/* Action Button */}
                    {pathname === "/claim-your-business" && (
                      <button className=" bg-[#e0f2f1] h-[48px] text-[#139a8e] px-5 rounded-lg w-[180px]">
                        Claim Business
                      </button>
                    )}

                    {pathname === "/review-business" && (
                      <button className=" bg-[#e0f2f1] h-[48px] text-[#139a8e] px-5 rounded-lg w-[180px]">
                        Review Business
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""
                }
              >
                {page}
              </Button>
            ))}

            {/* Next Page Button */}
            {currentPage < totalPages && (
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-teal-600 hover:bg-teal-700 text-white ml-2"
              >
                Next Page
              </Button>
            )}
          </div>
        )}

        <div className="border border-gray-200 bg-gray-50 mt-10 p-5 rounded-lg flex justify-between items-center">
          <div className="flex items-center gap-6">
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

          <div>
            <Link href={'/add-a-business'}>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[48px]">
                Add Business
              </Button>
            </Link>
          </div>
        </div>

        {/* No Results */}
        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No instructors found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimReviewBusiness;
