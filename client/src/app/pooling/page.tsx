"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import {
  Users2,
  PackageSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TopNavbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Dashboard = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [connectedShops, setConnectedShops] = useState([]);

  useEffect(() => {
    fetchRequests();
    fetchConnectedShops();
  }, []);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from("InventorySharing")
      .select("sharing_id, requester_shop_id, inventory_id, quantity, price_per_unit, request_time, status")
      .eq("status", "pending");

    if (error) {
      console.error("Error fetching requests:", error);
    } else {
      setRequests(data);
    }
  };

  const fetchConnectedShops = async () => {
    const { data, error } = await supabase
      .from("InventorySharing")
      .select("requester_shop_id,provider_shop_id, inventory_id, status,sharing_id");

    if (error) {
      console.error("Error fetching connected shops:", error);
    } else {
      setConnectedShops(data);
    }
  };

  const handleAccept = async (requestId: string) => {
    // Update the status of the request to true
    const { error } = await supabase
      .from("InventorySharing")
      .update({ status: true }) // Change to your desired value for accepted requests
      .eq("sharing_id", requestId);

    if (error) {
      console.error("Error updating request status:", error);
    } else {
      // Re-fetch data to reflect the changes
      await fetchRequests();
      await fetchConnectedShops();
    }
  };

  const handleCreateRequests = () => {
    router.push('/smartMatch');
  };

  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white px-6">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-4">
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
                  onClick={handleCreateRequests}
                >
                  Create requests
                </Button>
              </div>

              {/* Tabs and Panels */}
              <Tabs defaultValue="requests" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="requests" className="flex items-center gap-2">
                    <PackageSearch className="h-4 w-4" />
                    Pending Requests
                  </TabsTrigger>
                  <TabsTrigger value="connected" className="flex items-center gap-2">
                    <Users2 className="h-4 w-4" />
                    Connected Shops
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="requests">
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory Sharing Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Requester Shop</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price/Unit</TableHead>
                            <TableHead>Request Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {requests.map((request: any) => (
                            <TableRow key={request.sharing_id}>
                              <TableCell>{request.requester_shop_id}</TableCell>
                              <TableCell>{request.quantity}</TableCell>
                              <TableCell>₹{request.price_per_unit}</TableCell>
                              <TableCell>{request.request_time}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                                  {request.status ? "Accepted" : "Pending"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="default" onClick={() => handleAccept(request.sharing_id)}>
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="connected">
                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Shops</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Shop ID</TableHead>

                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {connectedShops.map((shop: any) => (
                            <TableRow key={shop.shop_id}>
                              <TableCell>{shop.sharing_id}</TableCell>

                              <TableCell>
                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                                  {shop.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button size="sm" variant="outline">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
