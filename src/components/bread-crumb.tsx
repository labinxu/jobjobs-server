"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadCrumb() {
  const pathname = usePathname()
    .split("/")
    .filter((v) => v != "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem key={`bi-0`} className="hidden md:block">
          <BreadcrumbLink key={`bl-0`} href="#">
            Doggy
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.map((v, i) => (
          <React.Fragment key={`fragment-${i}`}>
            <BreadcrumbSeparator key={`bs-${i}`} className="hidden md:block" />
            <BreadcrumbItem key={`ibi-${i}`}>
              <BreadcrumbPage key={`bp-${i}`}>{v}</BreadcrumbPage>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
