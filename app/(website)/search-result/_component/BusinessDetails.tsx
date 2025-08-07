/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState } from "react";
import {
  Star,
  ChevronDown,
  ChevronUp,
  SaveIcon,
  Share2Icon,
  LocateIcon,
  MessageCircleCodeIcon,
  Globe,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReviewModal from "@/components/modals/ReviewModal";
import ReviewSubmittedModal from "@/components/modals/ReviewSubmittedModal";

interface BusinessProfileProps {
  singleBusiness: {
    _id: string;
    businessInfo: {
      name: string;
      image: string[];
      address: string;
      phone: string;
      email: string;
      website: string;
      description: string;
    };
    user: {
      _id: string;
      name: string;
      email: string;
    };
    services: Array<{
      newInstrumentName: string;
      pricingType: string;
      price: string;
      minPrice: string;
      maxPrice: string;
      selectedInstrumentsGroup: string;
      instrumentFamily: string;
    }>;
    musicLessons: Array<{
      newInstrumentName: string;
      pricingType: string;
      price: string;
      minPrice: string;
      maxPrice: string;
      selectedInstrumentsGroupMusic: string;
    }>;
    businessHours: Array<{
      day: string;
      startTime: string;
      startMeridiem: string;
      endTime: string;
      endMeridiem: string;
      enabled: boolean;
    }>;
    buyInstruments: boolean;
    sellInstruments: boolean;
    offerMusicLessons: boolean;
    rentInstruments: boolean;
    review: any[];
    isVerified: boolean;
    status: string;
  };
}

const BusinessDetails: React.FC<BusinessProfileProps> = ({
  singleBusiness,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    repair: true,
    lessons: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatPrice = (service: any) => {
    if (service.pricingType === "exact") {
      return `$${service.price}`;
    } else if (service.pricingType === "range") {
      return `$${service.minPrice} - $${service.maxPrice}`;
    } else if (service.pricingType === "hourly") {
      return `$${service.price}/hr`;
    }
    return "Contact for pricing";
  };

  const formatTime = (time: string, meridiem: string) => {
    return `${time} ${meridiem}`;
  };

  // Group services by instrument family
  const groupedServices = singleBusiness.services.reduce(
    (acc: any, service) => {
      const family = service.instrumentFamily;
      if (!acc[family]) {
        acc[family] = [];
      }
      acc[family].push(service);
      return acc;
    },
    {}
  );

  return (
    <div>
      {/* Business Header */}
      <div className="flex items-center gap-6 border-b border-gray-200 pb-8">
        {/* Business Image */}
        <div className="flex-shrink-0">
          <Image
            src={
              singleBusiness.businessInfo.image[0] ||
              "/placeholder.svg?height=120&width=120"
            }
            alt={singleBusiness.businessInfo.name}
            width={1000}
            height={1000}
            className="rounded-lg object-cover h-[172px] w-[172px]"
          />
        </div>

        {/* Business Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {singleBusiness.businessInfo.name}
          </h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.7</span>
            <span className="text-gray-500">
              ({singleBusiness.review.length} Reviews)
            </span>
          </div>
          <div className="text-gray-600 mb-1">
            {singleBusiness.businessInfo.address}
          </div>
          <div className="text-gray-600">
            {singleBusiness.businessInfo.phone}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold"
          >
            <Star className="w-4 h-4 mr-1" />
            Write Review
          </button>
          <button className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold">
            <LocateIcon className="w-4 h-4 mr-1" />
            Add Photo
          </button>
          <button className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold">
            <Share2Icon className="w-4 h-4 mr-1" />
            Share
          </button>
          <button className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold">
            <SaveIcon className="w-4 h-4 mr-1" />
            Save
          </button>
        </div>
      </div>

      {isOpen && (
        <ReviewModal
          businessID={singleBusiness?._id}
          setIsModalOpen={setIsModalOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {isModalOpen && <ReviewSubmittedModal setIsModalOpen={setIsModalOpen} />}

      <div className="flex pt-8 pb-16">
        {/* Left Column */}
        <div className="flex-1 border-r border-gray-200 pr-8">
          {/* About this Business */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold mb-4">About this Business</h2>
            <p className="text-gray-700 leading-relaxed">
              {singleBusiness.businessInfo.description}
            </p>
          </div>

          {/* Service Type */}
          <div className="pt-8 space-y-8 border-b border-gray-200 pb-10">
            <h2 className="text-xl font-semibold mb-4">Service Type</h2>

            {/* Repair Services */}
            {singleBusiness.services.length > 0 && (
              <div className="shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg">
                <button
                  onClick={() => toggleSection("repair")}
                  className="w-full flex items-center justify-between text-left  mb-4"
                >
                  <h3 className="font-medium text-lg">Repair</h3>
                  {expandedSections.repair ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {expandedSections.repair && (
                  <div className="space-y-4">
                    {Object.entries(groupedServices).map(
                      ([family, services]: [string, any]) => (
                        <div key={family}>
                          <h4 className="font-medium text-teal-600">
                            {family}
                          </h4>
                          <div className="space-y-2">
                            {services.map((service: any, index: number) => (
                              <div
                                key={index}
                                className="flex justify-between items-center py-1"
                              >
                                <div>
                                  <div className="font-medium">
                                    {service.selectedInstrumentsGroup}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {service.newInstrumentName}
                                  </div>
                                </div>
                                <div className="font-semibold">
                                  {formatPrice(service)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Music Lessons */}
            {singleBusiness.musicLessons.length > 0 && (
              <div className="shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg">
                <button
                  onClick={() => toggleSection("lessons")}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="font-medium text-lg">Lessons</h3>
                  {expandedSections.lessons ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {expandedSections.lessons && (
                  <div className="py-4">
                    <p className="text-sm text-gray-600 mb-4">
                      These are hourly rates for lessons, contact the business
                      for more details
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-teal-600">Strings</h4>
                      <div className="space-y-2">
                        {singleBusiness.musicLessons.map((lesson, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center py-1"
                          >
                            <div className="font-medium">
                              {lesson.selectedInstrumentsGroupMusic}
                            </div>
                            <div className="font-semibold">
                              {formatPrice(lesson)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* other services */}
            <div className="shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg">
              <button
                onClick={() => toggleSection("otherService")}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-medium text-lg">Other Services</h3>
                {expandedSections.otherService ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedSections.otherService && (
                <div className="py-4">
                  <h1>
                    The business provides{" "}
                    {singleBusiness?.buyInstruments && (
                      <span className="font-semibold">buying,</span>
                    )}{" "}
                    {singleBusiness?.sellInstruments && (
                      <span className="font-semibold">selling,</span>
                    )}{" "}
                    {singleBusiness?.offerMusicLessons && (
                      <span className="font-semibold">trading</span>
                    )}{" "}
                    {singleBusiness?.rentInstruments && (
                      <span>
                        & <span className="font-semibold">rental </span>
                      </span>
                    )}
                    services. Please{" "}
                    <Link href={"/"}>
                      <span className="text-teal-600">
                        contact the business
                      </span>
                    </Link>{" "}
                    to get a personalized quote.
                  </h1>
                </div>
              )}
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="pt-8">
            <h2 className="text-xl font-semibold mb-4">Rating & Reviews</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">4.7</div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {singleBusiness.review.length} Reviews
                </div>
              </div>
            </div>

            {singleBusiness.review.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to leave a review!
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8  pl-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-5">
              <Link href={""}>
                <div className=" flex items-center gap-2">
                  <span className="text-[#139a8e]">
                    <MessageCircleCodeIcon />
                  </span>
                  <span className="text-gray-600 hover:text-[#139a8e]">
                    Message Business
                  </span>
                </div>
              </Link>
              <div>
                <Link
                  href={singleBusiness.businessInfo.website}
                  className="flex items-center gap-2"
                >
                  <span>
                    <Globe className="text-[#139a8e] " />
                  </span>
                  <span className="text-gray-600 hover:text-[#139a8e]">
                    {singleBusiness.businessInfo.website}
                  </span>
                </Link>
              </div>

              <div>
                <Link href={""}>
                  <div className="flex items-center gap-2">
                    <span>
                      <Phone className="text-[#139a8e] " />
                    </span>
                    <span className="text-gray-600 hover:text-[#139a8e]">
                      {singleBusiness.businessInfo.phone}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2">
              {singleBusiness.businessHours.map((hour, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-medium text-[#139a8e]">
                    {hour.day.slice(0, 3)}
                  </span>
                  <span
                    className={hour.enabled ? "text-gray-700" : "text-red-500"}
                  >
                    {hour.enabled
                      ? `${formatTime(
                          hour.startTime,
                          hour.startMeridiem
                        )} - ${formatTime(hour.endTime, hour.endMeridiem)}`
                      : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">
                  {singleBusiness.businessInfo.name}
                </div>
                <div className="text-gray-600">
                  {singleBusiness.businessInfo.address}
                </div>
              </div>
              <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
