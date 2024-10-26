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

const Dashboard = () => {
  const router = useRouter();

  const handleAcceptRequests = () => {
    router.push("/poolingout");
  };

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
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            <TopNavbar />
          </header>

          <main className="flex-1 p-6">
            <Card className="border rounded-lg shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[30px] font-bold text-gray-900">
                      Pool Inventories
                    </CardTitle>
                    <CardDescription className="text-s text-gray-600 mt-1">
                      We provide this substantial feature to pool your
                      inventories with your local vendors, so that you never run
                      out of stock!
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-slate-600 hover:bg-slate-700"
                      onClick={handleAcceptRequests}
                    >
                      Accept Pool Requests
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600">Shop_ID</TableHead>
                      <TableHead className="text-gray-600">
                        Inventory name
                      </TableHead>
                      <TableHead className="text-gray-600">
                        Price per unit
                      </TableHead>
                      <TableHead className="text-gray-600">Quantity</TableHead>
                      <TableHead className="text-gray-600">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Requests.map((shop_ID) => (
                      <TableRow
                        key={shop_ID.shop_ID}
                        className="border-gray-200"
                      >
                        <TableCell className="font-medium text-gray-900">
                          {shop_ID.shop_ID}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {shop_ID.InventoryName}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {shop_ID.PricePerUnit}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {shop_ID.Quantity}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Create Request
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
