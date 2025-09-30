"use client";
import "@smastrom/react-rating/style.css";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BusinessItem {
  email: string;
  name: string;
  image: string[];
  address: string;
  phone: string;
  website: string;
  description: string;
}

interface Service {
  newInstrumentName: string;
  price: string;
}

interface Business {
  _id: string;
  businessInfo: BusinessItem;
  review?: string;
  services: Service[];
}

const BusinessCard = ({ business }: { business: Business }) => {
  return (
    <div className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-5">
        <div className="flex-shrink-0 overflow-hidden rounded-lg w-full sm:w-auto">
          <Image
            src={business.businessInfo?.image?.[0]}
            alt={business.businessInfo?.name || "Business image"}
            width={200}
            height={200}
            className="rounded-lg object-cover w-full sm:w-[200px] h-[160px] sm:h-[200px] hover:scale-105 transition"
          />
        </div>
        <div className="flex-1 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {business.businessInfo?.name}
              </h3>

              <div className="my-3 flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400 font-bold h-4 w-4 " />{" "}
                <span>{business.review ? business.review.length : 0}</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {business?.services?.map((service, index) => (
                    <button
                      className="h-[40px] lg:h-[48px] px-4 lg:px-5 rounded-lg bg-[#F8F8F8] text-sm lg:text-base flex items-center gap-5"
                      key={index}
                    >
                      <span>{service.newInstrumentName}</span>
                      <span>$ {service.price}</span>
                    </button>
                  ))}
                </div>
                <div>
                  <Link href={`/search-result/${business._id}`}>
                    <button className="text-primary text-sm lg:text-base">
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
  );
};

export default BusinessCard;
