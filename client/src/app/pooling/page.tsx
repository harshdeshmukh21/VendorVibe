"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ListFilter, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TopNavbar from "@/components/navbar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Package,
  HeartHandshake,
  Blend,
  Truck,
  ArrowRightLeft,
  ChartNoAxesCombined,
  Sparkles,
  MessageSquareText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";

const ModifiedTableDemo = () => {
  const Requests = [
    {
      shop_ID: "1",
      InventoryName: "shop1",
      PricePerUnit: "Rs.500",
      Quantity: "50",
    },
    {
      shop_ID: "3",
      InventoryName: "shop3",
      PricePerUnit: "Rs.550",
      Quantity: "75",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shop_ID</TableHead>
          <TableHead>Inventory name</TableHead>
          <TableHead>Price per unit</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Requests.map((shop_ID) => (
          <TableRow key={shop_ID.shop_ID}>
            <TableCell className="font-medium">{shop_ID.shop_ID}</TableCell>
            <TableCell>{shop_ID.InventoryName}</TableCell>
            <TableCell>{shop_ID.PricePerUnit}</TableCell>
            <TableCell>{shop_ID.Quantity}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                Create Request
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Dashboard = () => {
  const router = useRouter();

  const handleAcceptRequests = () => {
    router.push("/poolingout"); // Updated to route to /poolingout
  };

  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="text-lg font-semibold text-gray-800">
                  Inventory Requests
                </div>
              </div>
              <div className="flex-1 flex justify-end items-center gap-4 mx-4">
                <TopNavbar />
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="rounded-lg border bg-white p-4">
              <div className="flex justify-end mb-4">
                <Button
                  variant="default"
                  className="bg-slate-600 hover:bg-slate-700"
                  onClick={handleAcceptRequests}
                >
                  Accept requests
                </Button>
              </div>
              <ModifiedTableDemo />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
