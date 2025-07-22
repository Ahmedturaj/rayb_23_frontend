"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Building,
  Star,
  ImageIcon,
  FileText,
  Users,
  ClipboardList,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

// Define types for the API response data for better type safety
interface DashboardMetric {
  total: number;
  new: number;
}

interface DashboardData {
  businesses: DashboardMetric;
  reviews: DashboardMetric;
  photos: DashboardMetric;
  claims: DashboardMetric;
  users: DashboardMetric;
  businessSubmissions: DashboardMetric;
  reviewSubmissions: DashboardMetric;
  photoSubmissions: DashboardMetric;
  claimRequests: DashboardMetric;
  profilesUnderReview: DashboardMetric;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

// Function to fetch dashboard data from your API
const fetchDashboardData = async (range: string): Promise<ApiResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business/dashboard?range=${range}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  return response.json();
};

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState<"day" | "week" | "month">(
    "day"
  );

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["dashboardData", selectedRange],
    queryFn: () => fetchDashboardData(selectedRange),
    staleTime: 1000 * 60 * 5,
  });

  const dashboardMetrics = data?.data;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <h1 className="text-2xl font-bold text-[#1D2020]">Dashboard</h1>
                <p className="text-base text-[#485150] font-normal">
                  Monitor platform activity, manage submissions, and keep your
                  community running smoothly.
                </p>
              </div>
              <ToggleGroup
                type="single"
                value={selectedRange}
                onValueChange={(value: "day" | "week" | "month") => {
                  if (value) {
                    setSelectedRange(value);
                  }
                }}
                className="flex-shrink-0"
              >
                {["day", "week", "month"].map((range) => (
                  <ToggleGroupItem
                    key={range}
                    value={range}
                    aria-label={`Toggle ${range}`}
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                      selectedRange === range
                        ? "!bg-[#00998E] !text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Display loading, error, or data */}
            {isLoading && (
              <p className="text-center text-lg">Loading dashboard data...</p>
            )}
            {isError && (
              <p className="text-center text-lg text-red-500">
                Error: {error?.message}
              </p>
            )}

            {!isLoading && !isError && dashboardMetrics && (
              <>
                {/* Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <Card className="bg-[#00998E]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-white w-[80px]">
                        Total Businesses
                      </CardTitle>
                      <Building className="h-10 w-10 text-white" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-white">
                        {dashboardMetrics.businesses.total}
                      </div>
                      <p className="text-sm text-white font-bold">
                        {dashboardMetrics.businesses.new > 0
                          ? `+${dashboardMetrics.businesses.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F4C321]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-white w-[80px]">
                        Total Reviews
                      </CardTitle>
                      <Star className="h-10 w-10 text-white" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-white">
                        {dashboardMetrics.reviews.total}
                      </div>
                      <p className="text-sm text-white font-bold">
                        {dashboardMetrics.reviews.new > 0
                          ? `+${dashboardMetrics.reviews.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#C981F2]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-white w-[80px]">
                        Total Photos
                      </CardTitle>
                      <ImageIcon className="h-10 w-10 text-white" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-white">
                        {dashboardMetrics.photos.total}
                      </div>
                      <p className="text-sm text-white font-bold">
                        {dashboardMetrics.photos.new > 0
                          ? `+${dashboardMetrics.photos.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#3D77E0]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-white w-[80px]">
                        Business Claims
                      </CardTitle>
                      <FileText className="h-10 w-10 text-white" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-white">
                        {dashboardMetrics.claims.total}
                      </div>
                      <p className="text-sm text-white font-bold">
                        {dashboardMetrics.claims.new > 0
                          ? `+${dashboardMetrics.claims.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#FA8636]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-white w-[80px]">
                        Total Users
                      </CardTitle>
                      <Users className="h-10 w-10 text-white" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-white">
                        {dashboardMetrics.users.total}
                      </div>
                      <p className="text-sm text-white font-bold">
                        {dashboardMetrics.users.new > 0
                          ? `+${dashboardMetrics.users.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Submission Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <Card className="bg-[#00998E1F]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-[#00998E] w-[80px]">
                        Business Submissions
                      </CardTitle>
                      <Building className="h-10 w-10 text-[#00998E]" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-[#00998E]">
                        {dashboardMetrics.businessSubmissions.total}
                      </div>
                      <p className="text-sm text-[#00998E] font-bold">
                        {dashboardMetrics.businessSubmissions.new > 0
                          ? `+${dashboardMetrics.businessSubmissions.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#FFC5071F]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-[#F4C321] w-[80px]">
                        Review Submissions
                      </CardTitle>
                      <Star className="h-10 w-10 text-[#F4C321]" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-[#F4C321]">
                        {dashboardMetrics.reviewSubmissions.total}
                      </div>
                      <p className="text-sm text-[#F4C321] font-bold">
                        {dashboardMetrics.reviewSubmissions.new > 0
                          ? `+${dashboardMetrics.reviewSubmissions.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#C981F21F]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-[#C981F2] w-[80px]">
                        Photo Submissions
                      </CardTitle>
                      <ImageIcon className="h-10 w-10 text-[#C981F2]" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-[#C981F2]">
                        {dashboardMetrics.photoSubmissions.total}
                      </div>
                      <p className="text-sm text-[#C981F2] font-bold">
                        {dashboardMetrics.photoSubmissions.new > 0
                          ? `+${dashboardMetrics.photoSubmissions.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#3D77E01F]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-[#3D77E0] w-[80px]">
                        Business Claim Requests
                      </CardTitle>
                      <ClipboardList className="h-10 w-10 text-[#3D77E0]" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-[#3D77E0]">
                        {dashboardMetrics.claimRequests.total}
                      </div>
                      <p className="text-sm text-[#3D77E0] font-bold">
                        {dashboardMetrics.claimRequests.new > 0
                          ? `+${dashboardMetrics.claimRequests.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#FA86361F]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base font-medium text-[#FA8636] w-[80px]">
                        Profiles Under Review
                      </CardTitle>
                      <User className="h-10 w-10 text-[#FA8636]" />
                    </CardHeader>
                    <CardContent className="flex items-end gap-2">
                      <div className="text-[36px] font-bold text-[#FA8636]">
                        {dashboardMetrics.profilesUnderReview.total}
                      </div>
                      <p className="text-sm text-[#FA8636] font-bold">
                        {dashboardMetrics.profilesUnderReview.new > 0
                          ? `+${dashboardMetrics.profilesUnderReview.new} new`
                          : "No new"}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity and Moderation Highlights */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">
                          Jamie Submitted a new business:{" "}
                          <a
                            href="#"
                            className="font-medium text-teal-600 hover:underline"
                          >
                            GuitarFix
                          </a>
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">
                          Martha added 3 new photos for{" "}
                          <a
                            href="#"
                            className="font-medium text-purple-600 hover:underline"
                          >
                            DrumPoint
                          </a>
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">
                          Robin Submitted a new review for{" "}
                          <a
                            href="#"
                            className="font-medium text-yellow-600 hover:underline"
                          >
                            Harmonics Academy
                          </a>
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">
                          Review flagged for{" "}
                          <a
                            href="#"
                            className="font-medium text-yellow-600 hover:underline"
                          >
                            Melody Makers
                          </a>
                          : &ldquo;Scam, avoid!&ldquo;
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm">
                          Martha added 3 new photos for{" "}
                          <a
                            href="#"
                            className="font-medium text-purple-600 hover:underline"
                          >
                            DrumPoint
                          </a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Moderation Highlights</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm flex-1">
                          Review flagged for{" "}
                          <a
                            href="#"
                            className="font-medium text-yellow-600 hover:underline"
                          >
                            GuitarPro
                          </a>
                          : &ldquo;Owner was rude&ldquo;
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold"
                        >
                          Remove
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#F7F8F8] text-[#485150] font-semibold"
                        >
                          Ignore
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm flex-1">
                          New business submission:{" "}
                          <a
                            href="#"
                            className="font-medium text-teal-600 hover:underline"
                          >
                            TuneMasters
                          </a>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#00998E1F] text-[#00998E] font-semibold"
                        >
                          Approve
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <ClipboardList className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm flex-1">
                          Claim request for{" "}
                          <a
                            href="#"
                            className="font-medium text-blue-600 hover:underline"
                          >
                            PianoCare
                          </a>{" "}
                          San Diego by Ellie
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#00998E1F] text-[#00998E] font-semibold"
                        >
                          Approve
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm flex-1">
                          Photo uploaded for{" "}
                          <a
                            href="#"
                            className="font-medium text-purple-600 hover:underline"
                          >
                            Sitar House
                          </a>
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#00998E1F] text-[#00998E] font-semibold"
                        >
                          Approve
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm flex-1">
                          <a
                            href="#"
                            className="font-medium text-orange-600 hover:underline"
                          >
                            Elijah James
                          </a>{" "}
                          reported for guideline violation
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold"
                        >
                          Suspend
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-[64px] bg-[#F7F8F8] text-[#485150] font-semibold"
                        >
                          Ignore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
