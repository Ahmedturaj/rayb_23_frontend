"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { UserRoundPen } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserData() {
    const { data: session, status: sessionStatus } = useSession();

    const { data: userData } = useQuery({
        queryKey: ["userData", session?.user?.email],
        queryFn: getUserProfile,
        select: (data) => data.data,
        enabled: sessionStatus === "authenticated",
    });

    const name = userData?.name || "";
    const imageLink = userData?.imageLink || "";

    const getInitials = (name: string) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();

    return (
        <div>
            <div className="p-6 bg-white rounded-lg border relative max-w-md mx-auto">
                <div className="absolute top-5 right-5">
                    <Link href="/customer-dashboard/settings">
                        <Button
                            size="icon"
                            className="bg-[#F7F8F8] text-black hover:bg-[#E8E9EA] transition-colors"
                        >
                            <UserRoundPen className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={imageLink} alt={`${name}'s avatar`} />
                        <AvatarFallback>{getInitials(name) || "U"}</AvatarFallback>
                    </Avatar>

                    <h3 className="text-lg font-semibold">{name}</h3>
                    <h5 className="text-gray-600">{userData?.email}</h5>
                    <p className="text-gray-500 mt-2">
                        {userData?.bio || "No bio available"}
                    </p>
                </div>
            </div>
        </div>
    );
}
