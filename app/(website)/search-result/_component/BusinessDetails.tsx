/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
  Loader2,
  Copy,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import ReviewModal from "@/components/modals/ReviewModal";
import ReviewSubmittedModal from "@/components/modals/ReviewSubmittedModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import AddPhotoModal from "./modal/AddPhotoModal";

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

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  businessId: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  businessName,
  businessId,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const shareLink = `${window.location.origin}/search-result/${businessId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share {businessName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Copy the link below to share this business with others
        </p>

        <div className="flex gap-2">
          <Input value={shareLink} readOnly className="flex-1" />
          <Button
            onClick={handleCopy}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="bg-[#139a8e] hover:bg-[#0d7a70]">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

type SectionKey = "repair" | "lessons" | "otherService";

const BusinessDetails: React.FC<BusinessProfileProps> = ({
  singleBusiness,
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    repair: boolean;
    lessons: boolean;
    otherService: boolean;
  }>({
    repair: true,
    lessons: false,
    otherService: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isAddPhoto, setIsAddPhotoOpen] = useState(false);

  const session = useSession();

  const token = session?.data?.user?.accessToken;

  const toggleSection = (section: SectionKey) => {
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

  const handleSaveBusiness = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-business/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            savedBusiness: singleBusiness._id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save business");
      }

      toast.success(data.message || "Business saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save business");
      console.error("Error saving business:", error);
    } finally {
      setIsSaving(false);
    }
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
          <button
            onClick={() => setIsAddPhotoOpen(true)}
            className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold"
          >
            <LocateIcon className="w-4 h-4 mr-1" />
            Add Photo
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold"
          >
            <Share2Icon className="w-4 h-4 mr-1" />
            Share
          </button>
          <button
            onClick={handleSaveBusiness}
            disabled={isSaving}
            className="bg-[#e0f2f1] hover:bg-[#139a8e] flex items-center gap-2 px-5 py-3 rounded-lg text-[#139a8e] hover:text-white font-semibold disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <SaveIcon className="w-4 h-4 mr-1" />
            )}
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

      {isAddPhoto && (
        <AddPhotoModal
          setIsAddPhotoOpen={setIsAddPhotoOpen}
          businessID={singleBusiness?._id}
        />
      )}

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        businessName={singleBusiness.businessInfo.name}
        businessId={singleBusiness._id}
      />

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
