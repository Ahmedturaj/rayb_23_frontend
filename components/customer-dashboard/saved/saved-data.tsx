"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSavedBusiness } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export interface BusinessInfo {
  _id: string;
  rating: number;
  reviewsCount: number;
  name: string;
  address: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  image: string[]; // array of image URLs
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

interface Service {
  newInstrumentName: string;
}

export interface SavedBusiness {
  _id: string;
  createdAt: string;
  updatedAt: string;
  savedBusiness: {
    businessInfo: BusinessInfo;
  };
  services: Service[]
  user: UserInfo;
  __v: number;
}

export default function UserSavedData() {
  const { status } = useSession();

  const {
    data: savedData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["savedBusinessData"],
    queryFn: getSavedBusiness,
    select: (data) => data?.data,
    enabled: status === "authenticated",
  });

  console.log("savedData : ", savedData);

  if (isLoading)
    return (
      <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved businesses...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
        <div className="text-center">
          <p className="text-red-600">
            Error loading subscription plans: {error.message}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );

  if (!savedData) {
    return (
      <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
        <div className="flex items-center gap-4">
          <Image
            src="/images/business.png"
            alt="No photos yet"
            width={300}
            height={300}
            className="h-16 w-16 object-contain"
          />
          <div className="space-y-2">
            <h4 className="text-xl font-semibold">No Shops Saved</h4>
            <p>
              You haven’t saved any shops yet. Bookmark the ones you want to
              support or visit later.
            </p>
          </div>
        </div>
        <Link href="/search-result" className="flex-shrink-0">
          <Button>Save Business</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {savedData?.map((business: SavedBusiness) => (
        <Link key={business?._id} href={`/search-result/${business?._id}`}>
          <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-6 h-full">
            <div className="flex flex-col gap-5 h-full">
              {/* Profile Image */}
              <div className="flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={business?.savedBusiness?.businessInfo?.image[0] || "/placeholder.svg"}
                  alt={"business.png"}
                  width={1000}
                  height={1000}
                  className="rounded-lg object-cover w-full h-[250px] hover:scale-105 transition"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {business?.savedBusiness?.businessInfo?.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 my-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{"3.7"}</span>
                    </div>

                    {/* Services */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {business?.services?.map((service : Service, index) => (
                          <button
                            className="h-[48px] px-5 rounded-lg bg-[#F8F8F8]"
                            key={index}
                          >
                            {service?.newInstrumentName}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
