import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LocationEdit, Search } from "lucide-react";
import Image from "next/image";

export default function BannerHome() {
  return (
    <section className="py-8 lg:py-20">
      <div className="container flex flex-col lg:flex-row items-center gap-8 px-4">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] font-semibold leading-tight">
            Bring Your Instrument
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] font-semibold text-[#139a8e] leading-tight my-5">
            Back to Life
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-4">
            Find the best instrument repair shops near you.
          </p>

          <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              type="text"
              placeholder="Guitar, strings, restringing..."
              className="pl-10 w-full h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800  bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner"
            />
          </div>

          <div className="mt-5 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Button className="h-[48px] w-full sm:w-[250px] bg-[#F7F8F8] border border-gray-200 text-black hover:text-white">
              <LocationEdit className="mr-2" />
              <span>Central Park, NY</span>
            </Button>

            <Button className="h-[48px] w-full sm:w-[250px]">Search</Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={"/images/banner.png"}
            alt="banner.png"
            width={1000}
            height={1000}
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[579px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
