"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboardLayout() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/admin-dashboard/dashboard" },
    {
      name: "Business Submissions",
      href: "/admin-dashboard/business-submissions",
    },
    { name: "Business Claims", href: "/admin-dashboard/business-claims" },
    { name: "Manage Photos", href: "/admin-dashboard/manage-photos" },
    { name: "Manage Reviews", href: "/admin-dashboard/manage-reviews" },
    { name: "Manage Users", href: "/admin-dashboard/manage-users" },
    { name: "Manage Services", href: "/admin-dashboard/manage-services" },
    { name: "Messages", href: "/admin-dashboard/messages" },
    { name: "Settings", href: "/admin-dashboard/settings " },
  ];

  return (
    <section className="border-b py-4">
      <div className="container">
        <nav className="flex lg:space-x-6 space-x-2">
          {tabs.map((tab) => {
            const isActive =
              pathname === tab.href || pathname.startsWith(`${tab.href}/`);
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`py-1 text-sm font-medium ${
                  isActive
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
