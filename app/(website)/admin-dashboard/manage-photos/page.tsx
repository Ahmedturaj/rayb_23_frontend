import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface PhotoEntryProps {
  id: string;
  userName: string;
  userAvatar: string;
  userDescription: string;
  images: string[];
  status: "under_review" | "approved" | "rejected";
}

const photoEntries: PhotoEntryProps[] = [
  {
    id: "1",
    userName: "Bronstein Music",
    userAvatar: "/placeholder.svg?height=40&width=40",
    userDescription: "$$$",
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
  //   userName: "Bronstein Music",
  //   userAvatar: "/placeholder.svg?height=40&width=40",
  //   userDescription: "$$$",
  //   images: [
  //     "/placeholder.svg?height=100&width=100",
  //     "/placeholder.svg?height=100&width=100",
  //     "/placeholder.svg?height=100&width=100",
  //     "/placeholder.svg?height=100&width=100",
  //   ],
  //   status: "under_review",
  // },
  {
    id: "3",
    userName: "Bronstein Music",
    userAvatar: "/placeholder.svg?height=40&width=40",
    userDescription: "$$$",
     images: [
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
    ],
    status: "approved",
  },
  {
    id: "4",
    userName: "Bronstein Music",
    userAvatar: "/placeholder.svg?height=40&width=40",
    userDescription: "$$$",
     images: [
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
      "/images/giter.png",
    ],
    status: "rejected",
  },
];

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="px-6 py-4  ">
        <div className="w-full">
          <h1 className="text-[28px] text-[#1D2020] font-bold">
            Manage Photos
          </h1>
          <p className="text-base text-[#485150] mt-3">
            Monitor platform activity, manage submissions, and keep your
            community running smoothly.
          </p>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="w-full grid gap-6">
          <div className="flex  justify-between ">
            <div className="w-[30%]">
              <label
                htmlFor="photos-type"
                className="text-base text-[#485150]  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3"
              >
                Photos Type
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="photos-type" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New Submissions</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="sort-by"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sort By
              </label>
              <Select defaultValue="latest">
                <SelectTrigger id="sort-by" className="w-full">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[30%]">
              <label
                htmlFor="time-range"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Time Range
              </label>
              <Select defaultValue="all">
                <SelectTrigger id="time-range" className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6">
            {photoEntries.map((entry) => (
              <Card key={entry.id} className="relative border-none shadow-[#003D3914]">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={entry.userAvatar || "/placeholder.svg"}
                      alt={entry.userName}
                    />
                    <AvatarFallback>{entry.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5">
                    <div className="font-semibold text-[#485150] text-xl">{entry.userName}</div>
                    <div className="text-sm text-[#8D9A99] dark:text-gray-400">
                      {entry.userDescription}
                    </div>
                  </div>
                  <div className="ml-auto">
                    {entry.status === "under_review" && (
                      <Badge
                        variant="outline"
                        className="bg-orange-100 text-orange-600 border-orange-200"
                      >
                        Under Review
                      </Badge>
                    )}
                    {entry.status === "approved" && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-600 border-green-200"
                      >
                        Approved
                      </Badge>
                    )}
                    {entry.status === "rejected" && (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-600 border-red-200"
                      >
                        Rejected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex items-end  ">
                  <div className="flex w-[70%] gap-4 flex-wrap">
                    {entry.images.map((imageSrc, index) => (
                      <Image
                        key={index}
                        src={imageSrc || "/placeholder.svg"}
                        width={150}
                        height={150}
                        alt={`Photo ${index + 1} from ${entry.userName}`}
                        className="rounded-lg object-cover aspect-square"
                      />
                    ))}
                  </div>
                  <div className="w-[30%] flex flex-col justify-between">
                  {entry.status === "under_review" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        Reject
                      </Button>
                      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        Approve
                      </Button>
                    </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
