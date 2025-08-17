"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Star, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useBusinessContext } from "@/lib/business-context";
import { getMyReview } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  imageLink: string | null;
}

interface Report {
  reportMessage: {
    isReport: boolean;
  };
  isReport: boolean;
}

interface Review {
  _id: string;
  rating: number;
  feedback: string;
  image: string[];
  status: "pending" | "approved" | "rejected";
  user: User;
  business: string;
  googlePlaceId: string | null;
  createdAt: string;
  updatedAt: string;
  report: Report;
  __v: number;
}

interface ReviewsResponse {
  success: boolean;
  data: Review[];
}

export default function ReviewsComponent() {
  const { selectedBusinessId } = useBusinessContext();

  const { data, isLoading, error } = useQuery<ReviewsResponse>({
    queryKey: ["reviews", selectedBusinessId],
    queryFn: () => getMyReview(selectedBusinessId as string),
  });

  // Calculate rating distribution from API data
  const ratingDistribution =
    data?.data?.reduce(
      (acc, review) => {
        const index = 5 - review.rating; // Convert 5-star to index 0, 1-star to index 4
        acc[index].count++;
        return acc;
      },
      [
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
      ]
    ) || [];

  // Calculate percentages
  const totalReviews = ratingDistribution.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const ratingDistributionWithPercentages = ratingDistribution.map((item) => ({
    ...item,
    percentage:
      totalReviews > 0 ? Math.round((item.count / totalReviews) * 100) : 0,
  }));

  // Calculate average rating
  const averageRating =
    (data?.data ?? []).reduce((sum, review) => sum + review.rating, 0) /
      ((data?.data ?? []).length || 1);

  if (isLoading) return <div>Loading reviews...</div>;
  if (error) return <div>Error loading reviews</div>;

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 text-sm">
            Improve your customer engagement by replying to customer reviews
          </p>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-32 text-sm">
              <SelectValue placeholder="All Reviews" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reviews</SelectItem>
              <SelectItem value="5star">5 Star</SelectItem>
              <SelectItem value="4star">4 Star</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="latest">
            <SelectTrigger className="w-24 text-sm">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rating Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Overall Rating */}
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <Star className="h-8 w-8 text-white fill-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">
                  {totalReviews} Reviews
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {ratingDistributionWithPercentages.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="text-sm text-gray-600 w-12">
                    {item.stars} Star
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-12 text-right">
                    ({item.count})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {data?.data?.length ? (
          data.data.map((review) => (
            <Card key={review._id} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={review.user.imageLink || "/placeholder.svg"}
                        />
                        <AvatarFallback className="bg-yellow-500 text-white">
                          {review.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {review.user.name}
                          </h4>
                          <span className="text-sm font-medium text-gray-900">
                            {review.rating.toFixed(1)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {review.report.isReport ? (
                      <span className="text-xs text-red-500">Reported</span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 text-sm"
                      >
                        Report
                      </Button>
                    )}
                  </div>

                  {/* Review Content */}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.feedback}
                  </p>

                  {/* Business Reply Section */}
                  {review.status === "pending" && (
                    <div className="flex gap-3 pt-2">
                      <Input
                        placeholder="Enter your reply"
                        className="flex-1 text-sm"
                      />
                      <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6">
                        Submit
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No Reviews Yet
            </h3>
            <p className="text-sm text-gray-500">
              There are no reviews to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
