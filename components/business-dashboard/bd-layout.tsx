"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BusinessDashboardLayout() {
  const pathname = usePathname();

  const tabs = [
    { name: "Profile", href: "/business-dashboard/profile" },
    { name: "Dashboard", href: "/business-dashboard/bd-dashboard" },
    { name: "Reviews", href: "/business-dashboard/reviews" },
    { name: "Messages", href: "/business-dashboard/messages" },
    { name: "Settings", href: "/business-dashboard/settings" },
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
