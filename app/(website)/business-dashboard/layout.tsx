import React from "react";
import BusinessDashboardLayout from "@/components/business-dashboard/bd-layout";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <BusinessDashboardLayout />
      <div className="py-5 lg:py-12">{children}</div>
    </main>
  );
}
