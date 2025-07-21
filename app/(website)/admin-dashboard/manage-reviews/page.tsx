import Image from "next/image"
import { Star } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: string
  userName: string
  userRole: string
  rating: number
  reviewText: string
  images: string[]
  status: "under_review" | "approved"
  businessReply?: string
}

const reviews: Review[] = [
  {
    id: "1",
    userName: "Samantha T.",
    userRole: "Pianist",
    rating: 5.0,
    reviewText:
      "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
         images: [
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
    ],
    status: "under_review",
  },
  // {
  //   id: "2",
  //   userName: "Samantha T.",
  //   userRole: "Pianist",
  //   rating: 5.0,
  //   reviewText:
  //     "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
  //   images: [
  //     "/placeholder.svg?height=80&width=80",
  //     "/placeholder.svg?height=80&width=80",
  //     "/placeholder.svg?height=80&width=80",
  //   ],
  //   status: "under_review",
  // },
  {
    id: "3",
    userName: "Samantha T.",
    userRole: "Pianist",
    rating: 5.0,
    reviewText:
      "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
     images: [
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
    ],
    status: "approved",
    businessReply: "Thanks Samantha, thanks for the review, we're always available to help!",
  },
]

export default function Component() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-[28px] text-[#1D2020] font-bold">Manage Reviews</h1>
        <p className="text-[#485150] text-base mt-3">
          Monitor platform activity, manage submissions, and keep your community running smoothly.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="review-type" className="block text-base font-medium text-[#485150]">
            Review Type
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="review-type" className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="sort-by" className="block text-base font-medium text-[#485150]">
            Sort By
          </label>
          <Select defaultValue="latest">
            <SelectTrigger id="sort-by" className="w-full">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="highest-rating">Highest Rating</SelectItem>
              <SelectItem value="lowest-rating">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="time-range" className="block text-base font-medium text-[#485150]">
            Time Range
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="time-range" className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="relative">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl text-[#1D2020] font-semibold">{review.userName}</CardTitle>
                  <p className="text-base text-[#485150]">{review.userRole}</p>
                </div>
              </div>
              {review.status === "under_review" && (
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                  Under Review
                </Badge>
              )}
              {review.status === "approved" && (
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  Approved
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{review.rating.toFixed(1)}</span>
              </div>
              <p className="mb-4 text-base text-[#485150] font-medium">{review.reviewText}</p>
              <div className="mb-4 flex space-x-2">
                {review.images.map((src, index) => (
                  <Image
                    key={index}
                    src={src || "/placeholder.svg"}
                    width={80}
                    height={80}
                    alt={`Review image ${index + 1}`}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                ))}
              </div>
              {review.status === "under_review" && (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" className="border-red-400 text-red-600 hover:bg-red-50 bg-transparent">
                    Reject
                  </Button>
                  <Button className="bg-teal-500 text-white hover:bg-teal-600">Approve</Button>
                </div>
              )}
              {review.status === "approved" && review.businessReply && (
                <div className="mt-4 rounded-md bg-gray-50 p-3 text-sm dark:bg-gray-800">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Business&apos;s Reply</p>
                  <p className="text-gray-600 dark:text-gray-400">{review.businessReply}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
