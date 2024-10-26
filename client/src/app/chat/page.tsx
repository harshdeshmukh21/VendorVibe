"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "../../../lib/SupabaseClient";

interface ChatProps {
    shopId1: string;
    shopId2: string;
}

export default function Chat({ shopId1, shopId2 }: ChatProps) {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState<{ sender: string; message: string }[]>([]);
    const [shopNames, setShopNames] = useState<{ [key: string]: string }>({}); // To store shop names

    // Fetch chat history and shop names on component mount
    useEffect(() => {
        const fetchChatHistory = async () => {
            // Fetch chat messages
            const { data: chatData, error: chatError } = await supabase
                .from("Chat")
                .select("chat")
                .eq("shop_id_1", shopId1)
                .eq("shop_id_2", shopId2);

            if (chatError) {
                console.error("Error fetching chat history:", chatError);
            } else {
                const messages = chatData.length > 0 ? chatData[0].chat : [];
                const formattedMessages = messages.map((msg: any) => ({
                    sender: shopId1,
                    message: msg,
                }));
                setChatHistory(formattedMessages);
            }

            // Fetch shop names
            const { data: shopsData, error: shopsError } = await supabase
                .from("Shops")
                .select("id, shop_name")
                .in("id", [shopId1, shopId2]); // Fetch both shop names

            if (shopsError) {
                console.error("Error fetching shop names:", shopsError);
            } else {
                const names: { [key: string]: string } = {};
                shopsData.forEach((shop) => {
                    names[shop.id] = shop.shop_name; // Map shop IDs to shop names
                });
                setShopNames(names);
            }
        };

        fetchChatHistory();
    }, [shopId1, shopId2]);

    // Handle sending a message
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            // Insert the message into the chat table
            const { error } = await supabase
                .from("Chat")
                .upsert({
                    shop_id_1: shopId1,
                    shop_id_2: shopId2,
                    chat: [message], // Store as an array with the new message
                });

            if (error) {
                throw new Error(error.message);
            }

            // Update the chat history
            setChatHistory((prev) => [...prev, { sender: shopId1, message }]);
            setMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                {chatHistory.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <strong>{shopNames[msg.sender] || "Unknown Shop"}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
}
