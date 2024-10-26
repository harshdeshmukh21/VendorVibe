import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CircleUserRound } from "lucide-react";

const TopNavbar = () => {
  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">
          Project Management & Task Tracking
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden sm:block ml-[560px]">
          <Input type="text" placeholder="Search..." className="pl-8 h-9" />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
      <CircleUserRound />
    </div>
  );
};

export default TopNavbar;
