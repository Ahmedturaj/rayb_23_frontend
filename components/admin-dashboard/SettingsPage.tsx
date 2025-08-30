"use client"

import * as React from "react"
import { User, Shield, Bell } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { AccountSettingsForm } from "@/components/admin-dashboard/AccountSettingsForm"
import { SecuritySettings } from "@/components/admin-dashboard/SecuritySettings"


export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("account")

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountSettingsForm/>
      case "security":
        return <SecuritySettings />
      default:
        return <AccountSettingsForm />
    }
  }

  return (
    <>
      <Sidebar className="hidden md:flex h-[400px] bg-transparent " collapsible="none">
        <SidebarHeader className="p-4"></SidebarHeader>
        <SidebarContent className="">
          <SidebarGroup>
            <SidebarGroupContent >
              <SidebarMenu className="space-y-[40px]"> {/* Changed from space-y-10 to space-y-[40px] */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab("account")}
                    isActive={activeTab === "account"}
                    className={cn("justify-start gap-3 py-7", activeTab === "account" && "bg-accent text-accent-foreground")}
                  >
                    <User className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>Account settings</span>
                      <span className="text-xs text-muted-foreground">Edit your account info here</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab("security")}
                    isActive={activeTab === "security"}
                    className={cn(
                      "justify-start gap-3 py-7",
                      activeTab === "security" && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Shield className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>Security</span>
                      <span className="text-xs text-muted-foreground">Manage your security settings</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab("notifications")}
                    isActive={activeTab === "notifications"}
                    className={cn(
                      "justify-start gap-3 py-7",
                      activeTab === "notifications" && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Bell className="h-5 w-5" />
                    <div className="flex flex-col items-start">
                      <span>Notifications</span>
                      <span className="text-xs text-muted-foreground">Manage your notification settings</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main content area - adjusted padding for static sidebar */}
      <main className="w-full pt-4 md:p">{renderContent()}</main>
    </>
  )
}