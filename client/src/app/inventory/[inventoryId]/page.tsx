"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/SupabaseClient";
import { useRouter, useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductWithForm } from "@/components/ui/productform";

const InventoryItem = () => {
    const router = useRouter();
    const { inventoryId } = useParams(); // Get the inventory ID from the URL params

    const [activity, setActivity] = useState(null);
    interface Product {
        product_id: string;
        product_name: string;
        description: string;
        price: number;
    }

    const [products, setProducts] = useState<Product[]>([]); // State for products
    const [loading, setLoading] = useState(true); // State for loading indicator

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
                    .eq("inventory_id", inventoryId); // Assuming your products table has an inventory_id column

                if (productsError) {
                    console.error("Error fetching products:", productsError);
                } else {
                    setProducts(productsData);
                }
            }
        };

        fetchActivity();
        fetchProducts();
        setLoading(false); // Set loading to false after fetching both activity and products
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
            setProducts(products.filter(product => product.product_id !== productId));
        }
    };

    if (loading) return <div className="text-center">Loading...</div>; // Show loading while fetching data
    if (!activity) return <div className="text-center">No activity found.</div>; // Handle no activity case

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">

            <div className="w-full h-20 flex justify-between items-center ">
                <a className="text-2xl font-bold">Products</a>
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-4">
                            Add Product
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        {/* Pass the fetched inventoryId to ProductWithForm */}
                        <ProductWithForm inventoryId={inventoryId} />
                    </DrawerContent>
                </Drawer>
            </div>

            <Card>
                <CardHeader>

                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <TableRow key={product.product_id}>
                                        <TableCell className="font-medium">{product.product_name}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell className="font-bold">${product.price}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="outline" onClick={() => handleEdit(product.product_id)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" onClick={() => handleDelete(product.product_id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No products found for this inventory.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
};

export default InventoryItem;
