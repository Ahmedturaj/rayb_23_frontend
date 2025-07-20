"use client"
import { SettingsPage } from "@/components/admin-dashboard/SettingsPage"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"


export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SettingsPage />
        <SidebarInset className="">{/* Main content area will be rendered by SettingsPage */}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}
