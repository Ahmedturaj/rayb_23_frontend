'use client';
import Image from "next/image";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Review {
  _id: string;
  rating: number;
  feedback: string;
  image: string[];
  status: "approved" | "pending" | "rejected";
  user: User;
  business: null | string;
  report: { isReport: boolean };
  googlePlaceId: null | string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  status: boolean;
  message: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  data: Review[];
}

const fetchReviews = async (reviewType: string, sortBy: string, timeRange: string, token?: string): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/review?reviewType=${reviewType}&nameSort=az&sortBy=${sortBy}&timeRange=${timeRange}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};

export default function ReviewsComponent() {
  const [reviewType, setReviewType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("");
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["reviews", reviewType, sortBy, timeRange, token],
    queryFn: () => fetchReviews(reviewType, sortBy, timeRange, token),
  });

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
          <Select value={reviewType} onValueChange={setReviewType}>
            <SelectTrigger id="review-type" className="w-full">
              <SelectValue placeholder="Select Review Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="sort-by" className="block text-base font-medium text-[#485150]">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-by" className="w-full">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="time-range" className="block text-base font-medium text-[#485150]">
            Time Range
          </label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger id="time-range" className="w-full">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div>Loading reviews...</div>
      ) : error ? (
        <div className="text-red-500">Error fetching reviews: {(error as Error).message}</div>
      ) : (
        <div className="grid gap-6">
          {data?.data.map((review) => (
            <Card key={review._id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={review?.user?.name} />
                    <AvatarFallback>{review?.user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl text-[#1D2020] font-semibold">{review?.user?.name}</CardTitle>
                    <p className="text-base text-[#485150]">{review?.user?.email}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    review.status === "rejected"
                      ? "bg-red-100 text-red-700 border-red-200"
                      : review.status === "approved"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-orange-100 text-orange-700 border-orange-200"
                  }
                >
                  {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                </Badge>
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
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mb-4 text-base text-[#485150] font-medium">{review.feedback}</p>
                <div className="mb-4 flex space-x-2">
                  {review.image.map((src, index) => (
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
                {review.status === "pending" && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" className="border-red-400 text-red-600 hover:bg-red-50 bg-transparent">
                      Reject
                    </Button>
                    <Button className="bg-teal-500 text-white hover:bg-teal-600">Approve</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}