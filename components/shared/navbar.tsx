"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  ChevronDown,
  Menu,
  Bell,
  Inbox,
  Bookmark,
  User2Icon,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getAllNotification, getUserProfile } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";

interface Business {
  _id: string;
  businessInfo?: {
    image?: string[];
    name?: string;
  };
  services?: {
    newInstrumentName: string;
    selectedInstrumentsGroup?: string;
  }[];
}

const Navbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const { data: userData } = useQuery({
    queryKey: ["userData", session?.user?.email],
    queryFn: getUserProfile,
    select: (data) => data.data,
    enabled: sessionStatus === "authenticated",
  });

  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith("/auth");

  // Search functionality state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Fetch businesses based on search query
  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!debouncedQuery) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/business?search=${encodeURIComponent(debouncedQuery)}`
        );
        const data = await response.json();
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, [debouncedQuery]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search-result`);
      setShowResults(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setSearchResults([]);
  };

  const { data: notifications = [] } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: async () => {
      const res = await getAllNotification();
      return res?.notify || [];
    },
  });

  const notificationCount = notifications.length;

  return (
    <nav className="p-4 border-b sticky top-0 z-50 bg-white">
      <div className="container flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-bold text-3xl lg:text-5xl">Instrufix</h1>
        </Link>

        {/* Search Bar (hidden on mobile, visible on desktop) */}
        {!isAuthPage && (
          <div
            className="hidden md:flex flex-1 max-w-xl mx-auto items-center relative"
            ref={searchRef}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowResults(searchQuery.length > 0)}
                placeholder="Guitar, strings, restringing..."
                className="pl-10 w-full h-[48px] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 bg-[#F7F8F8] rounded-lg border border-gray-200 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute z-50 top-14 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center">Searching...</div>
                ) : searchResults.length === 0 && searchQuery ? (
                  <div className="p-4 text-gray-500">No results found</div>
                ) : (
                  <ul>
                    {searchResults.slice(0, 5).map((business) => (
                      <Link
                        href={`/search-result/${business?._id}`}
                        key={business._id}
                      >
                        <li
                          className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            router.push(`/business/${business._id}`);
                            setShowResults(false);
                          }}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-3">
                              {business.businessInfo?.image?.[0] && (
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                  <Image
                                    src={business.businessInfo.image[0]}
                                    alt={
                                      business.businessInfo.name ||
                                      "Business image"
                                    }
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <h3 className="font-medium">
                                  {business.businessInfo?.name ||
                                    "Unknown Business"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {business.services
                                    ?.slice(0, 2)
                                    .map((s) => s.newInstrumentName)
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </Link>
                    ))}
                    {searchResults.length > 5 && (
                      <li
                        className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                        onClick={handleSearch}
                      >
                        View all {searchResults.length} results
                      </li>
                    )}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

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
              <div className="flex items-center justify-center h-10 w-10 bg-[#F7F8F8] rounded-full relative">
                <Link
                  href={`${
                    session?.user?.userType === "user"
                      ? "/customer-dashboard/settings/notifications"
                      : session?.user?.userType === "admin"
                      ? "/admin-dashboard/settings"
                      : "/business-dashboard/settings/notifications"
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          )}

          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-gray-700" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white text-gray-900 border-gray-200 w-80"
            >
              <div className="flex flex-col space-y-6 p-4">
                {/* Mobile Search Bar */}
                {!isAuthPage && (
                  <div className="relative" ref={searchRef}>
                    <div className="flex items-center bg-[#F7F8F8] rounded-xl shadow-inner overflow-hidden">
                      <Search className="ml-3 text-gray-500 h-5 w-5" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowResults(e.target.value.length > 0);
                        }}
                        onKeyDown={handleKeyPress}
                        onFocus={() => setShowResults(searchQuery.length > 0)}
                        placeholder="Guitar, strings, restringing..."
                        className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 px-4 bg-transparent outline-none"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="px-3 text-gray-500 hover:text-gray-700"
                          aria-label="Clear search"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    {/* Mobile Search Results Dropdown */}
                    {showResults && (
                      <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto">
                        {isLoading ? (
                          <div className="p-4 text-center">Searching...</div>
                        ) : searchResults.length === 0 && searchQuery ? (
                          <div className="p-4 text-gray-500">No results found</div>
                        ) : (
                          <ul>
                            {searchResults.slice(0, 5).map((business) => (
                              <Link
                                href={`/search-result/${business?._id}`}
                                key={business._id}
                              >
                                <li
                                  className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                                  onClick={() => setShowResults(false)}
                                >
                                  <div className="p-4">
                                    <div className="flex items-center gap-3">
                                      {business.businessInfo?.image?.[0] && (
                                        <div className="w-10 h-10 rounded-full overflow-hidden">
                                          <Image
                                            src={business.businessInfo.image[0]}
                                            alt={
                                              business.businessInfo.name ||
                                              "Business image"
                                            }
                                            width={40}
                                            height={40}
                                            className="object-cover"
                                          />
                                        </div>
                                      )}
                                      <div>
                                        <h3 className="font-medium">
                                          {business.businessInfo?.name ||
                                            "Unknown Business"}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                          {business.services
                                            ?.slice(0, 2)
                                            .map((s) => s.newInstrumentName)
                                            .join(", ")}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </Link>
                            ))}
                            {searchResults.length > 5 && (
                              <li
                                className="p-3 text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer"
                                onClick={() => {
                                  handleSearch();
                                  setShowResults(false);
                                }}
                              >
                                View all {searchResults.length} results
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* User Profile Section (if authenticated) */}
                {sessionStatus === "authenticated" && (
                  <div className="flex flex-col space-y-4 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={userData?.imageLink || "/placeholder.svg"}
                        />
                        <AvatarFallback className="uppercase">
                          {(() => {
                            const name = userData?.name?.trim();
                            if (!name) return "";
                            const parts = name.split(" ");
                            if (parts.length === 1) {
                              return parts[0][0];
                            } else {
                              return `${parts[0][0]}${parts[1][0]}`;
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
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                      Write a Review
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                      Add a Business
                    </DropdownMenuItem>
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
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                      Add My Business
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
                      Claim My Business
                    </DropdownMenuItem>
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
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    Write a Review
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    Add a Business
                  </DropdownMenuItem>
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
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    Add My Business
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    Claim My Business
                  </DropdownMenuItem>
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
              <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full relative">
                <Link
                  href={
                    session?.user?.userType === "admin"
                      ? "/admin-dashboard/messages"
                      : session?.user?.userType === "user"
                      ? "/customer-dashboard/messages"
                      : session?.user?.userType === "businessMan"
                      ? "/business-dashboard/messages"
                      : "/customer-dashboard/messages"
                  }
                >
                  <Inbox className="h-6 w-6" />
                </Link>
              </div>
              {session?.user?.userType === "user" && (
                <Link href={"/customer-dashboard/saved"}>
                  <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full">
                    <Bookmark className="h-6 w-6" />
                  </div>
                </Link>
              )}
              <div className="flex items-center justify-center h-12 w-12 bg-[#F7F8F8] rounded-full relative">
                <Link
                  href={`${
                    session?.user?.userType === "user"
                      ? "/customer-dashboard/settings/notifications"
                      : session?.user?.userType === "admin"
                      ? "/admin-dashboard/settings"
                      : "/business-dashboard/settings/notifications"
                  }`}
                >
                  <Bell className="h-6 w-6" />
                  {notificationCount > 0 && (
                    <span
                      className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full"
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </span>
                  )}
                </Link>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-teal-400 flex gap-1 items-center outline-none">
                  <Avatar>
                    <AvatarImage
                      src={userData?.imageLink || "/placeholder.svg"}
                    />
                    <AvatarFallback className="uppercase">
                      {(() => {
                        const name = userData?.name?.trim();
                        if (!name) return "";
                        const parts = name.split(" ");
                        if (parts.length === 1) {
                          return parts[0][0];
                        } else {
                          return `${parts[0][0]}${parts[1][0]}`;
                        }
                      })()}
                    </AvatarFallback>
                  </Avatar>
                  {userData?.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-gray-700 border-none">
                  <DropdownMenuItem className="hover:bg-[#F7F8F8] cursor-pointer">
                    <Link
                      href={
                        userData?.userType === "user"
                          ? "customer-dashboard/profile"
                          : userData?.userType === "admin"
                          ? "admin-dashboard/settings"
                          : "business-dashboard/profile"
                      }
                      className="flex gap-2 items-center"
                    >
                      <User2Icon className="h-6 w-6" />
                      {"View Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <Link
                      href="/customer-dashboard/settings"
                      className="flex gap-2 items-center"
                    >
                      <Settings className="h-6 w-6" />
                      {"Settings"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                    <div
                      className="flex gap-2 items-center"
                      onClick={() => signOut()}
                    >
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
  );
};

export default Navbar;