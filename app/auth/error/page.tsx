"use client";
import { Loader } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const error = searchParams.get("error");

    useEffect(() => {
        if (error?.startsWith("VERIFY_EMAIL:")) {
            const token = error.split(":")[1];
            router.replace(`/auth/verify-email?token=${token}&type=login`);
        }
    }, [error, router]);

    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <Loader className="animate-spin" />
        </div>
    );
}
