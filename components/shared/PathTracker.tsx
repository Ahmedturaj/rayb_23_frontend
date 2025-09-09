"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const capitalize = (str: string) =>
  str
    .replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
    .join(" ");

const PathTracker = ({
  title,
  header,
  id,
  isLoading,
}: {
  title: string;
  header?: string;
  id?: string;
  isLoading?: boolean;
}) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="text-xl">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const isLast = index === segments.length - 1;

              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>
                        {isLoading ? "" : capitalize(header ? header : segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>{capitalize(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {!pathname.startsWith("/search-result") && (
        <div>
          {pathname === `/search-result/${id}` ? (
            <h1 className="font-semibold text-[32px] my-3"></h1>
          ) : (
            <h1 className="font-semibold text-[32px] my-3">
              {segments.length
                ? capitalize(header ? header : segments[segments.length - 1])
                : "Home'"}
            </h1>
          )}

          <p className="text-md text-gray-500">{title}</p>
        </div>
      )}
    </div>
  );
};

export default PathTracker;
