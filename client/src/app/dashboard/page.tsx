import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ListFilter, Users2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Package,
  HeartHandshake,
  Truck,
  ChartNoAxesCombined,
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
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      {/* <Sidebar></Sidebar> */}
      <div className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="text-m font-medium text-gray-800 ml-2">
            {/* {user ? `Hello, ${user.displayName}` : "Hello, Guest"} */}
          </div>
          {/* <div className="relative ml-auto flex-1 md:grow-0"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Users2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="text-gray-700">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
                  <CardTitle className="text-4xl text-gray-900 p-2">
                    <Package size={48} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-600">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  {/* <Progress
                    value={20}
                    aria-label="12% increase"
                    className="bg-gray-200 [&>div]:bg-slate-900"
                  /> */}
                </CardFooter>
              </Card>
              <Card className="bg-gray-50 border-gray-200 rounded-md">
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
                    Instantly match with the best vendors.
                  </div>
                </CardContent>
                <CardFooter>
                  {/* <Progress
                    value={20}
                    aria-label="12% increase"
                    className="bg-gray-200 [&>div]:bg-slate-900"
                  /> */}
                </CardFooter>
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
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Example row - repeat as needed */}
                        <TableRow className="border-gray-200">
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-gray-600 md:inline">
                              liam@example.com
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            Sale
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs bg-green-100 text-green-800">
                              Fulfilled
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        {/* Add more rows as needed */}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Repeat similar structure for month and year tabs */}
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden bg-gray-50 border-gray-200 rounded-md h-[88vh]">
              <CardHeader className="flex flex-row items-start border-gray-100">
                <div className="grid gap-0.5">
                  <CardTitle className="text-gray-900 text-[30px]">
                    Community
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Add your recent updates content here */}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
