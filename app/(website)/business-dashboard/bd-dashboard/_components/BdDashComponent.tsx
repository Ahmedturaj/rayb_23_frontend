import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Eye,
  MessageSquare,
  ImageIcon,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export default function BdDashComponent() {
  const metrics = [
    {
      title: "Views",
      value: "1,243",
      change: "+31 new",
      icon: Eye,
      bgColor: "bg-teal-500",
    },
    {
      title: "Reviews",
      value: "64",
      change: "+21 new",
      icon: MessageSquare,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Photos",
      value: "120",
      change: "+12 new",
      icon: ImageIcon,
      bgColor: "bg-purple-500",
    },
    {
      title: "Saved",
      value: "13",
      change: "+2 new",
      icon: Bookmark,
      bgColor: "bg-blue-500",
    },
  ];

  const reviews = [
    {
      name: "Samantha T.",
      role: "Pianist",
      rating: 5,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      hasReply: true,
    },
    {
      name: "Samantha T.",
      role: "Pianist",
      rating: 5,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      images: [
        "/placeholder.svg?height=80&width=80&text=1",
        "/placeholder.svg?height=80&width=80&text=2",
        "/placeholder.svg?height=80&width=80&text=3",
      ],
    },
    {
      name: "Samantha T.",
      role: "Pianist",
      rating: 5,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      images: [
        "/placeholder.svg?height=80&width=80&text=1",
        "/placeholder.svg?height=80&width=80&text=2",
        "/placeholder.svg?height=80&width=80&text=3",
      ],
    },
    {
      name: "Samantha T.",
      role: "Pianist",
      rating: 5,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      images: [
        "/placeholder.svg?height=80&width=80&text=1",
        "/placeholder.svg?height=80&width=80&text=2",
        "/placeholder.svg?height=80&width=80&text=3",
      ],
    },
    {
      name: "Samantha T.",
      role: "Pianist",
      rating: 5,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      images: [
        "/placeholder.svg?height=80&width=80&text=1",
        "/placeholder.svg?height=80&width=80&text=2",
        "/placeholder.svg?height=80&width=80&text=3",
      ],
    },
    {
      name: "Samantha T.",
      role: "Pianist",
      rating: 5,
      review:
        "Bronstein Music is amazing! They repaired my guitar perfectly and quickly. Excellent service, knowledgeable staff, and great attention to detail!",
      avatar: "/placeholder.svg?height=40&width=40&text=ST",
      images: [
        "/placeholder.svg?height=80&width=80&text=1",
        "/placeholder.svg?height=80&width=80&text=2",
        "/placeholder.svg?height=80&width=80&text=3",
      ],
    },
  ];

  const messages = [
    {
      name: "Susan Mae",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      time: "1h",
      bgColor: "bg-teal-50",
    },
    {
      name: "Kristin Watson",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=KW",
      time: "1 week",
    },
    {
      name: "Darrell Steward",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
      time: "1 week",
    },
    {
      name: "Jenny Wilson",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
      time: "1 week",
    },
    {
      name: "Eleanor Pena",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=EP",
      time: "1 month",
    },
    {
      name: "Esther Howard",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=EH",
      time: "2 months",
    },
    {
      name: "Marvin McKinney",
      message: "Sure, I'll let you know.",
      avatar: "/placeholder.svg?height=40&width=40&text=MM",
      time: "2 months",
    },
  ];

  return (
    <div className="space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm">
            Monitor how your business is doing on Instrufx with important
            metrics
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-1 rounded-lg">
          <Button
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md"
          >
            Day
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Week
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-500 px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Month
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className={`${metric.bgColor} border-0 text-white rounded-xl`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-white/80 text-sm font-medium">
                    {metric.title}
                  </p>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-white">
                      {metric.value}
                    </p>
                    <p className="text-white/80 text-sm">{metric.change}</p>
                  </div>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                  <metric.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reviews and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* New Reviews */}
        <div className="space-y-4 border border-gray-300 rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">New Reviews</h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-6 h-[800px] overflow-y-auto scrollbar-hide">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="space-y-3 shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg"
              >
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
                  <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {review.name}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-500">{review.role}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {review.review && (
                  <p className="text-sm text-gray-700 leading-relaxed ml-13">
                    {review.review}
                  </p>
                )}

                {review.images && (
                  <div className="flex gap-2 ml-13">
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

                {review.hasReply && (
                  <button className="text-sm text-teal-600 hover:text-teal-700 ml-13 font-medium">
                    Write a reply
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* New Messages */}
        {/* New Messages */}
        <div className="space-y-4 border border-gray-300 rounded-lg p-5">
          <div className="flex items-center justify-between border-b border-gray-300 pb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              New Messages
            </h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          <div className="space-y-6 h-[800px] overflow-y-auto scrollbar-hide">
            {messages.map((message, index) => (
              <div
                key={index}
                className="space-y-3 shadow-[0px_2px_12px_0px_#003D3914] p-4 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gray-500 text-white text-xs">
                      {message.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {message.name}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2">
                          {message.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
