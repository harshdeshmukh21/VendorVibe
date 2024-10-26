"use client";

import { useEffect, useState, useRef } from "react";
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
import { GoogleGenerativeAI } from "@google/generative-ai";
import dayjs from "dayjs";

const API_KEY = "AIzaSyAAO4E-Bqpu4Nr8UHwnmn7bAVxK6odumEE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

interface Message {
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  isCode?: boolean;
}

interface ProductData {
  product_name: string;
  description: string;
  listing_price: number;
  inventory_id: string;
}

interface Product {
  product_id: string;
  product_name: string;
  description: string;
  listing_price: number;
}

const InventoryItem = () => {
  const router = useRouter();
  const { inventoryId } = useParams();
  const [activity, setActivity] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Extract product information from AI response
  const extractProductInfo = (text: string): ProductData | null => {
    try {
      const nameMatch = text.match(/product name:?\s*([^\n]+)/i);
      const descMatch = text.match(/description:?\s*([^\n]+)/i);
      const priceMatch = text.match(/price:?\s*(\d+)/i);

      if (nameMatch && descMatch && priceMatch) {
        return {
          product_name: nameMatch[1].trim(),
          description: descMatch[1].trim(),
          listing_price: parseInt(priceMatch[1]),
          inventory_id: inventoryId as string,
        };
      }
      return null;
    } catch (error) {
      console.error("Error extracting product info:", error);
      return null;
    }
  };

  // Function to automatically submit product
  const submitProduct = async (productData: ProductData) => {
    try {
      const { data, error } = await supabase
        .from("ProductCatalog")
        .insert([productData])
        .select();

      if (error) throw error;

      // Refresh products list
      const { data: productsData } = await supabase
        .from("ProductCatalog")
        .select("*")
        .eq("inventory_id", inventoryId);

      setProducts(productsData || []);

      // Add success message to chat
      setMessages((prev) => [
        ...prev,
        {
          text: `Successfully added product: ${productData.product_name}`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);

      // Close the drawer
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error submitting product:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Failed to add product. Error: ${(error as any).message}`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user", timestamp: new Date() },
    ]);

    setChatLoading(true);
    try {
      const enhancedPrompt = `
        Please help me create a product with the following information from this request: "${input}"
        Format your response as:
        Product Name: [extracted name]
        Description: [extracted description]
        Price: [extracted price as a number only]
        Only include these three fields.
      `;

      const result = await model.generateContent(enhancedPrompt);
      const text = result.response.text();
      const isCode = text.includes("```");

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
          isCode,
        },
      ]);

      // Extract and submit product
      const productData = extractProductInfo(text);
      if (productData) {
        setIsDrawerOpen(true);
        await submitProduct(productData);
      }
    } catch (error) {
      console.error("generateContent error: ", error);
    } finally {
      setChatLoading(false);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (inventoryId) {
        const [activityResponse, productsResponse] = await Promise.all([
          supabase
            .from("Inventory")
            .select("*")
            .eq("inventory_id", inventoryId)
            .single(),
          supabase
            .from("ProductCatalog")
            .select("*")
            .eq("inventory_id", inventoryId),
        ]);

        if (activityResponse.error) {
          console.error("Error fetching activity:", activityResponse.error);
        } else {
          setActivity(activityResponse.data);
        }

        if (productsResponse.error) {
          console.error("Error fetching products:", productsResponse.error);
        } else {
          setProducts(productsResponse.data || []);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, [inventoryId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
                        <ProductWithForm inventoryId={inventoryId as string} />
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

          {/* Chatbot */}
          <div className="fixed bottom-6 left-[55%] -translate-x-1/2 w-[40%] flex flex-col gap-4">
            <div
              ref={chatContainerRef}
              className="bg-white rounded-lg shadow-lg p-4 max-h-[400px] overflow-y-auto mb-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-black text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {dayjs(message.timestamp).format("HH:mm")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex items-center justify-center">
              {chatLoading && (
                <div className="absolute -top-6 left-0 w-full">
                  <div className="h-1 w-full bg-gray-200 rounded">
                    <div className="h-1 bg-black animate-pulse rounded"></div>
                  </div>
                </div>
              )}
              <textarea
                className="w-full h-12 px-4 py-2 bg-white rounded-full border border-gray-200
                  resize-none text-gray-800 placeholder-gray-400 text-sm
                  focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                  shadow-sm"
                placeholder="Describe the product you want to add..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={chatLoading}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black
                  hover:bg-gray-800 rounded-full text-white text-sm transition-colors
                  duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={sendMessage}
                disabled={chatLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default InventoryItem;
