"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Shield, Bell } from "lucide-react";

export default function SettingsSidebar() {
    const pathname = usePathname();

    const links = [
        {
            href: "/customer-dashboard/settings/account",
            label: "Account settings",
            description: "Edit your account info here",
            icon: User,
        },
        {
            href: "/customer-dashboard/settings/security",
            label: "Security",
            description: "Manage your security settings",
            icon: Shield,
        },
        {
            href: "/customer-dashboard/settings/notifications",
            label: "Notifications",
            description: "Manage your notification settings",
            icon: Bell,
        },
    ];

    return (
        <aside className="w-full space-y-3">
            {links.map(({ href, label, description, icon: Icon }) => {
                const isActive = pathname === href || pathname.startsWith(`/${href}/`);
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            "flex items-start gap-3 p-3 rounded-lg transition-colors",
                            isActive
                                ? "bg-muted/50 border border-muted"
                                : "hover:bg-muted/20"
                        )}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium">{label}</h4>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </Link>
                );
            })}
        </aside>
    );
}
