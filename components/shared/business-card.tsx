"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface BusinessItem {
  email: string;
  name: string;
  image: string;
}

interface Service {
  newInstrumentName: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  services: Service[];
}

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link href={`/search-result/${business?._id}`}>
      <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-6 h-full">
        <div className="flex flex-col gap-5 h-full">
          {/* Profile Image */}
          <div className="flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={business?.businessInfo?.image[0]}
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
                    {business?.services?.map((service, index) => (
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
  );
}
