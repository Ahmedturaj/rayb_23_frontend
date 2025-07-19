"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function NotificationSettings() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive notifications on your email</p>
          </div>
          <Switch defaultChecked className="data-[state=checked]:bg-[#20c997]" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Mobile Notifications</h3>
            <p className="text-sm text-muted-foreground">Receive notifications on your phone number</p>
          </div>
          <Switch defaultChecked className="data-[state=checked]:bg-[#20c997]" />
        </div>
      </CardContent>
    </Card>
  )
}
