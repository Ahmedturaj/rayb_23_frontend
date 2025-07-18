"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Phone,
  MessageCircle,
  Mail,
  Globe,
  MapPin,
  ThumbsUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const services = [
  { name: "Guitar", price: 45, category: "Repair" },
  { name: "Piano", price: 50, category: "Repair" },
  { name: "Violin", price: 40, category: "Repair" },
  { name: "Bass Guitar", price: 55, category: "Repair" },
  { name: "Drums", price: 60, category: "Repair" },
  { name: "Saxophone", price: 65, category: "Repair" },
  { name: "Flute", price: 35, category: "Repair" },
  { name: "Trumpet", price: 45, category: "Repair" },
  { name: "Cello", price: 70, category: "Repair" },
  { name: "Clarinet", price: 40, category: "Repair" },
  { name: "Trombone", price: 50, category: "Repair" },
  { name: "French Horn", price: 75, category: "Repair" },
];

const workingHours = [
  { day: "Monday", hours: "09:00 AM - 05:00 PM" },
  { day: "Tuesday", hours: "09:00 AM - 05:00 PM" },
  { day: "Wednesday", hours: "09:00 AM - 05:00 PM" },
  { day: "Thursday", hours: "09:00 AM - 05:00 PM" },
  { day: "Friday", hours: "09:00 AM - 05:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 04:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 04:00 PM" },
];

const tools = [
  { category: "Lessons", items: ["Guitar", "Piano", "Violin", "Drums"] },
  {
    category: "Repair",
    items: ["String Instruments", "Wind Instruments", "Percussion"],
  },
  { category: "Maintenance", items: ["Tuning", "Cleaning", "Setup"] },
];

const reviews = [
  {
    id: 1,
    name: "Sandra S.",
    rating: 5,
    date: "2 days ago",
    text: "Excellent service! My guitar was repaired quickly and sounds amazing. The staff was very knowledgeable and friendly. Highly recommend!",
    images: [
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
      "/placeholder.svg?height=60&width=60",
    ],
    helpful: 12,
  },
  {
    id: 2,
    name: "Michael R.",
    rating: 5,
    date: "1 week ago",
    text: "Great experience! They fixed my piano and it sounds better than ever. Professional service and fair pricing.",
    helpful: 8,
  },
  {
    id: 3,
    name: "Sarah T.",
    rating: 4,
    date: "2 weeks ago",
    text: "Good service overall. My violin repair was done well, though it took a bit longer than expected. Still satisfied with the results.",
    helpful: 5,
  },
  {
    id: 4,
    name: "David L.",
    rating: 5,
    date: "3 weeks ago",
    text: "Outstanding work! They repaired my saxophone and provided excellent customer service. Will definitely return for future needs.",
    helpful: 15,
  },
  {
    id: 5,
    name: "Emma W.",
    rating: 5,
    date: "1 month ago",
    text: "Fantastic experience! The team at Brookston Music really knows their stuff. My guitar sounds incredible after their repair work.",
    helpful: 9,
  },
];

const ratingDistribution = [
  { stars: 5, count: 847, percentage: 85 },
  { stars: 4, count: 98, percentage: 10 },
  { stars: 3, count: 25, percentage: 3 },
  { stars: 2, count: 12, percentage: 1 },
  { stars: 1, count: 8, percentage: 1 },
];

export default function BusinessProfile() {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Brookston Music"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">Brookston Music</h1>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">{renderStars(5)}</div>
                    <span className="text-lg font-semibold">4.7</span>
                    <span className="text-gray-600">(990)</span>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Business
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About the Business */}
          <Card>
            <CardHeader>
              <CardTitle>About the Business</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Brookston Music has been serving the community for over 15
                years, providing expert instrument repair, maintenance, and
                music lessons. Our experienced technicians specialize in string,
                wind, and percussion instruments, ensuring your musical
                instruments perform at their best. We pride ourselves on quality
                craftsmanship and exceptional customer service.
              </p>
            </CardContent>
          </Card>

          {/* Service Type */}
          <Card>
            <CardHeader>
              <CardTitle>Service Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="text-gray-700">{service.name}</span>
                    <span className="font-semibold">${service.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tools.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-2">{category.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <Badge key={itemIndex} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rating & Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Rating & Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">4.7</div>
                  <div className="flex justify-center mb-2">
                    {renderStars(5)}
                  </div>
                  <div className="text-gray-600">990 reviews</div>
                </div>
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-sm w-4">{item.stars}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Progress
                        value={item.percentage}
                        className="flex-1 h-2"
                      />
                      <span className="text-sm text-gray-600 w-8">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b pb-6 last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{review.name}</span>
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.text}</p>
                        {review.images && (
                          <div className="flex space-x-2 mb-3">
                            {review.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Review image ${index + 1}`}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                            ))}
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <span>info@brookstonmusic.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-teal-600" />
                <span>www.brookstonmusic.com</span>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {workingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className="font-medium">{schedule.hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                  <div>
                    <div className="font-medium">123 Music Street</div>
                    <div className="text-gray-600">San Francisco, CA 94102</div>
                  </div>
                </div>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map View</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
