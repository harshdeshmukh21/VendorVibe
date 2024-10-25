import { ChevronLeft, ChevronRight, ListFilter, Users2 } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardWithForm } from "@/components/ui/cardwform";
import { ProductWithForm } from "@/components/ui/productform";
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
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
          <main className="p-6">
            <div className="mb-8">
              <div className="w-full items-center flex justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Inventory and product management
                </h1>
                <div className="flex items-center gap-6">
                  <Package className="h-6 w-6" />
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
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <CardWithForm />
              </div>
              <div className="flex-1">
                <ProductWithForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
