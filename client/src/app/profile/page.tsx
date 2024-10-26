"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/navbar";

const Profile = () => {
  // Dummy user data
  const [user] = useState({
    displayName: "John Doe",
    email: "john.doe@example.com",
    photoURL: null,
    metadata: {
      creationTime: "2024-01-01T00:00:00.000Z",
    },
    shop: {
      name: "John's Shop",
      type: "Grocery",
      location: "Downtown",
      address: "123 Main St, City, Country",
      trustScore: 4.5,
    },
  });

  // Dummy badge data
  const badgeImages = Array(7).fill("/api/placeholder/300/250");

  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>
            <TopNavbar />
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 mt-[25px]">
            <div className="lg:col-span-3">
              <Card className="w-full bg-white shadow-md rounded-lg">
                <CardContent className="flex flex-col justify-center items-center">
                  <div className="overflow-hidden rounded-full h-[50px] w-[50px] mt-[20px] bg-gray-100">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User avatar"
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <Users2 className="h-8 w-8 text-gray-600" />
                    )}
                  </div>
                  <div className="text-[20px] font-medium text-gray-900 mt-[10px]">
                    {user.displayName}
                  </div>
                  <div className="text-center mt-2 flex flex-row">
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p>
                      <Separator
                        orientation="vertical"
                        className="ml-2 mr-2 bg-gray-300"
                      />
                    </p>
                    <p className="text-sm text-gray-600">9372881526</p>
                    <p>
                      <Separator
                        orientation="vertical"
                        className="ml-2 mr-2 bg-gray-300"
                      />
                    </p>
                    <p className="text-sm text-gray-600">
                      Preferred Language: Marathi
                    </p>
                  </div>
                </CardContent>

                <Separator className="bg-gray-200" />

                <CardContent className="flex flex-col justify-center items-center">
                  <div className="text-[18px] font-medium text-gray-900 mt-[10px]">
                    Shop Information
                  </div>
                  <div className="text-center mt-2 flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                      <strong>Shop name:</strong> {user.shop.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Shop type:</strong> {user.shop.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {user.shop.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Address:</strong> {user.shop.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Trust score:</strong> {user.shop.trustScore}
                    </p>
                  </div>
                </CardContent>

                <Separator className="bg-gray-200" />

                <CardFooter className="flex justify-between" />
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
