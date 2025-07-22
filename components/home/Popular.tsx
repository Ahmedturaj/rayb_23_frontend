"use client";
import { getAllbusiness } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";

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

const Popular = () => {
  const { data: allBusiness = [] } = useQuery({
    queryKey: ["popular-instruments"],
    queryFn: async () => {
      const response = await getAllbusiness();
      return response.data;
    },
  });

  console.log(allBusiness);

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center">
          <h1 className="text-[40px] text-gray-700 font-semibold">
            Instrument Families
          </h1>
          <p className="text-[20px] text-gray-600">
            Explore the six major families of instruments and find out where
            your instrument belongs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allBusiness?.map((business: Business) => (
            <div
              key={business?.businessInfo?.email}
              className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-6"
            >
              <div className="flex flex-col gap-5">
                {/* Profile Image */}
                <div className="flex-shrink-0 overflow-hidden rounded-lg w-full sm:w-auto">
                  <Image
                    src={business?.businessInfo?.image[0] || "/placeholder.svg"}
                    alt={"business.png"}
                    width={1000}
                    height={1000}
                    className="rounded-lg object-cover w-full h-[250px] hover:scale-105 transition"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
