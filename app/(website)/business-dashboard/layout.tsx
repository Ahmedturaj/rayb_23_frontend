import React from "react";
import AdminDashboardLayout from "@/components/business-dashboard/bd-layout";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <AdminDashboardLayout />
            <div className="py-5 lg:py-12">
                {children}
            </div>
        </main >
    );
}