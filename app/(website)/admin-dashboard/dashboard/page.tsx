"use client";

import { Building, Star, ImageIcon, FileText, Users, ClipboardList, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <div className="grid gap-1">
                <h1 className="text-2xl font-bold text-[#1D2020]">Dashboard</h1>
                <p className="text-base text-[#485150] font-normal">
                  Monitor platform activity, manage submissions, and keep your community running smoothly.
                </p>
              </div>
              <ToggleGroup type="single" defaultValue="day" className="flex-shrink-0">
                <ToggleGroupItem
                  value="day"
                  aria-label="Toggle day"
                  className="px-4 py-2 rounded-md bg-teal-500 text-white hover:bg-teal-600 data-[state=on]:bg-teal-500 data-[state=on]:text-white"
                >
                  Day
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="week"
                  aria-label="Toggle week"
                  className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 data-[state=on]:bg-gray-200"
                >
                  Week
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="month"
                  aria-label="Toggle month"
                  className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 data-[state=on]:bg-gray-200"
                >
                  Month
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Card className="bg-[#00998E]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-white w-[80px]">Total Businesses</CardTitle>
                  <Building className="h-10 w-10 text-white" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-white">245</div>
                  <p className="text-sm text-white font-bold">+2 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#F4C321]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-white w-[80px]">Total Reviews</CardTitle>
                  <Star className="h-10 w-10 text-white" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-white">1,249</div>
                  <p className="text-sm text-white font-bold">+21 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#C981F2]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-white w-[80px]">Total Photos</CardTitle>
                  <ImageIcon className="h-10 w-10 text-white" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-white">120</div>
                  <p className="text-sm text-white font-bold">+12 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#3D77E0]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-white w-[80px]">Business Claims</CardTitle>
                  <FileText className="h-10 w-10 text-white" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-white">13</div>
                  <p className="text-sm text-white font-bold">+2 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FA8636]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-white w-[80px]">Total Users</CardTitle>
                  <Users className="h-10 w-10 text-white" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-white">13</div>
                  <p className="text-sm text-white font-bold">+2 new</p>
                </CardContent>
              </Card>
            </div>

            {/* Submission Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Card className="bg-[#00998E1F]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-[#00998E] w-[80px]">Business Submissions</CardTitle>
                  <Building className="h-10 w-10 text-[#00998E]" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-[#00998E]">8</div>
                  <p className="text-sm text-[#00998E] font-bold">+2 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FFC5071F]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-[#F4C321] w-[80px]">Review Submissions</CardTitle>
                  <Star className="h-10 w-10 text-[#F4C321]" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-[#F4C321] ">24</div>
                  <p className="text-sm text-[#F4C321]  font-bold">+4 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#C981F21F]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-[#C981F2] w-[80px]">Photo Submissions</CardTitle>
                  <ImageIcon className="h-10 w-10 text-[#C981F2]" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-[#C981F2]">13</div>
                  <p className="text-sm text-[#C981F2] font-bold">+6 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#3D77E01F]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-[#3D77E0] w-[80px]">Business Claim Requests</CardTitle>
                  <ClipboardList className="h-10 w-10 text-[#3D77E0]" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-[#3D77E0]">4</div>
                  <p className="text-sm text-[#3D77E0] font-bold">+1 new</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FA86361F]">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium text-[#FA8636] w-[80px]">Profiles Under Review</CardTitle>
                  <User className="h-10 w-10 text-[#FA8636]" />
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="text-[36px] font-bold text-[#FA8636]">24</div>
                  <p className="text-sm text-[#FA8636] font-bold">+5 new</p>
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
                      <a href="#" className="font-medium text-teal-600 hover:underline">
                        GuitarFix
                      </a>
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">
                      Martha added 3 new photos for{" "}
                      <a href="#" className="font-medium text-purple-600 hover:underline">
                        DrumPoint
                      </a>
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">
                      Robin Submitted a new review for{" "}
                      <a href="#" className="font-medium text-yellow-600 hover:underline">
                        Harmonics Academy
                      </a>
                    </p>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm">
                      Review flagged for{" "}
                      <a href="#" className="font-medium text-yellow-600 hover:underline">
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
                      <a href="#" className="font-medium text-purple-600 hover:underline">
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
                      <a href="#" className="font-medium text-yellow-600 hover:underline">
                        GuitarPro
                      </a>
                      : &ldquo;Owner was rude&ldquo;
                    </p>
                    <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold">
                      Remove
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#F7F8F8] text-[#485150] font-semibold">
                      Ignore
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm flex-1">
                      New business submission:{" "}
                      <a href="#" className="font-medium text-teal-600 hover:underline">
                        TuneMasters
                      </a>
                    </p>
                     <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold">
                      Reject
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#00998E1F] text-[#00998E] font-semibold">
                      Approve
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm flex-1">
                      Claim request for{" "}
                      <a href="#" className="font-medium text-blue-600 hover:underline">
                        PianoCare
                      </a>{" "}
                      San Diego by Ellie
                    </p>
                     <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold">
                      Reject
                    </Button>
                   <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#00998E1F] text-[#00998E] font-semibold">
                      Approve
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm flex-1">
                      Photo uploaded for{" "}
                      <a href="#" className="font-medium text-purple-600 hover:underline">
                        Sitar House
                      </a>
                    </p>
                     <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold">
                      Reject
                    </Button>
                      <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#00998E1F] text-[#00998E] font-semibold">
                      Approve
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm flex-1">
                      <a href="#" className="font-medium text-orange-600 hover:underline">
                        Elijah James
                      </a>{" "}
                      reported for guideline violation
                    </p>
                      <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold">
                      Suspend
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 w-[64px] bg-[#F7F8F8] text-[#485150] font-semibold">
                      Ignore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}