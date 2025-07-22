"use client"
import { SettingsPage } from "@/components/admin-dashboard/SettingsPage"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"


export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex  w-full ">
        <SettingsPage />
        <SidebarInset />
      </div>
    </SidebarProvider>
  )
}
