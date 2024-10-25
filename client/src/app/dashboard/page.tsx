import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ListFilter, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Package,
  HeartHandshake,
  Blend,
  Truck,
  ArrowRightLeft,
  ChartNoAxesCombined,
  Sparkles,
  MessageSquareText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { CarouselDemo } from "@/components/ui/Graphcarousel";

const Dashboard = () => {
  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger />
            <div className="text-m font-medium text-gray-800 ml-2">
              {/* {user ? `Hello, ${user.displayName}` : "Hello, Guest"} */}
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2 bg-gray-50 border-gray-200 rounded-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-900 text-[30px]">
                      Inventory
                    </CardTitle>
                    <CardDescription className="max-w-lg leading-relaxed text-gray-600">
                      Introducing Our Dynamic Orders Dashboard for Seamless
                      Management and Insightful Analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter></CardFooter>
                </Card>
                <Card className="bg-gray-50 border-gray-200 rounded-md">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-gray-600 font-semibold">
                      Delivery
                    </CardDescription>
                    <CardTitle className="text-4xl text-gray-900 p-1">
                      <Package size={48} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-gray-600">
                      +25% from last week
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
                <Card className="bg-gray-50 border-gray-200 rounded-md">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-gray-600 font-semibold">
                      Share Inventory
                    </CardDescription>
                    <CardTitle className="text-4xl text-gray-900 items-center p-1">
                      <Blend size={48} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-gray-600">
                      Instantly match with the best vendors.
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
              <Tabs defaultValue="week">
                <div className="flex items-center">
                  <TabsList className="bg-gray-100 rounded-md">
                    <TabsTrigger
                      value="week"
                      className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                    >
                      Week
                    </TabsTrigger>
                    <TabsTrigger
                      value="month"
                      className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                    >
                      Month
                    </TabsTrigger>
                    <TabsTrigger
                      value="year"
                      className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
                    >
                      Year
                    </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="h-8 gap-1 bg-slate-900 text-white">
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Fulfilled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Declined
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Refunded
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <TabsContent value="week">
                  <Card className="bg-gray-50 border-gray-200 rounded-md h-[55vh] overflow-scroll">
                    <CardHeader className="px-7">
                      <CardTitle className="text-gray-900 text-[30px]">
                        Analytics
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        List of our most active planters.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CarouselDemo />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Card className="overflow-hidden bg-gray-50 border-gray-200 rounded-md h-[92.5vh]">
                <CardHeader className="flex flex-row items-start border-gray-100">
                  <div className="grid gap-0.5 w-full">
                    <CardTitle className="text-gray-900 text-[30px]">
                      Community
                    </CardTitle>

                    <Card className="bg-gray-50 border-gray-200 rounded-md w-full mt-4 h-[24vh]">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-600 font-semibold">
                          Smart Match
                        </CardDescription>
                        <CardTitle className="text-4xl text-gray-900 p-2">
                          <HeartHandshake size={48} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          Instantly match with the best vendors which will
                          fulfill your requirements.
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>

                    <Card className="bg-gray-50 border-gray-200 rounded-md w-full mt-4 h-[24vh]">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-600 font-semibold">
                          Active Shares
                        </CardDescription>
                        <CardTitle className="text-4xl text-gray-900 p-2">
                          <ArrowRightLeft size={48} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          Instantly match with the best vendors which will
                          fulfill your requirements.
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                    <Card className="bg-gray-50 border-gray-200 rounded-md w-full mt-4 h-[24vh]">
                      <CardHeader className="pb-2">
                        <CardDescription className="text-gray-600 font-semibold">
                          Messages
                        </CardDescription>
                        <CardTitle className="text-4xl text-gray-900 p-2">
                          <MessageSquareText size={48} />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-gray-600">
                          Instantly match with the best vendors which will
                          fulfill your requirements.
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Add your recent updates content here */}
                </CardContent>
              </Card>
              {/* <Card className="overflow-hidden h-[22vh] mt-8  bg-gray-50 border-gray-200 rounded-md">
                <CardHeader className="flex flex-row items-start">
                  <div className="grid gap-0.5 w-full">
                    <CardTitle className="text-gray-900 text-[30px]">
                      Ask AI
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <label className="relative block">
                    <Input className="pr-10" />
                    <Sparkles className="absolute right-2 top-1/2 transform -translate-y-1/2" />
                  </label>
                </CardContent>
              </Card> */}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
