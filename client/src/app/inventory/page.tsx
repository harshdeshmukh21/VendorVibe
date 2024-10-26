"use client";
import { useEffect, useState } from "react";
import { ListFilter, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CardWithForm from "@/components/ui/cardwform";
import { supabase } from "../../../lib/SupabaseClient";
import { useUser } from "@/app/context/UserContext";
import Link from "next/link";

const Inventory = () => {
  interface Activity {
    id: string;
    name: string;
    sections: string;
    expiryDate: string;
  }
  const { shopId } = useUser();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivitiesByShopId = async () => {
      const { data, error } = await supabase
        .from("Inventory")
        .select("inventory_id, section, expiry_date")
        .eq("shop_id", shopId);

      if (error) {
        console.error("Error fetching activities:", error);
        return;
      }

      const formattedData = data.map((item) => ({
        id: item.inventory_id,
        sections: item.section || "N/A",
        expiryDate: item.expiry_date || "No expiry date",
      }));

      setActivities(formattedData);
    };

    fetchActivitiesByShopId();
  }, []);

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
                      Inventories
                    </CardTitle>
                    <CardDescription className="text-s text-gray-600 mt-1">
                      Go through all your inventories at one place.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          Add inventories
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <CardWithForm />
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-600">
                        Inventory ID
                      </TableHead>
                      <TableHead className="text-gray-600">Title</TableHead>
                      <TableHead className="text-gray-600">Sections</TableHead>
                      <TableHead className="text-gray-600">
                        Expiry Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id} className="border-gray-200">
                        <TableCell className="font-medium text-gray-900">
                          <Link href={`/inventory/${activity.id}`}>
                            {activity.id}
                          </Link>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {activity.sections}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {activity.expiryDate}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="w-8 h-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

export default Inventory;
