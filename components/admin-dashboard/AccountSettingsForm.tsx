"use client"
import { User, Mail, Phone } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function AccountSettingsForm() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Account Info</CardTitle>
        <CardDescription>Edit your account information here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="fullName" placeholder="John Taylor" className="pl-9" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="johntaylor@gmail.com" className="pl-9" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input id="phoneNumber" type="tel" placeholder="Enter your phone number" className="pl-9" />
          </div>
        </div>
        <Button className="bg-[#20c997] hover:bg-[#1a9f7a] text-white">Save Changes</Button>
      </CardContent>
    </Card>
  )
}
