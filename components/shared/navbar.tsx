"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, ChevronDown, Menu, Bell, Inbox, Bookmark, User2Icon, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Navbar = () => {
  const { data: session, status: sessionStatus } = useSession()
  const { data: userData } = useQuery({
    queryKey: ["userData", session?.user?.email],
    queryFn: getUserProfile,
    select: (data) => data.data,
    enabled: sessionStatus === "authenticated",
  })

  return (
    <nav className="p-4 shadow-md sticky top-0 z-50 bg-white">
      <div className="container flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={150} height={40} />
        </Link>

        {/* Search Bar (hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto items-center bg-[#F7F8F8] rounded-xl shadow-inner overflow-hidden">
          <Input
            type="text"
            placeholder="Guitar, strings, restringing..."
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
          />
          <Button className="bg-teal-500 hover:bg-[#00998E] text-white rounded-xl py-4 px-6 h-full">
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Sign Up Button and Menu (visible on mobile only) */}
        <div className="md:hidden flex items-center gap-3">
          {sessionStatus === "unauthenticated" && (
            <Link href="/auth/signup">
              <Button
                variant="outline"
                className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white rounded-lg px-4 py-2 bg-transparent"
              >
                Sign Up
              </Button>
            </Link>
          )}

          {sessionStatus === "authenticated" && (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-10 w-10 bg-[#F7F8F8] rounded-full">
                <Link
                  href={`${session?.user?.userType === "user" ? "/customer-dashboard/settings/notifications" : session?.user?.userType === "admin" ? "/admin-dashboard/settings" : "/business-dashboard/settings/notifications"}`}
                >
                  <Bell className="h-5 w-5" />
                </Link>
              </div>
            </div>
          )}

          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-gray-700" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white text-gray-900 border-gray-200 w-80">
              <div className="flex flex-col space-y-6 p-4">
                {/* Mobile Search Bar */}
                <div className="flex items-center bg-[#F7F8F8] rounded-xl shadow-inner overflow-hidden">
                  <Input
                    type="text"
                    placeholder="Guitar, strings, restringing..."
                    className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
                  />
                  <Button className="bg-teal-500 hover:bg-[#00998E] text-white rounded-xl py-4 px-6 h-full">
                    <Search className="h-6 w-6" />
                  </Button>
                </div>

                {/* User Profile Section (if authenticated) */}
                {sessionStatus === "authenticated" && (
                  <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={userData?.imageLink || "/placeholder.svg"} />
                        <AvatarFallback className="uppercase">
                          {(() => {
                            const name = userData?.name?.trim()
                            if (!name) return ""
                            const parts = name.split(" ")
                            if (parts.length === 1) {
                              return parts[0][0]
                            } else {
                              return `${parts[0][0]}${parts[1][0]}`
                            }
                          })()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{userData?.name}</span>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                        <Bookmark className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Dropdowns */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full justify-between text-gray-900 hover:text-teal-400 flex items-center p-2 rounded-lg hover:bg-gray-50">
                    For Customer <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-gray-900 border-gray-200 w-full">
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">Write a Review</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">Add a Business</DropdownMenuItem>
                    {sessionStatus === "unauthenticated" && (
                      <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                        <Link href="/auth/login">Log In</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full justify-between text-gray-900 hover:text-teal-400 flex items-center p-2 rounded-lg hover:bg-gray-50">
                    For Business <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-gray-900 border-gray-200 w-full">
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">Add My Business</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">Claim My Business</DropdownMenuItem>
                    {sessionStatus === "unauthenticated" && (
                      <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                        <Link href="/auth/login">Log In</Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Auth Buttons or User Actions */}
                {sessionStatus === "unauthenticated" ? (
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                    <Link href="/auth/signup">
                      <Button
                        variant="outline"
                        className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white w-full rounded-lg px-4 py-2 bg-transparent"
                      >
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button
                        variant="outline"
                        className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white w-full rounded-lg px-4 py-2 bg-transparent"
                      >
                        Log In
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                    <Link
                      href="/customer-dashboard/profile"
                      className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-50"
                    >
                      <User2Icon className="h-6 w-6" />
                      View Profile
                    </Link>
                    <Link
                      href="/customer-dashboard/settings"
                      className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-50"
                    >
                      <Settings className="h-6 w-6" />
                      Settings
                    </Link>
                    <div
                      className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-6 w-6" />
                      Log Out
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4 ml-4">
          {sessionStatus === "unauthenticated" && (
            <div className="flex gap-5 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-teal-400 flex gap-1 items-center outline-none">
                  For Customer <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-700 border-none">
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Write a Review</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Add a Business</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Link href="/auth/login">Log In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-teal-400 flex gap-1 items-center outline-none">
                  For Business <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-700 border-none">
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Add My Business</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Claim My Business</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Link href="/auth/login">Log In</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {sessionStatus === "unauthenticated" ? (
            <div className="flex gap-3">
              <Link href="/auth/signup">
                <Button
                  variant="outline"
                  className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white rounded-lg px-6 py-2 bg-transparent"
                >
                  Signup
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white rounded-lg px-6 py-2 bg-transparent"
                >
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                <Link
                  href={`${session?.user?.userType === "user" ? "/customer-dashboard/settings/notifications" : session?.user?.userType === "admin" ? "/admin-dashboard/settings" : "/business-dashboard/settings/notifications"}`}
                >
                  <Bell className="h-6 w-6" />
                </Link>
              </div>
              <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                <Inbox className="h-6 w-6" />
              </div>
              <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                <Bookmark className="h-6 w-6" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-teal-400 flex gap-1 items-center outline-none">
                  <Avatar>
                    <AvatarImage src={userData?.imageLink || "/placeholder.svg"} />
                    <AvatarFallback className="uppercase">
                      {(() => {
                        const name = userData?.name?.trim()
                        if (!name) return ""
                        const parts = name.split(" ")
                        if (parts.length === 1) {
                          return parts[0][0]
                        } else {
                          return `${parts[0][0]}${parts[1][0]}`
                        }
                      })()}
                    </AvatarFallback>
                  </Avatar>
                  {userData?.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-700 border-none">
                  <DropdownMenuItem className="hover:bg-[#F7F8F8] cursor-pointer">
                    <Link href="/customer-dashboard/profile" className="flex gap-2 items-center">
                      <User2Icon className="h-6 w-6" />
                      {"View Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Link href="/customer-dashboard/settings" className="flex gap-2 items-center">
                      <Settings className="h-6 w-6" />
                      {"Settings"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <div className="flex gap-2 items-center" onClick={() => signOut()}>
                      <LogOut className="h-6 w-6" />
                      {"Log Out"}
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar