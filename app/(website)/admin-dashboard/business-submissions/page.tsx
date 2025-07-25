// "use client"

// import Image from "next/image"
// import { MapPin, Star } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { useQuery, useMutation, QueryClient } from "@tanstack/react-query"
// import { useSession } from "next-auth/react"

// // Define the interface for the API response data
// interface BusinessApiData {
//   _id: string
//   businessInfo: {
//     name: string
//     image: string[]
//     address: string
//     phone: string
//     email: string
//     website: string
//     description: string
//   }
//   user: {
//     _id: string
//     name: string
//     email: string
//   }
//   status: "approved" | "pending" | "rejected"
//   createdAt: string
// }

// interface ApiResponse {
//   success: boolean
//   message: string
//   data: BusinessApiData[]
//   pagination: {
//     page: number
//     limit: number
//     totalPages: number
//     totalCount: number
//   }
// }

// // Create a client for TanStack Query
// const queryClient = new QueryClient()

// // Function to fetch data from the API
// async function fetchBusinesses(token?: string): Promise<ApiResponse> {
//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//   }
//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`
//   }
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/all`, {
//     headers,
//   })
//   if (!res.ok) {
//     throw new Error("Failed to fetch businesses")
//   }
//   return res.json()
// }

// // Function to toggle business status
// async function toggleBusinessStatus({ id, status, token }: { id: string; status: "approved" | "rejected"; token?: string }): Promise<void> {
//   const headers: HeadersInit = {
//     "Content-Type": "application/json",
//   }
//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`
//   }
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/toggle/${id}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify({ status }),
//   })
//   if (!res.ok) {
//     throw new Error(`Failed to ${status} business`)
//   }
//   return res.json()
// }

// export default function BusinessSubmissionsComponent() {
//   const { data: session } = useSession()
//   const token = session?.user?.accessToken

//   const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
//     queryKey: ["businesses", token],
//     queryFn: () => fetchBusinesses(token),
//   })

//   const mutation = useMutation({
//     mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) => toggleBusinessStatus({ id, status, token }),
//     onMutate: async ({ id, status }) => {
//       // Cancel any outgoing refetches
//       await queryClient.cancelQueries({ queryKey: ["businesses", token] })

//       // Snapshot the previous value
//       const previousBusinesses = queryClient.getQueryData<ApiResponse>(["businesses", token])

//       // Optimistically update the cache
//       queryClient.setQueryData(["businesses", token], (old: ApiResponse | undefined) => {
//         if (!old) return old
//         return {
//           ...old,
//           data: old.data.map((submission) =>
//             submission._id === id ? { ...submission, status } : submission
//           ),
//         }
//       })

//       // Return context with the previous data for rollback on error
//       return { previousBusinesses }
//     },
//     onError: (err, variables, context) => {
//       // Roll back to previous data on error
//       queryClient.setQueryData(["businesses", token], context?.previousBusinesses)
//       console.error("Error updating business status:", err.message)
//     },
//     onSettled: () => {
//       // Invalidate to ensure data consistency after mutation
//       queryClient.invalidateQueries({ queryKey: ["businesses", token] })
//     },
//   })

//   if (isLoading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading submissions...</div>
//   }

//   if (isError) {
//     return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error?.message}</div>
//   }

//   const submissions = data?.data || []

//   return (
//     <div className="min-h-screen ">
//       <div className="w-full mx-auto bg-white p-6 md:p-8">
//         <div className="mb-6 md:mb-8">
//           <h1 className="text-2xl md:text-[28px] font-bold text-[#1D2020]">Manage Business Submissions</h1>
//           <p className="text-base text-[#485150] mt-3">
//             Monitor platform activity, manage submissions, and keep your community running smoothly.
//           </p>
//         </div>
//         <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
//           <div className="w-full sm:w-[30%] ">
//             <label htmlFor="business-type" className="block text-sm font-medium text-gray-700 sr-only">
//               Business Type
//             </label>
//             <Select defaultValue="all">
//               <SelectTrigger id="business-type" className="w-full ">
//                 <SelectValue placeholder="Business Type" />
//               </SelectTrigger>
//               <SelectContent className="bg-[#F7F8F8]">
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="music">Music</SelectItem>
//                 <SelectItem value="food">Food</SelectItem>
//                 <SelectItem value="retail">Retail</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="w-full sm:w-[30%]">
//             <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 sr-only">
//               Sort By
//             </label>
//             <Select defaultValue="latest">
//               <SelectTrigger id="sort-by" className="w-full ">
//                 <SelectValue placeholder="Sort By" />
//               </SelectTrigger>
//               <SelectContent className="bg-[#F7F8F8]">
//                 <SelectItem value="latest">Latest</SelectItem>
//                 <SelectItem value="oldest">Oldest</SelectItem>
//                 <SelectItem value="name">Name</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="w-full sm:w-[30%]">
//             <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 sr-only">
//               Time Range
//             </label>
//             <Select defaultValue="all">
//               <SelectTrigger id="time-range" className="w-full ">
//                 <SelectValue placeholder="Time Range" />
//               </SelectTrigger>
//               <SelectContent className="bg-[#F7F8F8]">
//                 <SelectItem value="all">All</SelectItem>
//                 <SelectItem value="last-week">Last Week</SelectItem>
//                 <SelectItem value="last-month">Last Month</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="grid gap-4">
//           {submissions.map((submission) => (
//             <Card
//               key={submission._id}
//               className="p-4 flex flex-col border-none sm:flex-row gap-4 relative shadow-[#003D3914]"
//             >
//               <Image
//                 src={submission.businessInfo.image[0] || "/placeholder.svg?height=200&width=200&query=business image"}
//                 alt={submission.businessInfo.name || "Business image"}
//                 width={200}
//                 height={200}
//                 className="rounded-[12px] w-[200px] h-[200px] object-cover aspect-square shrink-0"
//               />
//               <div className="flex-1 grid gap-2">
//                 <h2 className="text-[24px] font-bold text-[#1D2020]">{submission.businessInfo.name}</h2>
//                 <div className="flex items-center gap-2 text-xl text-[#485150]">
//                   <Star className="w-4 h-4 text-gray-400" />
//                   <span>Not Rated</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xl text-[#485150]">
//                   <MapPin className="w-4 h-4" />
//                   <span>{submission.businessInfo.address}</span>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end gap-2 sm:ml-auto mt-4 sm:mt-0">
//                 {submission.status === "pending" && (
//                   <>
//                     <Badge
//                       variant="outline"
//                       className="bg-under-review-bg text-under-review-text px-3 py-2 rounded-full text-sm font-medium"
//                     >
//                       Under Review
//                     </Badge>
//                     <div className="flex gap-2 mt-auto">
//                       <Button
//                         variant="outline"
//                         className="border border-reject-button-text text-reject-button-text bg-transparent"
//                         onClick={() => mutation.mutate({ id: submission._id, status: "rejected" })}
//                         disabled={mutation.isPending}
//                       >
//                         Reject
//                       </Button>
//                       <Button
//                         className="bg-[#00998E] text-white text-base"
//                         onClick={() => mutation.mutate({ id: submission._id, status: "approved" })}
//                         disabled={mutation.isPending}
//                       >
//                         Approve
//                       </Button>
//                     </div>
//                   </>
//                 )}
//                 {submission.status === "approved" && (
//                   <Badge
//                     variant="outline"
//                     className="bg-[#00998E1F] text-[#00998E] px-3 h-[31px] rounded-full text-xs font-medium"
//                   >
//                     Approved
//                   </Badge>
//                 )}
//                 {submission.status === "rejected" && (
//                   <Badge
//                     variant="outline"
//                     className="bg-rejected-badge-bg text-rejected-badge-text px-3 py-1 rounded-full text-xs font-medium"
//                   >
//                     Rejected
//                   </Badge>
//                 )}
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import Image from "next/image"
import { MapPin, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useState } from "react"

// Define the interface for the API response data
interface BusinessApiData {
  _id: string
  businessInfo: {
    name: string
    image: string[]
    address: string
    phone: string
    email: string
    website: string
    description: string
  }
  user: {
    _id: string
    name: string
    email: string
  }
  status: "approved" | "pending" | "rejected"
  createdAt: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: BusinessApiData[]
  pagination: {
    page: number
    limit: number
    totalPages: number
    totalCount: number
  }
}

// Create a client for TanStack Query
const queryClient = new QueryClient()

// Function to fetch data from the API with dynamic parameters
async function fetchBusinesses({
  token,
  businessType,
  sortBy,
  timeRange,
}: {
  token?: string
  businessType?: string
  sortBy?: string
  timeRange?: string
}): Promise<ApiResponse> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  // Build query parameters
  const queryParams = new URLSearchParams()
  if (businessType && businessType !== "all") {
    queryParams.append("businessType", businessType)
  }
  if (sortBy && sortBy !== "latest") {
    queryParams.append("sortBy", sortBy)
  }
  if (timeRange && timeRange !== "all") {
    queryParams.append("timeRange", timeRange)
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/business/all?${queryParams.toString()}`

  const res = await fetch(url, {
    headers,
  })
  if (!res.ok) {
    throw new Error("Failed to fetch businesses")
  }
  return res.json()
}

// Function to toggle business status
async function toggleBusinessStatus({ id, status, token }: { id: string; status: "approved" | "rejected"; token?: string }): Promise<void> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/business/toggle/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ status }),
  })
  if (!res.ok) {
    throw new Error(`Failed to ${status} business`)
  }
  return res.json()
}

export default function BusinessSubmissionsComponent() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  // State for dropdown selections
  const [businessType, setBusinessType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("latest")
  const [timeRange, setTimeRange] = useState<string>("all")

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ["businesses", token, businessType, sortBy, timeRange],
    queryFn: () => fetchBusinesses({ token, businessType, sortBy, timeRange }),
  })

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) => toggleBusinessStatus({ id, status, token }),
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["businesses", token, businessType, sortBy, timeRange] })

      // Snapshot the previous value
      const previousBusinesses = queryClient.getQueryData<ApiResponse>(["businesses", token, businessType, sortBy, timeRange])

      // Optimistically update the cache
      queryClient.setQueryData(["businesses", token, businessType, sortBy, timeRange], (old: ApiResponse | undefined) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.map((submission) =>
            submission._id === id ? { ...submission, status } : submission
          ),
        }
      })

      // Return context with the previous data for rollback on error
      return { previousBusinesses }
    },
    onError: (err, variables, context) => {
      // Roll back to previous data on error
      queryClient.setQueryData(["businesses", token, businessType, sortBy, timeRange], context?.previousBusinesses)
      console.error("Error updating business status:", err.message)
    },
    onSettled: () => {
      // Invalidate to ensure data consistency after mutation
      queryClient.invalidateQueries({ queryKey: ["businesses", token, businessType, sortBy, timeRange] })
    },
  })

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading submissions...</div>
  }

  if (isError) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error?.message}</div>
  }

  const submissions = data?.data || []

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto bg-white p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-[28px] font-bold text-[#1D2020]">Manage Business Submissions</h1>
          <p className="text-base text-[#485150] mt-3">
            Monitor platform activity, manage submissions, and keep your community running smoothly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
          <div className="w-full sm:w-[30%]">
            <label htmlFor="business-type" className="block text-sm font-medium text-gray-700 sr-only">
              Business Type
            </label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="business-type" className="w-full">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#F7F8F8]">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-[30%]">
            <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 sr-only">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by" className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-[#F7F8F8]">
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="name">A-Z</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-[30%]">
            <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 sr-only">
              Time Range
            </label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range" className="w-full">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#F7F8F8]">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="last-7">Last 7 Days</SelectItem>
                <SelectItem value="last-30">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4">
          {submissions.map((submission) => (
            <Card
              key={submission._id}
              className="p-4 flex flex-col border-none sm:flex-row gap-4 relative shadow-[#003D3914]"
            >
              <Image
                src={submission.businessInfo.image[0] || "/placeholder.svg?height=200&width=200&query=business image"}
                alt={submission.businessInfo.name || "Business image"}
                width={200}
                height={200}
                className="rounded-[12px] w-[200px] h-[200px] object-cover aspect-square shrink-0"
              />
              <div className="flex-1 grid gap-2">
                <h2 className="text-[24px] font-bold text-[#1D2020]">{submission.businessInfo.name}</h2>
                <div className="flex items-center gap-2 text-xl text-[#485150]">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span>Not Rated</span>
                </div>
                <div className="flex items-center gap-2 text-xl text-[#485150]">
                  <MapPin className="w-4 h-4" />
                  <span>{submission.businessInfo.address}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 sm:ml-auto mt-4 sm:mt-0">
                {submission.status === "pending" && (
                  <>
                    <Badge
                      variant="outline"
                      className="bg-under-review-bg text-under-review-text px-3 py-2 rounded-full text-sm font-medium"
                    >
                      Under Review
                    </Badge>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        className="border border-reject-button-text text-reject-button-text bg-transparent"
                        onClick={() => mutation.mutate({ id: submission._id, status: "rejected" })}
                        disabled={mutation.isPending}
                      >
                        Reject
                      </Button>
                      <Button
                        className="bg-[#00998E] text-white text-base"
                        onClick={() => mutation.mutate({ id: submission._id, status: "approved" })}
                        disabled={mutation.isPending}
                      >
                        Approve
                      </Button>
                    </div>
                  </>
                )}
                {submission.status === "approved" && (
                  <Badge
                    variant="outline"
                    className="bg-approved-badge-bg text-approved-badge-text px-3 h-[31px] rounded-full text-xs font-medium"
                  >
                    Approved
                  </Badge>
                )}
                {submission.status === "rejected" && (
                  <Badge
                    variant="outline"
                    className="bg-rejected-badge-bg text-rejected-badge-text px-3 py-1 rounded-full text-xs font-medium"
                  >
                    Rejected
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