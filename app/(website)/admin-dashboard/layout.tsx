import AdminDashboardLayout from "@/components/admin-dashboard/ad-layout";
import React from "react";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <AdminDashboardLayout />
            <div className="container py-5 lg:py-12">
                {children}
            </div>
        </main >
    );
}