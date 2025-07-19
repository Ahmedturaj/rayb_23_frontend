import React from "react";
import CustomerDashboardLayout from "@/components/customer-dashboard/cd-layout";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            <CustomerDashboardLayout />
            <div className="py-5 lg:py-12">
                {children}
            </div>
        </main >
    );
}