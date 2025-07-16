"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";

export interface Business {
    _id: string; // Better to use a unique ID!
    name: string;
    image: string[];
    status?: string;
    rating: number | null;
    reviewsCount: number;
    address: string;
}

interface BusinessCardProps {
    business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
    return (
        <div className="p-4  rounded-md shadow-[0px_2px_12px_0px_#003D3914]">
            <div className="relative mb-3">
                <Image
                    src={business.image[0] ?? business.image}
                    alt={business.name}
                    width={300}
                    height={300}
                    className="w-full aspect-[5/4] object-cover rounded-md border"
                />
                <p
                    className={`absolute top-2 right-2 px-4 py-1 rounded-xl ${business.status === "Published"
                        ? "text-green-500"
                        : business.status === "Pending"
                            ? "text-[#E38441] bg-[#E384411F]"
                            : "text-[#E24040] bg-[#E240401F]"
                        }`}
                >
                    {business.status}
                </p>
            </div>

            <div className="space-y-1">
                <h4 className="text-lg font-semibold">{business.name}</h4>

                <div className="flex items-center gap-2 text-[#485150]">
                    <Star
                        className="h-5 w-5"
                        fill={business.reviewsCount > 0 ? "#F4C321" : "#E7E9E9"}
                        stroke="none"
                    />
                    {business.reviewsCount === 0 || business.rating === null
                        ? "Not Rated"
                        : `${business.rating} (${business.reviewsCount})`}
                </div>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {business.address}
                </p>
            </div>
        </div>
    );
}
