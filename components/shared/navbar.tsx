"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, ChevronDown, Menu, Bell, Inbox, Bookmark, User2Icon, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const App = () => {


  const { data: session, status: sessionStatus } = useSession();

  const { data: userData } = useQuery({
    queryKey: ['userData', session?.user?.email],
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

        {/* Search Bar (visible on all screens) */}
        <div className="flex-1 max-w-xl mx-auto flex items-center bg-[#F7F8F8] rounded-xl shadow-inner overflow-hidden">
          <Input
            type="text"
            placeholder="Guitar, strings, restringing..."
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
          />
          <Button className="bg-teal-500 hover:bg-[#00998E] text-white rounded-xl py-4 px-6 h-full">
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* Desktop Navigation (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4 ml-4">

          {
            sessionStatus === "unauthenticated" && (
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
            )
          }

          {
            sessionStatus === "unauthenticated" ? (
              <div className="flex gap-3">
                <Link href="/auth/signup">
                  <Button variant="outline" className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white rounded-lg px-6 py-2">
                    Signup
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="hover:bg-[#00998E] border-teal-500 text-[#00998E] hover:text-white rounded-lg px-6 py-2">
                    Login
                  </Button>
                </Link>
              </div>
            )
              :
              (
                <div className="flex gap-3">
                  <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                    <Bell className='h-6 w-6' />
                  </div>
                  <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                    <Inbox className='h-6 w-6' />
                  </div>
                  <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                    <Bookmark className='h-6 w-6' />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:text-teal-400 flex gap-1 items-center outline-none">
                      <Avatar>
                        <AvatarImage src={userData?.imageLink} />
                        <AvatarFallback>{`${userData?.name.split(" ")[0][0]}${userData?.name.split(" ")[1][0]}`}</AvatarFallback>
                      </Avatar>
                      {userData?.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-gray-700 border-none">
                      <DropdownMenuItem className="hover:bg-[#F7F8F8] cursor-pointer">
                        <Link href="/customer-dashboard/profile" className='flex gap-2 items-center'>
                          <User2Icon className='h-6 w-6' />
                          {"View Profile"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                        <Link href="/customer-dashboard/settings" className='flex gap-2 items-center'>
                          <Settings className='h-6 w-6' />
                          {"Settings"}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                        <div className='flex gap-2 items-center' onClick={() => signOut()}>
                          <LogOut className='h-6 w-6' />
                          {"Log Out"}
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )
          }
        </div>

        {/* Mobile Sheet Trigger (visible on small screens) */}
        <div className="md:hidden flex items-center ml-4">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 text-white border-gray-700">
              <div className="flex flex-col space-y-4 p-4">
                {/* Mobile Dropdowns */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full justify-start text-white hover:text-teal-400">
                    For Customer <ChevronDown className="ml-auto h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 text-white border-gray-700 w-full">
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Browse Services</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">How it Works</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Support</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full justify-start text-white hover:text-teal-400">
                    For Business <ChevronDown className="ml-auto h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 text-white border-gray-700 w-full">
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">List Your Service</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Business Tools</DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">Partnerships</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Buttons */}
                <Button variant="outline" className="bg-teal-500 hover:bg-[#00998E] text-white border-teal-500 w-full rounded-lg px-4 py-2 shadow-md">
                  Signup
                </Button>
                <Button variant="outline" className="bg-white hover:bg-gray-100 text-teal-500 border-white w-full rounded-lg px-4 py-2 shadow-md">
                  Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default App;
