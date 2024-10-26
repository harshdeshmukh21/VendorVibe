"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const TopNavbar = () => {
  const pathname = usePathname();

  const getComponentName = (path: string) => {
    const routes: { [key: string]: string } = {
      "/dashboard": "Dashboard",
      "/inventory": "Inventory",
      "/community": "Community",
      "/pooling": "Pooling",
      "/analytics": "Analytics",
      "/": "Home",
      "/poolingout": "Pooling > Pooling Out",
    };

    // Remove trailing slash if present
    const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
    return routes[normalizedPath as keyof typeof routes] || "Not Found";
  };

  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">{getComponentName(pathname)}</div>
      </div>
      <div className="flex items-center gap-4"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-circle-user-round"
      >
        <path d="M18 20a6 6 0 0 0-12 0" />
        <circle cx="12" cy="10" r="4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
};

export default TopNavbar;
