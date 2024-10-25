import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const TopNavbar = () => {
  return (
    <div className="flex-1 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">
          Project Management & Task Tracking
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden sm:block">
          <Input type="text" placeholder="Search..." className="pl-8 h-9" />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>

        <button className="p-1.5 hover:bg-gray-100 rounded hidden sm:block">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0L10.2 5.27273L16 5.81818L11.6 9.54545L12.8 15.2727L8 12.2727L3.2 15.2727L4.4 9.54545L0 5.81818L5.8 5.27273L8 0Z"
              fill="#9CA3AF"
            />
          </svg>
        </button>

        <button className="p-1.5 hover:bg-gray-100 rounded">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="4" r="1.5" fill="#6B7280" />
            <circle cx="8" cy="8" r="1.5" fill="#6B7280" />
            <circle cx="8" cy="12" r="1.5" fill="#6B7280" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
