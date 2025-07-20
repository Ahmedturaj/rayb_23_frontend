import Image from "next/image"
import { MapPin, Star } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface BusinessSubmission {
  id: string
  name: string
  priceRange: string
  rating: number | null
  reviews: number | null
  distance: string
  services: string[]
  status: "under_review" | "approved"
  image: string
  imageQuery: string
}

const dummySubmissions: BusinessSubmission[] = [
  {
    id: "1",
    name: "San Francisco Guitar Tech",
    priceRange: "$$$",
    rating: null,
    reviews: null,
    distance: "3.8 km away",
    services: ["Restringing", "Restringing", "Dents Removal", "Repainting", "Fretwork", "Electronics Repair", "Setup"],
    status: "under_review",
    image: "/images/giter.png",
    imageQuery: "person working on guitar",
  },
  {
    id: "2",
    name: "San Francisco Guitar Tech",
    priceRange: "$$$",
    rating: null,
    reviews: null,
    distance: "3.8 km away",
    services: ["Restringing", "Restringing", "Dents Removal", "Repainting", "Fretwork", "Electronics Repair", "Setup"],
    status: "under_review",
      image: "/images/giter.png",
    imageQuery: "person holding electric guitar",
  },
  {
    id: "3",
    name: "San Francisco Guitar Tech",
    priceRange: "$$$",
    rating: 4.7,
    reviews: 346,
    distance: "3.8 km away",
    services: ["Restringing", "Restringing", "Dents Removal", "Repainting", "Fretwork", "Electronics Repair", "Setup"],
    status: "approved",
      image: "/images/giter.png",
    imageQuery: "guitar shop interior",
  },
]

export default function Component() {
  return (
    <div className="min-h-screen ">
      <div className="w-full mx-auto bg-white  p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-[28px] font-bold text-[#1D2020]">Manage Business Submissions</h1>
          <p className="text-base text-[#485150] mt-3">
            Monitor platform activity, manage submissions, and keep your community running smoothly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div className="w-[30%] ">
            <label htmlFor="business-type" className="block text-sm font-medium text-gray-700 sr-only">
              Business Type
            </label>
            <Select defaultValue="all">
              <SelectTrigger id="business-type" className="w-full ">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#F7F8F8]">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[30%]">
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 sr-only">
              Sort By
            </label>
            <Select defaultValue="latest">
              <SelectTrigger id="sort-by" className="w-full ">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-[#F7F8F8]">
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[30%]">
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 sr-only">
              Time Range
            </label>
            <Select defaultValue="all">
              <SelectTrigger id="time-range" className="w-full ">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#F7F8F8]">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {dummySubmissions.map((submission) => (
            <Card key={submission.id} className="p-4 flex flex-col border-none sm:flex-row  gap-4 relative shadow-[#003D3914]">
              <Image
                src={submission.image || "/placeholder.svg"}
                alt={submission.imageQuery}
                width={1000}
                height={1000}
                className="rounded-[12px] w-[200px] h-[200px] object-cover aspect-square shrink-0"
              />
              <div className="flex-1 grid gap-2">
                <h2 className="text-[24px] font-bold text-[#1D2020]">
                  {submission.name} {submission.priceRange}
                </h2>
                <div className="flex items-center gap-2 text-xl text-[#485150]">
                  {submission.rating ? (
                    <>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>
                        {submission.rating} ({submission.reviews})
                      </span>
                    </>
                  ) : (
                    <>
                      <Star className="w-4 h-4 text-gray-400" />
                      <span >Not Rated</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xl text-[#485150]">
                  <MapPin className="w-4 h-4" />
                  <span>{submission.distance}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 items-center">
                  {submission.services.slice(0, 4).map((service, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2 text-base font-normal text-[#485150] rounded-[8px]">
                      {service}
                    </Badge>
                  ))}
                  {submission.services.length > 4 && (
                    <span className="text-sm text-muted-foreground px-2 py-1">
                      {`+ ${submission.services.length - 4} more`}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 sm:ml-auto mt-4 sm:mt-0">
                {submission.status === "under_review" && (
                  <>
                    <Badge
                      variant="outline"
                      className="bg-[#E384411F] text-[#E38441] px-3 py-2 rounded-full text-sm font-medium"
                    >
                      Under Review
                    </Badge>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        className="border border-[#E24040] text-reject-button-text "
                      >
                        Reject
                      </Button>
                      <Button className="bg-[#00998E] text-white text-base ">
                        Approve
                      </Button>
                    </div>
                  </>
                )}
                {submission.status === "approved" && (
                  <Badge
                    variant="outline"
                    className="bg-approved-badge-bg text-approved-badge-text px-3 py-1 rounded-full text-xs font-medium"
                  >
                    Approved
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
