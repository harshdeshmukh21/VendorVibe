"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ListFilter, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopNavbar from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const PoolingTableDemo = () => {
  const poolingRequests = [
    {
      request_ID: "1",
      shopName: "Shop A",
      inventoryName: "Item 1",
      quantity: "100",
      status: "Pending",
    },
    {
      request_ID: "2",
      shopName: "Shop B",
      inventoryName: "Item 2",
      quantity: "150",
      status: "Pending",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Shop Name</TableHead>
          <TableHead>Inventory Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {poolingRequests.map((request) => (
          <TableRow key={request.request_ID}>
            <TableCell className="font-medium">{request.request_ID}</TableCell>
            <TableCell>{request.shopName}</TableCell>
            <TableCell>{request.inventoryName}</TableCell>
            <TableCell>{request.quantity}</TableCell>
            <TableCell>{request.status}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-50 hover:bg-red-100 text-red-600"
                >
                  Reject
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const PoolingDashboard = () => {
  const router = useRouter();

  const handleViewInventory = () => {
    router.push("/pooling");
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
              </div>
              <div className="flex-1 flex justify-end items-center gap-4 mx-4">
                <TopNavbar />
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">
            <div className="rounded-lg border bg-white p-4">
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-50"
                  >
                    Filter
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-50"
                  >
                    Sort
                  </Button>
                </div>
                <Button
                  variant="default"
                  className="bg-slate-600 hover:bg-slate-700"
                  onClick={handleViewInventory}
                >
                  Send Pool Request
                </Button>
              </div>
              <PoolingTableDemo />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PoolingDashboard;
