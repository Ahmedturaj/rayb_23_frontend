"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MapPin,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const instructors = [
  {
    id: 1,
    name: "Brookston Music",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    reviews: 125,
    distance: "5.8 km away",
    price: "$45.00",
    services: ["Recording", "Lessons"],
    instruments: ["Guitar", "Piano"],
  },
  {
    id: 2,
    name: "San Francisco Guitar Tech",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviews: 89,
    distance: "2.8 km away",
    price: "$55.00",
    services: ["Recording", "Setup"],
    instruments: ["Guitar"],
  },
  {
    id: 3,
    name: "San Francisco Guitar Tech",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.2,
    reviews: 156,
    distance: "3.1 km away",
    price: "$40.00",
    services: ["Recording", "Lessons"],
    instruments: ["Guitar"],
  },
  {
    id: 4,
    name: "Brookston Music",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 203,
    distance: "4.2 km away",
    price: "$50.00",
    services: ["Lessons", "Tuning"],
    instruments: ["Piano", "Violin"],
  },
  {
    id: 5,
    name: "Brookston Music",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.6,
    reviews: 167,
    distance: "6.1 km away",
    price: "$42.00",
    services: ["Recording", "Lessons"],
    instruments: ["Guitar", "Bass"],
  },
];

export default function SearchComponent() {
  const [priceRange, setPriceRange] = useState([20, 80]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(true);

  const instrumentFamilies = [
    { name: "Guitar", count: 45 },
    { name: "Saxophone", count: 23 },
    { name: "Piano", count: 67 },
    { name: "Keyboard", count: 34 },
    { name: "Other", count: 89 },
  ];

  const instruments = [
    "Violin",
    "Guitar",
    "Piano",
    "Harp",
    "Singing",
    "Bass",
    "Vocals",
  ];

  const serviceTypes = [
    "All",
    "Recording",
    "Lessons",
    "Tuning",
    "Repairs",
    "Setup and Adjustments",
  ];

  const handleInstrumentChange = (instrument: string, checked: boolean) => {
    if (checked) {
      setSelectedInstruments([...selectedInstruments, instrument]);
    } else {
      setSelectedInstruments(
        selectedInstruments.filter((i) => i !== instrument)
      );
    }
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className="w-80 bg-white p-6 border-r">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>

        {/* Instrument Family */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Instrument Family</h3>
          <div className="space-y-3">
            {instrumentFamilies.map((family) => (
              <div
                key={family.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox id={family.name} />
                  <label htmlFor={family.name} className="text-sm">
                    {family.name}
                  </label>
                </div>
                <span className="text-xs text-gray-500">{family.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Select Instruments */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Select Instruments</h3>
          <div className="space-y-3">
            {instruments.map((instrument) => (
              <div key={instrument} className="flex items-center space-x-2">
                <Checkbox
                  id={instrument}
                  checked={selectedInstruments.includes(instrument)}
                  onCheckedChange={(checked) =>
                    handleInstrumentChange(instrument, checked as boolean)
                  }
                />
                <label htmlFor={instrument} className="text-sm">
                  {instrument}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Service Type */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Service Type</h3>
          <div className="space-y-3">
            {serviceTypes.map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={(checked) =>
                    handleServiceChange(service, checked as boolean)
                  }
                />
                <label htmlFor={service} className="text-sm">
                  {service}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="font-medium mb-4">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              min={0}
              step={5}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Online Classes</h1>
            <div className="flex items-center space-x-2">
              <Select defaultValue="design">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="guitar">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guitar">Guitar</SelectItem>
                  <SelectItem value="piano">Piano</SelectItem>
                  <SelectItem value="violin">Violin</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="beginner">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by</span>
            <Select defaultValue="price-low">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price Low to High</SelectItem>
                <SelectItem value="price-high">Price High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox id="open-now" />
              <label htmlFor="open-now" className="text-sm">
                Open Now
              </label>
            </div>
          </div>
        </div>

        {/* Instructor Cards */}
        <div className="grid gap-4 mb-8">
          {instructors.map((instructor) => (
            <Card key={instructor.id} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <Image
                    src={instructor.image || "/placeholder.svg"}
                    alt={instructor.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          {instructor.name}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(instructor.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {instructor.rating} ({instructor.reviews})
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 mb-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {instructor.distance}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          {instructor.services.map((service) => (
                            <Badge
                              key={service}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                          <span className="text-sm font-semibold text-teal-600">
                            {instructor.price}
                          </span>
                        </div>
                      </div>
                      <Button variant="link" className="text-teal-600 p-0">
                        See More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-teal-600 hover:bg-teal-700"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <span className="text-gray-400">...</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center">
          <Button className="bg-teal-600 hover:bg-teal-700">See More</Button>
        </div>
      </div>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 w-80 border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-teal-600" />
              <span className="font-medium">Can&apos;t find the music class?</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Get a recommendation based on your needs and preferences
          </p>
          <div className="space-y-2">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Quick Answers
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Get answers from our music experts
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
