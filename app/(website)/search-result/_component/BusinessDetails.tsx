/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, ChevronDown, ChevronUp, Heart, Share2 } from "lucide-react"
import Image from "next/image"

interface BusinessProfileProps {
  singleBusiness: {
    _id: string
    businessInfo: {
      name: string
      image: string[]
      address: string
      phone: string
      email: string
      website: string
      description: string
    }
    user: {
      _id: string
      name: string
      email: string
    }
    services: Array<{
      newInstrumentName: string
      pricingType: string
      price: string
      minPrice: string
      maxPrice: string
      selectedInstrumentsGroup: string
      instrumentFamily: string
    }>
    musicLessons: Array<{
      newInstrumentName: string
      pricingType: string
      price: string
      minPrice: string
      maxPrice: string
      selectedInstrumentsGroupMusic: string
    }>
    businessHours: Array<{
      day: string
      startTime: string
      startMeridiem: string
      endTime: string
      endMeridiem: string
      enabled: boolean
    }>
    buyInstruments: boolean
    sellInstruments: boolean
    offerMusicLessons: boolean
    review: any[]
    isVerified: boolean
    status: string
  }
}

const BusinessDetails: React.FC<BusinessProfileProps> = ({ singleBusiness }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    repair: true,
    lessons: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatPrice = (service: any) => {
    if (service.pricingType === "exact") {
      return `$${service.price}`
    } else if (service.pricingType === "range") {
      return `$${service.minPrice} - $${service.maxPrice}`
    } else if (service.pricingType === "hourly") {
      return `$${service.price}/hr`
    }
    return "Contact for pricing"
  }

  const formatTime = (time: string, meridiem: string) => {
    return `${time} ${meridiem}`
  }

  // Group services by instrument family
  const groupedServices = singleBusiness.services.reduce((acc: any, service) => {
    const family = service.instrumentFamily
    if (!acc[family]) {
      acc[family] = []
    }
    acc[family].push(service)
    return acc
  }, {})

  return (
    <div>
      {/* Business Header */}
      <div className="flex items-start gap-6 p-6 border-b">
        {/* Business Image */}
        <div className="flex-shrink-0">
          <Image
            src={singleBusiness.businessInfo.image[0] || "/placeholder.svg?height=120&width=120"}
            alt={singleBusiness.businessInfo.name}
            width={120}
            height={120}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Business Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{singleBusiness.businessInfo.name}</h1>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-600 font-medium">4.7</span>
            <span className="text-gray-500">({singleBusiness.review.length} Reviews)</span>
          </div>
          <div className="text-gray-600 mb-1">{singleBusiness.businessInfo.address}</div>
          <div className="text-gray-600">{singleBusiness.businessInfo.phone}</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
            <Heart className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600 bg-transparent">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>

      <div className="flex gap-8 p-6">
        {/* Left Column */}
        <div className="flex-1 space-y-8">
          {/* About this Business */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About this Business</h2>
            <p className="text-gray-700 leading-relaxed">{singleBusiness.businessInfo.description}</p>
          </div>

          {/* Service Type */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Service Type</h2>

            {/* Repair Services */}
            {singleBusiness.services.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => toggleSection("repair")}
                  className="w-full flex items-center justify-between py-3 text-left border-b"
                >
                  <h3 className="font-medium text-lg">Repair</h3>
                  {expandedSections.repair ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {expandedSections.repair && (
                  <div className="py-4 space-y-4">
                    {Object.entries(groupedServices).map(([family, services]: [string, any]) => (
                      <div key={family}>
                        <h4 className="font-medium text-teal-600 mb-3">{family}</h4>
                        <div className="space-y-2">
                          {services.map((service: any, index: number) => (
                            <div key={index} className="flex justify-between items-center py-1">
                              <div>
                                <div className="font-medium">{service.selectedInstrumentsGroup}</div>
                                <div className="text-sm text-gray-500">{service.newInstrumentName}</div>
                              </div>
                              <div className="font-semibold">{formatPrice(service)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Music Lessons */}
            {singleBusiness.musicLessons.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection("lessons")}
                  className="w-full flex items-center justify-between py-3 text-left border-b"
                >
                  <h3 className="font-medium text-lg">Lessons</h3>
                  {expandedSections.lessons ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {expandedSections.lessons && (
                  <div className="py-4">
                    <p className="text-sm text-gray-600 mb-4">
                      These are hourly rates for lessons, contact the business for more details
                    </p>
                    <div className="space-y-4">
                      <h4 className="font-medium text-teal-600">Strings</h4>
                      <div className="space-y-2">
                        {singleBusiness.musicLessons.map((lesson, index) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <div className="font-medium">{lesson.selectedInstrumentsGroupMusic}</div>
                            <div className="font-semibold">{formatPrice(lesson)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rating & Reviews */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Rating & Reviews</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">4.7</div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-600">{singleBusiness.review.length} Reviews</div>
              </div>
            </div>

            {singleBusiness.review.length === 0 && (
              <div className="text-center py-8 text-gray-500">No reviews yet. Be the first to leave a review!</div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-80 space-y-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="text-blue-600">{singleBusiness.businessInfo.phone}</div>
              <div className="text-blue-600">{singleBusiness.businessInfo.email}</div>
              <div>
                <a href={singleBusiness.businessInfo.website} className="text-blue-600 hover:underline">
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2">
              {singleBusiness.businessHours.map((hour, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{hour.day}</span>
                  <span className={hour.enabled ? "text-gray-700" : "text-red-500"}>
                    {hour.enabled
                      ? `${formatTime(hour.startTime, hour.startMeridiem)} - ${formatTime(hour.endTime, hour.endMeridiem)}`
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
                <div className="font-medium">{singleBusiness.businessInfo.name}</div>
                <div className="text-gray-600">{singleBusiness.businessInfo.address}</div>
              </div>
              <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDetails
