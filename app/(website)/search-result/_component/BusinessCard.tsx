"use client";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = business.businessInfo?.image || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <Link href={`/search-result/${business._id}`}>
        <div className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-5">
            <div className="flex-shrink-0 overflow-hidden rounded-lg w-full sm:w-auto relative group">
              {/* Image Slider */}
              <div className="relative w-full sm:w-[200px] h-[160px] sm:h-[200px] rounded-lg overflow-hidden">
                <Image
                  src={images[currentImageIndex] || "/placeholder-image.jpg"}
                  alt={business.businessInfo?.name || "Business image"}
                  width={200}
                  height={200}
                  className="rounded-lg object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />

                {/* Navigation Arrows - Show only if multiple images */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="flex justify-center mt-3 space-x-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToImage(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex
                          ? "bg-primary"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {business.businessInfo?.name}
                  </h3>

                  <div className="my-3 flex items-center gap-2">
                    <Star className="fill-yellow-400 text-yellow-400 font-bold h-4 w-4" />
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
      </Link>
    </div>
  );
};

export default BusinessCard;