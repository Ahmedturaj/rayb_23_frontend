"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Define types for the dashboard API response data
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

// Define types for the notification API response
interface NotificationMetadata {
  businessId?: string;
}

interface Notification {
  _id: string;
  senderId: string;
  receiverId: string;
  userType: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  isIgnored: boolean;
  metadata: NotificationMetadata;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NotificationResponse {
  status: boolean;
  message: string;
  notify: Notification[];
}

// Function to fetch dashboard data
const fetchDashboardData = async (range: string, token?: string): Promise<ApiResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business/dashboard?range=${range}`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
  }
  return response.json();
};

// Function to fetch all notifications
const fetchAllNotifications = async (token?: string): Promise<NotificationResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notification/all`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch notifications: ${response.statusText}`);
  }
  return response.json();
};

// Function to fetch notification data
const fetchNotifications = async (token?: string): Promise<NotificationResponse> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notification`,
    { headers }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch notifications: ${response.statusText}`);
  }
  return response.json();
};

// Function to ignore notification
const ignoreNotification = async ({ notificationId, token }: { notificationId: string; token?: string }) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notification/ignore/${notificationId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ isIgnored: true }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to ignore notification: ${response.statusText}`);
  }
  return response.json();
};

// Function to delete notification
const deleteNotification = async ({ notificationId, token }: { notificationId: string; token?: string }) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notification/${notificationId}`,
    {
      method: "DELETE",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to delete notification: ${response.statusText}`);
  }
  return response.json();
};

// Skeleton component for a single card
const SkeletonCard = ({ bgColor }: { bgColor: string; textColor?: string }) => (
  <Card className={bgColor}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <div className="h-4 w-[80px] bg-gray-300 animate-pulse rounded" />
      <div className="h-10 w-10 bg-gray-300 animate-pulse rounded" />
    </CardHeader>
    <CardContent className="flex items-end gap-2">
      <div className="h-9 w-16 bg-gray-300 animate-pulse rounded" />
      <div className="h-4 w-20 bg-gray-300 animate-pulse rounded" />
    </CardContent>
  </Card>
);

// Skeleton component for recent activity or moderation highlights
const SkeletonActivityCard = () => (
  <Card>
    <CardHeader>
      <div className="h-6 w-32 bg-gray-300 animate-pulse rounded" />
    </CardHeader>
    <CardContent className="grid gap-4">
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
          </div>
          {index < 4 && <Separator />}
        </div>
      ))}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState<"day" | "week" | "month">(
    "day"
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["dashboardData", selectedRange],
    queryFn: () => fetchDashboardData(selectedRange, token),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: notificationData,
    isLoading: isNotificationsLoading,
    isError: isNotificationsError,
    error: notificationsError,
  } = useQuery<NotificationResponse, Error>({
    queryKey: ["notifications", token],
    queryFn: () => fetchNotifications(token),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const {
    data: allNotificationsData,
    isLoading: isAllNotificationsLoading,
    isError: isAllNotificationsError,
    error: allNotificationsError,
  } = useQuery<NotificationResponse, Error>({
    queryKey: ["allNotifications", token],
    queryFn: () => fetchAllNotifications(token),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const ignoreMutation = useMutation({
    mutationFn: ({ notificationId }: { notificationId: string }) =>
      ignoreNotification({ notificationId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", token] });
      queryClient.invalidateQueries({ queryKey: ["allNotifications", token] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ notificationId }: { notificationId: string }) =>
      deleteNotification({ notificationId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", token] });
      queryClient.invalidateQueries({ queryKey: ["allNotifications", token] });
      toast.success("Notification deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete notification: ${error.message}`);
    },
  });

  const dashboardMetrics = data?.data;

  // Map notification types to icons and colors
  const getNotificationIconAndColor = (type: string) => {
    switch (type) {
      case "business_submission":
      case "new_business_submitted":
        return {
          icon: <Building className="h-5 w-5 text-muted-foreground" />,
          linkColor: "text-teal-600",
        };
      case "review_submission":
        return {
          icon: <Star className="h-5 w-5 text-muted-foreground" />,
          linkColor: "text-yellow-600",
        };
      case "photo_submission":
        return {
          icon: <ImageIcon className="h-5 w-5 text-muted-foreground" />,
          linkColor: "text-purple-600",
        };
      case "claim_request":
        return {
          icon: <ClipboardList className="h-5 w-5 text-muted-foreground" />,
          linkColor: "text-blue-600",
        };
      default:
        return {
          icon: <User className="h-5 w-5 text-muted-foreground" />,
          linkColor: "text-orange-600",
        };
    }
  };

  return (
    <div className="flex  w-full flex-col">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
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
                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${selectedRange === range
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
              <>
                {/* Skeleton for Summary Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <SkeletonCard bgColor="bg-[#00998E]" />
                  <SkeletonCard bgColor="bg-[#F4C321]" />
                  <SkeletonCard bgColor="bg-[#C981F2]" />
                  <SkeletonCard bgColor="bg-[#3D77E0]" />
                  <SkeletonCard bgColor="bg-[#FA8636]" />
                </div>

                {/* Skeleton for Submission Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <SkeletonCard bgColor="bg-[#00998E1F]" textColor="text-[#00998E]" />
                  <SkeletonCard bgColor="bg-[#FFC5071F]" textColor="text-[#F4C321]" />
                  <SkeletonCard bgColor="bg-[#C981F21F]" textColor="text-[#C981F2]" />
                  <SkeletonCard bgColor="bg-[#3D77E01F]" textColor="text-[#3D77E0]" />
                  <SkeletonCard bgColor="bg-[#FA86361F]" textColor="text-[#FA8636]" />
                </div>

                {/* Skeleton for Recent Activity and Moderation Highlights */}
                <div className="grid gap-4 lg:grid-cols-2">
                  <SkeletonActivityCard />
                  <SkeletonActivityCard />
                </div>
              </>
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

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5  ">
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
                  {/* Recent Activity Card */}
                  <Card className="flex flex-col h-[400px]">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      <div className="grid gap-4">
                        {isAllNotificationsLoading && (
                          <>
                            {[...Array(5)].map((_, index) => (
                              <div key={index}>
                                <div className="flex items-center gap-3">
                                  <div className="h-5 w-5 bg-gray-300 animate-pulse rounded" />
                                  <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
                                </div>
                                {index < 4 && <Separator />}
                              </div>
                            ))}
                          </>
                        )}
                        {isAllNotificationsError && (
                          <p className="text-center text-lg text-red-500">
                            Error: {allNotificationsError?.message}
                          </p>
                        )}
                        {!isAllNotificationsLoading &&
                          !isAllNotificationsError &&
                          allNotificationsData?.notify?.length === 0 && (
                            <p className="text-center text-lg text-gray-500">
                              No recent activity available
                            </p>
                          )}
                        {!isAllNotificationsLoading &&
                          !isAllNotificationsError &&
                          allNotificationsData?.notify?.map((notification) => {
                            const { icon, linkColor } = getNotificationIconAndColor(notification.type);
                            return (
                              <div key={notification._id} className="border-b border-gray-200 pb-4">
                                <div className="flex items-center gap-3">
                                  {icon}
                                  <p className="text-sm flex-1">
                                    {notification.message}{" "}
                                    {notification?.metadata?.businessId && (
                                      <a
                                        href={`/search-result/${notification.metadata.businessId}`}
                                        className={`font-medium ${linkColor} hover:underline`}
                                      >
                                        View Business
                                      </a>
                                    )}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Moderation Highlights Card */}
                  <Card className="flex flex-col h-[400px]">
                    <CardHeader>
                      <CardTitle>Moderation Highlights</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto">
                      <div className="grid gap-4">
                        {isNotificationsLoading && (
                          <>
                            {[...Array(5)].map((_, index) => (
                              <div key={index}>
                                <div className="flex items-center gap-3">
                                  <div className="h-5 w-5 bg-gray-300 animate-pulse rounded" />
                                  <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded" />
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                        {isNotificationsError && (
                          <p className="text-center text-lg text-red-500">
                            Error: {notificationsError?.message}
                          </p>
                        )}
                        {!isNotificationsLoading && !isNotificationsError && notificationData?.notify?.length === 0 && (
                          <p className="text-center text-lg text-gray-500">
                            No notifications available
                          </p>
                        )}
                        {!isNotificationsLoading && !isNotificationsError && notificationData?.notify?.map((notification) => {
                          const { icon, linkColor } = getNotificationIconAndColor(notification.type);
                          return (
                            <div key={notification._id} className="border-b border-gray-200 pb-4">
                              <div className="flex items-center gap-3">
                                {icon}
                                <p className="text-sm flex-1">
                                  {notification.message}{" "}
                                  {notification.metadata.businessId && (
                                    <a
                                      href={`/search-result/${notification.metadata.businessId}`}
                                      className={`font-medium ${linkColor} hover:underline`}
                                    >
                                      View Business
                                    </a>
                                  )}
                                </p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-[64px] bg-[#E240401F] text-[#E24040] font-semibold"
                                  onClick={() => setDeleteId(notification._id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  Remove
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-[64px] bg-[#F7F8F8] text-[#485150] font-semibold"
                                  onClick={() => ignoreMutation.mutate({ notificationId: notification._id })}
                                  disabled={ignoreMutation.isPending}
                                >
                                  {notification.isIgnored ? "Ignored" : "Ignore"}
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteId) {
                  deleteMutation.mutate({ notificationId: deleteId });
                  setDeleteId(null);
                }
              }}
              disabled={deleteMutation.isPending}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}