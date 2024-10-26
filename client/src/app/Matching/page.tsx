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
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { CarouselDemo } from "@/components/ui/Graphcarousel";
import TopNavbar from "@/components/navbar"; // Ensure this component is also cleaned up

const Dashboard = () => {
  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:px-6">
            <div className="flex items-center gap-4">
              {/* Your sidebar trigger or other elements */}
            </div>
            <TopNavbar /> {/* Ensure this doesn't include filtering options */}
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 mt-[25px]">
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
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
