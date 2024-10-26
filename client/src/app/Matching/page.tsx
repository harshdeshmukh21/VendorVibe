"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/navbar";
import { supabase } from "../../../lib/SupabaseClient";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/app/context/UserContext";

const ModifiedTableDemo = () => {
  const [zone, setZone] = useState("");
  const [shopIds, setShopIds] = useState<number[]>([]);
  const [response, setResponse] = useState("");
  const [bestShop, setBestShop] = useState<number | null>(null);
  const { shopId } = useUser(); // Assuming shopId is the user's shop ID

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const getGeminiResponse = async (prompt: string) => {
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return responseText.replace(/\*/g, ""); // Remove asterisks from the response
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      return "An error occurred while generating the response.";
    }
  };

  const handleFetchShops = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shopId) { // Using shopId directly
      await fetchShopIdsForZone(zone, shopId);
    }
  };

  const handleBestSearch = async () => {
    if (shopId) {
      await fetchBestShopForZone(zone, shopId);
    }
  };

  const fetchShopIdsForZone = async (zone: string, requesterShopId: number) => {
    if (!zone) {
      setResponse("Please select a zone to get the shop IDs.");
      return;
    }

    try {
      const { data: shopData, error: shopError } = await supabase
        .from("Shops")
        .select("shop_id")
        .eq("zone", zone);

      if (shopError) {
        console.error("Error fetching shop data:", shopError);
        setResponse("Error fetching shop data.");
        return;
      }

      if (shopData && shopData.length > 0) {
        const shopIdsFromShops = shopData
          .map((item) => item.shop_id)
          .filter((id) => id !== requesterShopId);

        setShopIds(shopIdsFromShops);

        const prompt = `Zone ${zone} shops: ${shopIdsFromShops.join(
          ", "
        )}, don't ask questions or say anything, just quiet.`;
        const geminiResponse = await getGeminiResponse(prompt);
        setResponse(geminiResponse);
      } else {
        setResponse(`No shops found in zone "${zone}".`);
        setShopIds([]);
        setBestShop(null);
      }
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      setResponse("An error occurred while generating the response.");
    }
  };

  const fetchBestShopForZone = async (zone: string, requesterShopId: number) => {
    if (!zone) {
      setResponse("Please select a zone to get the best shop.");
      return;
    }

    try {
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("Shops")
        .select("shop_id, quantity_available") // Make sure to select quantity_available
        .eq("zone", zone);

      if (inventoryError) {
        console.error("Error fetching inventory data:", inventoryError);
        setResponse("Error fetching inventory data.");
        return;
      }

      if (inventoryData && inventoryData.length > 0) {
        const otherShops = inventoryData.filter(
          (item) => item.shop_id !== requesterShopId
        );

        if (otherShops.length === 0) {
          setResponse("No other shops available in the selected zone.");
          setBestShop(null);
          return;
        }

        const bestShopData = otherShops.reduce((prev, curr) =>
          prev.quantity_available > curr.quantity_available ? prev : curr
        );
        setBestShop(bestShopData.shop_id);

        const prompt = `The shop with the highest quantity available in zone "${zone}" is shop ID ${bestShopData.shop_id} with a quantity of ${bestShopData.quantity_available}.`;
        const geminiResponse = await getGeminiResponse(prompt);
        setResponse(geminiResponse);
      } else {
        setResponse(`No shops found in zone "${zone}".`);
        setBestShop(null);
      }
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      setResponse("An error occurred while generating the response.");
    }
  };

  const handleConnect = async (shopId: number, inventoryId: number, pricePerUnit: number) => {
    if (!shopId) {
      setResponse("No shop selected for connection.");
      return;
    }

    try {
      const { error } = await supabase
        .from("InventorySharing") // Make sure to use `.from` for the correct table
        .insert([{
          provider_shop_id: shopId, // Changed to use the selected shopId
          requester_shop_id: shopId, // This will now correctly represent the clicked shop
          inventory_id: inventoryId,
          price_per_unit: pricePerUnit,
          request_time: new Date(),
          status: 'pending'
        }]);

      if (error) {
        console.error("Error connecting shops:", error);
        setResponse("Error connecting shops: " + error.message);
      } else {
        setResponse(`Successfully connected to shop ID ${shopId}.`);
      }
    } catch (error) {
      console.error("Error connecting shops:", error);
      setResponse("An error occurred while connecting the shops.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="text-[30px] font-bold text-gray-900">
          Smart Match
        </CardTitle>
        <CardDescription className="text-s text-gray-600 mt-1">
          We provide this substantial feature to pool your inventories with your
          local vendors, so that you never run out of stock!
        </CardDescription>
      </div>
      <form onSubmit={handleFetchShops}>
        <div>
          <label htmlFor="zone">Zone: </label>
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
            className="w-32 h-8 border border-gray-300 rounded-md p-1"
          >
            <option value="">Select a zone</option>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row gap-4 mt-[20px]">
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={handleBestSearch}>
            Best Search
          </Button>
        </div>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}

      {shopIds.length > 0 && (
        <div>
          <h2>Fetched Shop IDs:</h2>
          <ul>
            {shopIds.map((id) => (
              <li key={id} className="flex justify-between">
                {id}
                <Button
                  type="button"
                  onClick={() => handleConnect(id, /* Pass your inventoryId and pricePerUnit */)}
                >
                  Connect
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bestShop && (
        <div>
          <h2>Best Shop ID (Highest Quantity):</h2>
          <p>{bestShop}</p>
        </div>
      )}
    </div>
  );
};

const Matching = () => {
  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6 lg:px-8">
            <TopNavbar />
          </header>
          <main className="flex-1 overflow-auto p-4">
            <ModifiedTableDemo />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Matching;
