"use client"

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSavedBusiness } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import BusinessCard from '@/components/shared/business-card'


export interface BusinessInfo {
    _id: string;
    rating: number;
    reviewsCount: number;
    name: string;
    address: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    image: string[]; // array of image URLs
}

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
}

export interface SavedBusiness {
    _id: string;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    savedBusiness: {
        businessInfo: BusinessInfo;
    };
    user: UserInfo;
    __v: number; // version key, MongoDB
}


export default function UserSavedData() {

    const { status } = useSession()

    const { data: savedData, isLoading, isError, error } = useQuery({
        queryKey: ["savedBusinessData"],
        queryFn: getSavedBusiness,
        select: (data) => data.data,
        enabled: status === "authenticated",
    })


    if (isLoading) return (
        <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading saved businesses...</p>
            </div>
        </div>
    )

    if (isError) return (
        <div className="py-8 lg:py-20 container mx-auto px-3 lg:px-0">
            <div className="text-center">
                <p className="text-red-600">Error loading subscription plans: {error.message}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Try Again
                </Button>
            </div>
        </div>
    )


    console.log(savedData)

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {savedData?.map((business: SavedBusiness) => (
                <BusinessCard key={business._id} business={business.savedBusiness.businessInfo} />
            ))}
        </div>
    )
}
