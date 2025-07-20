import { MoreVertical } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const users = [
  {
    id: 1,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Customer",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Customer",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Business Owner",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Customer",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Business Owner",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Business Owner",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Customer",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Samantha T.",
    email: "samanthatt@gmail.com",
    phoneNumber: "+12 345 6776556",
    dateJoin: "24, Dec 2024",
    designation: "Business Owner",
    avatarSrc: "/placeholder.svg?height=40&width=40",
  },
]

export default function ManageUsersPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div className="grid gap-2">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-muted-foreground">
          Monitor platform activity, manage submissions, and keep your community running smoothly.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-start">
        <div className="grid gap-1.5">
          <label htmlFor="user-type" className="text-sm font-medium">
            User Type
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="user-type" className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="business-owner">Business Owner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="sort-by" className="text-sm font-medium">
            Sort By
          </label>
          <Select defaultValue="latest">
            <SelectTrigger id="sort-by" className="w-[180px]">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="time-range" className="text-sm font-medium">
            Time Range
          </label>
          <Select defaultValue="all">
            <SelectTrigger id="time-range" className="w-[180px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-lg border overflow-hidden">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Name
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Email
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Phone Number
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Date join
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Designation
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted even:bg-muted/50"
              >
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex items-center gap-3">
                  <Avatar className="w-9 h-9 border">
                    <AvatarImage src={user.avatarSrc || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.name}
                </td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{user.email}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{user.phoneNumber}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{user.dateJoin}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{user.designation}</td>
                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View User</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
