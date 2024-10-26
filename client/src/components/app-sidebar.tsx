import Link from "next/link";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Package,
  HeartHandshake,
  Truck,
  ChartNoAxesCombined,
  Blend,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Package,
  },
  {
    title: "Smart Match",
    url: "/Matching",
    icon: HeartHandshake,
  },
  {
    title: "Pooling",
    url: "/pooling",
    icon: Blend,
  },
  // {
  //   title: "Analytics",
  //   url: "/analytics",
  //   icon: ChartNoAxesCombined,
  // },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-[#FAFAFA]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>VendorVibe</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
