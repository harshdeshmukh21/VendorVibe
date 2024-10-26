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
import { supabase } from "../../../lib/SupabaseClient";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const ModifiedTableDemo = () => {
  const [zone, setZone] = useState("");
  const [shopIds, setShopIds] = useState<number[]>([]);
  const [response, setResponse] = useState("");
  const [bestShop, setBestShop] = useState<number | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleFetchShops = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchShopIdsForZone(zone);
  };

  const handleBestSearch = async () => {
    await fetchBestShopForZone(zone);
  };

  const fetchShopIdsForZone = async (zone: string) => {
    if (!zone) {
      setResponse("Please select a zone to get the shop IDs.");
      return;
    }

    try {
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("shop_id")
        .eq("location_id", zone);

      if (inventoryError) {
        console.error("Error fetching inventory data:", inventoryError);
        setResponse("Error fetching inventory data.");
        return;
      }

      if (inventoryData && inventoryData.length > 0) {
        const shopIdsFromInventory = inventoryData.map((item) => item.shop_id);
        setShopIds(shopIdsFromInventory);

        const prompt = `Here are the shop IDs for zone "${zone}": ${shopIdsFromInventory.join(
          ", "
        )}.`;
        const result = await model.generateContent(prompt);
        setResponse(result.response.text());
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

  const fetchBestShopForZone = async (zone: string) => {
    if (!zone) {
      setResponse("Please select a zone to get the best shop.");
      return;
    }

    try {
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("shop_id, quantity_available")
        .eq("location_id", zone);

      if (inventoryError) {
        console.error("Error fetching inventory data:", inventoryError);
        setResponse("Error fetching inventory data.");
        return;
      }

      if (inventoryData && inventoryData.length > 0) {
        const bestShopData = inventoryData.reduce((prev, curr) =>
          prev.quantity_available > curr.quantity_available ? prev : curr
        );
        setBestShop(bestShopData.shop_id);

        const prompt = `The shop with the highest quantity available in zone "${zone}" is shop ID ${bestShopData.shop_id} with a quantity of ${bestShopData.quantity_available}.`;
        const result = await model.generateContent(prompt);
        setResponse(result.response.text());
      } else {
        setResponse(`No shops found in zone "${zone}".`);
        setBestShop(null);
      }
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      setResponse("An error occurred while generating the response.");
    }
  };

  return (
    <div className="space-y-6">
      <h1>Shop Information</h1>
      <form onSubmit={handleFetchShops}>
        <div>
          <label htmlFor="zone">Zone:</label>
          <select
            id="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            required
          >
            <option value="">Select a zone</option>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={handleBestSearch}>
          Best Search
        </Button>
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
              <li key={id}>{id}</li>
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
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
            <TopNavbar />
          </header>
          <main className="flex-1 p-6 space-y-6">
            <section className="rounded-lg border bg-white p-4">
              <ModifiedTableDemo />
            </section>
          </main>
        </div>
      </div>
      <FormforZone />
    </SidebarProvider>
  );
};

export default Matching;
