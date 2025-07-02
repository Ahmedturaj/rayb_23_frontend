import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import LayoutVisibilityWrapper from "@/providers/layout-provider";
import QueryProvider from "@/providers/query-provider";
import SessionWrapper from "@/providers/session-provider";
import { Toaster } from "sonner";


const font = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Instrufix | Find Trusted Instrument Repair Shops ",
  description: "Find The Best Instrument Repair Shop Near You",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <SessionWrapper>
          <QueryProvider>
            <LayoutVisibilityWrapper>
              {children}
              <Toaster position="top-right" />
            </LayoutVisibilityWrapper>
          </QueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
