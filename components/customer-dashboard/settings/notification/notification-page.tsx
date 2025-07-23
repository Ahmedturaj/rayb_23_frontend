import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React from 'react'

export default function NotificationsPage() {
    return (
        <Card className='p-0'>
            <CardHeader>
                <CardTitle className="text-lg font-semibold border-b pb-4">Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="email-notifications" className="text-base font-semibold">
                                Email Notifications
                            </Label>
                            <p className="text-sm text-gray-500">Receive notifications on your email</p>
                        </div>
                        <Switch id="email-notifications" />
                    </div>

                    {/* Mobile Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="mobile-notifications" className="text-base font-semibold">
                                Mobile Notifications
                            </Label>
                            <p className="text-sm text-gray-500">Receive notifications on your phone number</p>
                        </div>
                        <Switch id="mobile-notifications" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
