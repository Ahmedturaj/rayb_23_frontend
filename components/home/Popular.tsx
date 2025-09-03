"use client";
import { getAllbusiness } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";

// Import Swiper styles and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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

// Skeleton component
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-md p-6 h-full animate-pulse">
      <div className="flex flex-col gap-5 h-full">
        {/* Profile Image Skeleton */}
        <div className="flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 h-[250px] w-full"></div>

        {/* Content Skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

              {/* Rating Skeleton */}
              <div className="flex items-center gap-1 my-3">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-8"></div>
              </div>

              {/* Services Skeleton */}
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 bg-gray-200 rounded-lg w-20"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  const { data: allBusiness = [], isLoading } = useQuery({
    queryKey: ["popular-instruments"],
    queryFn: async () => {
      const response = await getAllbusiness();
      return response.data;
    },
  });

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center">
          <h1 className="text-[40px] font-bold">
            Popular Instrument Repair Shops
          </h1>
          <p className="text-[20px] text-gray-600 font-medium">
            Explore the most popular music instrument repair shops in your area
          </p>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={25}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {allBusiness?.slice(0, 12)?.map((business: Business) => (
                <SwiperSlide key={business?.businessInfo?.email}>
                  <Link href={`search-result/${business?._id}`}>
                    <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-6 h-full">
                      <div className="flex flex-col gap-5 h-full">
                        {/* Profile Image */}
                        <div className="flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={
                              business?.businessInfo?.image[0] ||
                              "/placeholder.svg"
                            }
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
                                <span className="text-sm font-medium">
                                  {"3.7"}
                                </span>
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
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default Popular;
