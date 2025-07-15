import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoreVertical, Star } from 'lucide-react'
import BusinessCard from '@/components/shared/business-card'

export default function ContributionTabs() {

    const reviewsData = {
        reviews: [
            {
                id: 1,
                content: "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
                status: "Published",
                author: {
                    name: "John Doe",
                    profilePicture: "/images/profilePlaceholder.jpg",
                    role: "Guitarist"
                },
                photos: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                rating: 5,
                createdAt: "2023-01-01"
            },
            {
                id: 2,
                content: "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
                status: "Pending",
                author: {
                    name: "Jane Smith",
                    profilePicture: "/images/profilePlaceholder.jpg",
                    role: "Bassist"
                },
                photos: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                rating: 3,
                createdAt: "2023-01-02"
            },
            {
                id: 3,
                content: "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
                status: "Rejected",
                author: {
                    name: "Sam Wilson",
                    profilePicture: "/images/profilePlaceholder.jpg",
                    role: "Drummer"
                },
                photos: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                rating: 4,
                createdAt: "2023-01-03"
            }
        ],
        photos: [
            {
                id: 1,
                business: {
                    name: "Bronstein Music",
                    logo: "/images/percussions.png",
                    price: 50
                },
                images: [
                    {
                        url: "/images/percussions.png",
                        status: "Approved"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Pending"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Rejected"
                    }
                ]
            },
            {
                id: 2,
                business: {
                    name: "Bronstein Music",
                    logo: "/images/percussions.png",
                    price: 50
                },
                images: [
                    {
                        url: "/images/percussions.png",
                        status: "Approved"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Pending"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Rejected"
                    }
                ]
            },
            {
                id: 3,
                business: {
                    name: "Bronstein Music",
                    logo: "/images/percussions.png",
                    price: 50
                },
                images: [
                    {
                        url: "/images/percussions.png",
                        status: "Approved"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Pending"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Rejected"
                    }
                ]
            },
            {
                id: 4,
                business: {
                    name: "Bronstein Music",
                    logo: "/images/percussions.png",
                    price: 50
                },
                images: [
                    {
                        url: "/images/percussions.png",
                        status: "Approved"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Pending"
                    },
                    {
                        url: "/images/percussions.png",
                        status: "Rejected"
                    }
                ]
            }
        ],
        businesses: [
            {
                id: "1",
                name: "Updated Melody Hub",
                image: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                address: "New Address, Dhaka",
                phone: "+880199999999",
                email: "new@melodyhub.com",
                website: "https://melodyhub-updated.com",
                description: "Updated description of the business",
                rating: 4.5,
                reviewsCount: 150,
                status: "Published"
            },
            {
                id: "2",
                name: "Harmony Instruments",
                image: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                address: "Harmony Street, Dhaka",
                phone: "+880188888888",
                email: "harmony@instruments.com",
                website: "https://harmonyinstruments.com",
                description: "Description of Harmony Instruments",
                rating: 4.0,
                reviewsCount: 100,
                status: "Pending"
            },
            {
                id: "3",
                name: "Rhythm & Strings",
                image: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                address: "Rhythm Road, Dhaka",
                phone: "+880177777777",
                email: "rhythm@strings.com",
                website: "https://rhythmstrings.com",
                description: "Description of Rhythm & Strings",
                rating: 0,
                reviewsCount: 0,
                status: "Rejected"
            },
            {
                id: "4",
                name: "Melody Makers",
                image: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                address: "Melody Lane, Dhaka",
                phone: "+880166666666",
                email: "melody@makers.com",
                website: "https://melodymakers.com",
                description: "Description of Melody Makers",
                rating: 4.3,
                reviewsCount: 90,
                status: "Published"
            },
            {
                id: "5",
                name: "Updated Melody Hub",
                image: [
                    "/images/percussions.png",
                    "/images/percussions.png",
                    "/images/percussions.png"
                ],
                address: "New Address, Dhaka",
                phone: "+880199999999",
                email: "new@melodyhub.com",
                website: "https://melodyhub-updated.com",
                description: "Updated description of the business",
                rating: 4.5,
                reviewsCount: 150,
                status: "Published"
            }
        ]
    }

    return (
        <div>
            <Tabs defaultValue="reviews" className="w-full">
                <TabsList className="gap-4 bg-transparent">
                    <TabsTrigger
                        value="reviews"
                        className="data-[state=active]:bg-[#00998E] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
                    >
                        Reviews ({reviewsData.reviews.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="photos"
                        className="data-[state=active]:bg-[#00998E] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
                    >
                        Photos ({reviewsData.photos.length})
                    </TabsTrigger>
                    <TabsTrigger
                        value="businesses"
                        className="data-[state=active]:bg-[#00998E] data-[state=active]:text-white bg-[#E0E0E0] px-5 py-2"
                    >
                        Businesses ({reviewsData.businesses.length})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="reviews">
                    <div className="py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Reviews <span className='text-[#8D9A99]'>({reviewsData.reviews.length})</span></h3>
                        {
                            reviewsData?.reviews?.length > 0 && (
                                <Button>Write a Review</Button>
                            )
                        }
                    </div>
                    {
                        reviewsData?.reviews?.length > 0 ?
                            (
                                <div className="space-y-5">
                                    {
                                        reviewsData.reviews.map((review) => (
                                            <div key={review?.author.name} className="p-6 border rounded-md shadow-md">
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <div className="">
                                                            <div className="flex items-center gap-4">
                                                                <Image
                                                                    src={review.author.profilePicture || "/images/default_profile.png"}
                                                                    alt={review.author.name}
                                                                    width={50}
                                                                    height={50}
                                                                    className="h-16 w-16 rounded-full object-cover"
                                                                />
                                                                <div className="">
                                                                    <h3 className='text-lg font-semibold'>{review.author.name}</h3>
                                                                    <p className='text-base text-[#485150]'>{review.author.role}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 py-3">
                                                                {Array.from({ length: 5 }, (_, index) => (
                                                                    <Star
                                                                        key={index}
                                                                        className={`h-6 w-6 inline-block ${index < review.rating ? "text-yellow-500" : "text-gray-300"
                                                                            }`}
                                                                        fill={index < review.rating ? "currentColor" : "#E7E9E9"}
                                                                        stroke='none'
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-3 items-center">
                                                            <p className={`${review.status === "Published" ? "text-green-500" : review.status === "Pending" ? "text-[#E38441] bg-[#E384411F]" : "text-[#E24040] bg-[#E240401F]"} px-4 py-1 rounded-xl`}>{review.status}</p>
                                                            <MoreVertical />
                                                        </div>
                                                    </div>
                                                    <p className='text-base text-[#485150]'>{review.content}</p>
                                                    <div className="flex items-center gap-3">
                                                        {
                                                            review.photos.length > 0 && (
                                                                <div className="flex gap-6 flex-wrap">
                                                                    {
                                                                        review.photos.slice(0, 3).map((photo, index) => (
                                                                            <Image
                                                                                key={index}
                                                                                src={photo}
                                                                                alt={`Review photo ${index + 1}`}
                                                                                width={1000}
                                                                                height={1000}
                                                                                className="h-32 w-32 object-cover rounded-md"
                                                                            />
                                                                        ))
                                                                    }
                                                                    {
                                                                        review.photos.length > 3 && (
                                                                            <span className="text-gray-500">+{review.photos.length - 3} more</span>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            (
                                <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="/images/review.png"
                                            alt='No reviews yet'
                                            width={300}
                                            height={300}
                                            className="h-16 w-16 object-contain"
                                        />
                                        <div className="space-y-2">
                                            <h4 className='text-xl font-semibold'>No Reviews Given</h4>
                                            <p>You haven&apos;t written any reviews yet. Share your story to guide fellow musicians.</p>
                                        </div>
                                    </div>
                                    <Link href="/review-business" className="flex-shrink-0">
                                        <Button>
                                            Add a Review
                                        </Button>
                                    </Link>
                                </div>
                            )
                    }
                </TabsContent>
                <TabsContent value="photos">
                    <div className="py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold mb-2">Photos <span className="text-[#8D9A99]">({reviewsData?.photos?.length || 0})</span></h3>
                        {
                            reviewsData?.photos?.length > 0 && (
                                <Button>Add a Photo</Button>
                            )
                        }
                    </div>
                    {
                        reviewsData?.photos?.length > 0 ?
                            (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {
                                        reviewsData?.photos?.map((photo) => (
                                            <div key={photo?.business.name} className="p-4 space-y-4 border shadow-md rounded-md">
                                                <div className="flex gap-2 items-center">
                                                    <Image
                                                        src={photo.business.logo}
                                                        alt={photo.business.name}
                                                        width={200}
                                                        height={200}
                                                        className='h-20 w-20 rounded-lg object-cover'
                                                    />
                                                    <div className="space-y-1">
                                                        <h4 className='text-lg font-semibold'>{photo.business.name}</h4>
                                                        <p className='text-sm text-gray-500'>${photo.business.price}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 items-center">
                                                    {
                                                        photo?.images?.map((image) => (
                                                            <div key={image?.url} className="relative">
                                                                <Image
                                                                    src={image.url}
                                                                    alt="Photo"
                                                                    width={200}
                                                                    height={200}
                                                                    className='w-full aspect-[5/4] rounded-lg object-contain'
                                                                />
                                                                <div className="absolute right-2 top-2 flex gap-1 items-center">
                                                                    <p className="bg-white text-black rounded-md px-4 py-1">{image.status}</p>
                                                                    <Button className='h-8 w-8 p-1 rounded-md bg-white text-black hover:bg-gray-100'>
                                                                        <MoreVertical />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            (
                                <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="/images/percussions.png"
                                            alt='No photos yet'
                                            width={300}
                                            height={300}
                                            className="h-16 w-16 object-contain"
                                        />
                                        <div className="space-y-2">
                                            <h4 className='text-xl font-semibold'>No Photos Uploaded</h4>
                                            <p>Help other musicians by sharing pictures of your repair experience and favorite shops</p>
                                        </div>
                                    </div>
                                    <Link href="/review- " className="flex-shrink-0">
                                        <Button>
                                            Upload Photos
                                        </Button>
                                    </Link>
                                </div>
                            )
                    }
                </TabsContent>
                <TabsContent value="businesses">
                    <div className="py-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold mb-2">Businesses <span className="text-[#8D9A99]">({reviewsData?.businesses?.length || 0})</span></h3>
                        {
                            reviewsData?.businesses?.length > 0 && (
                                <Button>Add a Business</Button>
                            )
                        }
                    </div>
                    {
                        reviewsData?.businesses?.length > 0 ?
                            (
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {reviewsData?.businesses.map((business) => (
                                        <BusinessCard key={business.id} business={business} />
                                    ))}
                                </div>
                            )
                            :
                            (
                                <div className="flex justify-between items-center bg-[#F7F8F8] p-6 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="/images/business.png"
                                            alt='No photos yet'
                                            width={300}
                                            height={300}
                                            className="h-16 w-16 object-contain"
                                        />
                                        <div className="space-y-2">
                                            <h4 className='text-xl font-semibold'>No Business Added</h4>
                                            <p>Know a hidden gem? Add it to support our music community</p>
                                        </div>
                                    </div>
                                    <Link href="/add-business" className="flex-shrink-0">
                                        <Button>
                                            Add Business
                                        </Button>
                                    </Link>
                                </div>
                            )
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}
