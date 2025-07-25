import React from "react";
import BusinessDashboardLayout from "@/components/business-dashboard/bd-layout";
import { BusinessContextProvider } from "@/lib/business-context";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <BusinessContextProvider>
        <BusinessDashboardLayout />
        <div className="py-5 lg:py-12">{children}</div>
      </BusinessContextProvider>
    </main>
  );
}
