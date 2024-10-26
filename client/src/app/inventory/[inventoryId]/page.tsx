"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/SupabaseClient";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithForm } from "@/components/ui/productform";
import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const InventoryItem = () => {
  const router = useRouter();
  const { inventoryId } = useParams();

  const [activity, setActivity] = useState(null);
  interface Product {
    product_id: string;
    product_name: string;
    description: string;
    listing_price: number;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      if (inventoryId) {
        const { data: activityData, error: activityError } = await supabase
          .from("Inventory")
          .select("*")
          .eq("inventory_id", inventoryId)
          .single();

        if (activityError) {
          console.error("Error fetching activity:", activityError);
          return;
        }

        setActivity(activityData);
      }
    };

    const fetchProducts = async () => {
      if (inventoryId) {
        const { data: productsData, error: productsError } = await supabase
          .from("ProductCatalog")
          .select("*")
          .eq("inventory_id", inventoryId);

        if (productsError) {
          console.error("Error fetching products:", productsError);
        } else {
          setProducts(productsData);
        }
      }
    };

    fetchActivity();
    fetchProducts();
    setLoading(false);
  }, [inventoryId]);

  const handleEdit = (productId: string) => {
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDelete = async (productId: string) => {
    const { error } = await supabase
      .from("ProductCatalog")
      .delete()
      .eq("product_id", productId);

    if (error) {
      console.error("Error deleting product:", error);
    } else {
      setProducts(
        products.filter((product) => product.product_id !== productId)
      );
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!activity) return <div className="text-center">No activity found.</div>;

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
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Products
                    </CardTitle>
                    <CardDescription className="text-s text-gray-600 mt-1">
                      Manage your inventory products here
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
                          Add Product
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <ProductWithForm inventoryId={inventoryId} />
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-gray-600">
                        Product Name
                      </TableHead>
                      <TableHead className="text-gray-600">
                        Description
                      </TableHead>
                      <TableHead className="text-gray-600">Price</TableHead>
                      <TableHead className="text-gray-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product.product_id}>
                          <TableCell className="font-medium">
                            {product.product_name}
                          </TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell className="font-bold">
                            Rs.{product.listing_price}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(product.product_id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No products found for this inventory.
                        </TableCell>
                      </TableRow>
                    )}
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

export default InventoryItem;
