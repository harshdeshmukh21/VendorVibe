import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import { supabase } from "../../../lib/SupabaseClient";

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

const FixedChatbot = ({ inventoryId }: { inventoryId: string }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Function to extract product information from AI response
  const extractProductInfo = (text: string): ProductData | null => {
    try {
      // Look for patterns in the AI response
      const nameMatch = text.match(/product name:?\s*([^\n]+)/i);
      const descMatch = text.match(/description:?\s*([^\n]+)/i);
      const priceMatch = text.match(/price:?\s*(\d+)/i);

      if (nameMatch && descMatch && priceMatch) {
        return {
          product_name: nameMatch[1].trim(),
          description: descMatch[1].trim(),
          listing_price: parseInt(priceMatch[1]),
          inventory_id: inventoryId,
        };
      }
      return null;
    } catch (error) {
      console.error("Error extracting product info:", error);
      return null;
    }
  };

  // Function to automatically submit product to database
  const submitProduct = async (productData: ProductData) => {
    try {
      const { data, error } = await supabase
        .from("ProductCatalog")
        .insert([productData])
        .select();

      if (error) {
        throw error;
      }

      // Add success message to chat
      setMessages((prev) => [
        ...prev,
        {
          text: `Successfully added product: ${productData.product_name}`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error submitting product:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: `Failed to add product. Error: ${(error as Error).message}`,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user", timestamp: new Date() },
    ]);

    setLoading(true);
    try {
      // Enhanced prompt to get structured product information
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

      // Add AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: "ai",
          timestamp: new Date(),
          isCode,
        },
      ]);

      // Extract and submit product if possible
      const productData = extractProductInfo(text);
      if (productData) {
        await submitProduct(productData);
      }
    } catch (error) {
      console.error("generateContent error: ", error);
    } finally {
      setLoading(false);
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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
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
              {message.isCode ? (
                <MDEditor.Markdown
                  source={message.text}
                  style={{
                    whiteSpace: "pre-wrap",
                    background: "transparent",
                    color: message.sender === "user" ? "white" : "inherit",
                  }}
                />
              ) : (
                <>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {dayjs(message.timestamp).format("HH:mm")}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center">
        {loading && (
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
          disabled={loading}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black
            hover:bg-gray-800 rounded-full text-white text-sm transition-colors
            duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FixedChatbot;
