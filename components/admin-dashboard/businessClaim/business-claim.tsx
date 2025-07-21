"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { getAllBusinessClaims, updateBusinessClaimStatus } from "@/lib/api"
import { toast } from "sonner"

interface User {
    _id: string
    name: string
    email: string
}

interface BusinessClaim {
    _id: string
    business: {
        _id: string
        name: string
        address: string
    }
    user: User
    documents: string[]
    status: "pending" | "approved" | "rejected"
    isVerified: boolean
    createdAt: string
}

interface ApiResponse {
    success: boolean
    code: number
    message: string
    data: BusinessClaim[]
}

export default function ManageBusinessClaims() {
    const [claimType, setClaimType] = useState<string>("all")
    const [timeRange, setTimeRange] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("latest")

    const queryClient = useQueryClient()

    // Fetch business claims with filters
    const {
        data: response,
        isLoading,
        error,
    } = useQuery<ApiResponse>({
        queryKey: ["businessClaims", claimType, timeRange, sortBy],
        queryFn: () =>
            getAllBusinessClaims({
                claimType: claimType === "all" ? undefined : claimType,
                time: timeRange === "all" ? undefined : timeRange,
                sortBy: sortBy === "latest" ? undefined : sortBy,
            }),
    })

    // Update claim status mutation
    const updateStatusMutation = useMutation({
        mutationFn: async ({ claimId, status }: { claimId: string; status: string }) => updateBusinessClaimStatus(claimId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["businessClaims"] })
            toast.success("Status updated successfully")
        },
        onError: () => {
            toast.error("Failed to update status")
        },
    })

    const handleStatusUpdate = (claimId: string, status: string) => {
        updateStatusMutation.mutate({ claimId, status })
    }

    const handleViewDocuments = (documents: string[]) => {
        if (!documents) {
            toast.info("No documents available")
            return
        }
        // Open documents in new tabs
        documents.forEach((doc) => {
            window.open(doc, "_blank")
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 py-2 px-5 rounded-md">
                        Under Review
                    </Badge>
                )
            case "approved":
                return (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 py-2 px-5 rounded-md">
                        Approved
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 py-2 px-5 rounded-md">
                        Rejected
                    </Badge>
                )
            default:
                return <Badge variant="secondary">Unknown</Badge>
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    const claims = response?.data || []

    if (isLoading) {
        return (
            <div className="">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="text-center py-12">
                    <p className="text-red-600">Error : {error.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="lg:space-y-10 space-y-5">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Business Claims</h1>
                <p className="text-gray-600 text-sm md:text-base">
                    Monitor platform activity, manage submissions, and keep your community running smoothly.
                </p>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Claim Type</label>
                    <Select value={claimType} onValueChange={setClaimType}>
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                            <SelectValue placeholder="Latest" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="latest">Latest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="A-Z">Name</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Time Range</label>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger>
                            <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="last-7">Last 7 days</SelectItem>
                            <SelectItem value="last-30">Last 30 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Claims List */}
            <div className="space-y-5">
                {claims.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No business claims found.</p>
                    </div>
                ) : (
                    claims.map((claim) => (
                        <Card key={claim._id} className="p-4 md:p-6 border-none shadow-[0px_2px_12px_0px_#003D3914]">
                            <CardContent className="p-0">
                                <div className="space-y-7">

                                    <div className="space-y-5">
                                        {/* Top section */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-2">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">Claim #{claim._id?.slice(-8)}</p>
                                                <p className="text-sm text-gray-600">{formatDate(claim.createdAt)}</p>
                                            </div>
                                            <div className="sm:text-right">{getStatusBadge(claim.status)}</div>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="space-y-3 w-1/2 border-r-2 border-[#E7E9E9]">
                                                <div className="space-y-1">
                                                    <p className="text-base font-medium text-gray-700">Business</p>
                                                    <p className="text-lg font-medium text-gray-900">{claim.business.name}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-base font-medium text-gray-700">Location</p>
                                                    <p className="text-lg font-medium text-gray-900">{claim.business.address}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="space-y-1">
                                                    <p className="text-base font-medium text-gray-700">Claimed By</p>
                                                    <p className="text-lg font-medium text-gray-900">{claim.user?.name}</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-base font-medium text-gray-700">Email</p>
                                                    <p className="text-lg font-medium text-gray-900">{claim.user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewDocuments(claim?.documents)}
                                            className={`bg-[#F7F8F8] h-12 border-none ${claim.status === "approved" || claim.status === "rejected" ? "col-span-3" : "col-span-1"}`}
                                        >
                                            <FileText className="w-4 h-4 mr-2" />
                                            View Documents
                                        </Button>

                                        {claim.status === "pending" && (
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(claim._id, "rejected")}
                                                    className="flex-1 h-12 text-red-600 border-red-200 hover:bg-red-50"
                                                    disabled={updateStatusMutation.isPending}
                                                >
                                                    {updateStatusMutation.isPending ? "Updating..." : "Reject"}
                                                </Button>
                                            </div>
                                        )}

                                        {claim.status === "pending" && (
                                            <Button
                                                size="sm"
                                                onClick={() => handleStatusUpdate(claim._id, "approved")}
                                                className="bg-teal-600 hover:bg-teal-700 h-12"
                                                disabled={updateStatusMutation.isPending}
                                            >
                                                {updateStatusMutation.isPending ? "Updating..." : "Approve"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
