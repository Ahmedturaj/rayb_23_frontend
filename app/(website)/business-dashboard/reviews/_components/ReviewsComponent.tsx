import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Star, MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function ReviewsComponent() {
  const ratingDistribution = [
    { stars: 5, count: 2600, percentage: 85 },
    { stars: 4, count: 40, percentage: 8 },
    { stars: 3, count: 32, percentage: 4 },
    { stars: 2, count: 24, percentage: 2 },
    { stars: 1, count: 14, percentage: 1 },
  ]

  const reviews = [
    {
      id: 1,
      name: "Samantha T.",
      role: "Pianist",
      rating: 5.0,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      showReply: true,
    },
    {
      id: 2,
      name: "Samantha T.",
      role: "Pianist",
      rating: 5.0,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      showReplyInput: true,
    },
    {
      id: 3,
      name: "Samantha T.",
      role: "Pianist",
      rating: 5.0,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      images: [
        "/placeholder.svg?height=80&width=80&text=1",
        "/placeholder.svg?height=80&width=80&text=2",
        "/placeholder.svg?height=80&width=80&text=3",
      ],
      businessReply: {
        text: "Thanks Samantha, thanks for the review, we're always available to help!",
      },
    },
  ]

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 text-sm">Improve your customer engagement by replying to customer reviews</p>
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
          <div className=" space-y-8">
            {/* Overall Rating */}
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-3 rounded-lg">
                <Star className="h-8 w-8 text-white fill-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.7</div>
                <div className="text-sm text-gray-600">346 Reviews</div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="text-sm text-gray-600 w-12">{item.stars} Star</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <div className="text-sm text-gray-600 w-12 text-right">({item.count})</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border border-gray-200">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-yellow-500 text-white">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <span className="text-sm font-medium text-gray-900">{review.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{review.role}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 text-sm">
                    Report
                  </Button>
                </div>

                {/* Review Content */}
                <p className="text-sm text-gray-700 leading-relaxed">{review.review}</p>

                {/* Review Images */}
                {review.images && (
                  <div className="flex gap-2">
                    {review.images.map((image, imgIndex) => (
                      <Image
                        key={imgIndex}
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${imgIndex + 1}`}
                        width={1000}
                        height={1000}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Reply Actions */}
                {review.showReply && (
                  <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">Write a reply</button>
                )}

                {/* Reply Input */}
                {review.showReplyInput && (
                  <div className="flex gap-3 pt-2">
                    <Input placeholder="Enter your reply" className="flex-1 text-sm" />
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6">Submit</Button>
                  </div>
                )}

                {/* Business Reply */}
                {review.businessReply && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">Business Reply</div>
                        <p className="text-sm text-gray-700">{review.businessReply.text}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
