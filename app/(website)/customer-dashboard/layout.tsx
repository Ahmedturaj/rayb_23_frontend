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
            {children}
        </main >
    );
}