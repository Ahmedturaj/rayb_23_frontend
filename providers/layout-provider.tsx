"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const HIDDEN_ROUTES = [
  "/signup",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify",
  "/verify-otp",
  "/business-dashboard",
  "/admin-dashboard",
];

export default function LayoutVisibilityWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const shouldHideLayout = HIDDEN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
