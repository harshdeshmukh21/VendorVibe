"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/navbar";
import { FormforZone } from "@/components/ui/forzone";

// Testable ModifiedTableDemo component
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
    <div>
      <h2 className="text-lg font-bold mb-4">Shop Inventory List</h2>{" "}
      {/* Visible header for verification */}
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
          {Requests.map((shop) => (
            <TableRow key={shop.shop_ID}>
              <TableCell className="font-medium">{shop.shop_ID}</TableCell>
              <TableCell>{shop.InventoryName}</TableCell>
              <TableCell>{shop.PricePerUnit}</TableCell>
              <TableCell>{shop.Quantity}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Create Request
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Dashboard layout with explicit component structure for debugging
const Dashboard = () => {
  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
            <TopNavbar />
          </header>
          <main className="flex-1 p-6 space-y-6">
            <div className="border p-4 bg-gray-100">
              <h2>Form Zone</h2>
            </div>
            <section className="rounded-lg border bg-white p-4">
              <ModifiedTableDemo /> {/* Should render the table and title */}
            </section>
          </main>
        </div>
      </div>
      <FormforZone />
    </SidebarProvider>
  );
};

export default Dashboard;
