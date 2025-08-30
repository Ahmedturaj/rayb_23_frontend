

"use client"

import { User, Mail, Phone } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"

interface UserProfile {
  businessId: string | null
  _id: string
  name: string
  email: string
  bio: string
  imageLink: string
  userType: string
  address: string | null
  phone: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: UserProfile
}

export function AccountSettingsForm() {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const fetchUserProfile = async (): Promise<ApiResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user profile')
    }

    return response.json()
  }

  const { data, isLoading, isError, error } = useQuery<ApiResponse, Error>({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: !!token
  })

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-[#1D2020] font-semibold">Account Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <p>Loading profile data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-[#1D2020] font-semibold">Account Info</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <p className="text-red-500">Error: {error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const userProfile = data?.data

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-[#1D2020] font-semibold">Account Info</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label className="text-base text-[#485150] font-medium" htmlFor="fullName">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              id="fullName" 
              value={userProfile?.name || ''} 
              readOnly 
              className="pl-9 h-[49px] bg-gray-100" 
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label className="text-base text-[#485150] font-medium" htmlFor="email">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              id="email" 
              type="email" 
              value={userProfile?.email || ''} 
              readOnly 
              className="pl-9 h-[49px] bg-gray-100" 
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label className="text-base text-[#485150] font-medium" htmlFor="phoneNumber">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              id="phoneNumber" 
              type="tel" 
              value={userProfile?.phone || ''} 
              readOnly 
              className="pl-9 h-[49px] bg-gray-100" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}