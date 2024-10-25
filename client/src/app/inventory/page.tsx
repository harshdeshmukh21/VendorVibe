import DashboardClient from "@/components/DashboardClient";
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
import { Sidebar } from "@/components/ui/sidebar";

const Dashboard = async () => {
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
        <main>
          <div>
            <div>
              <div className="w-full items-center flex flex-row">
                <h1>Inventory and product management.</h1>
                <div className="flex flex-row gap-10">
                  <div>Icon</div>
                  <div>Profile</div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full gap-10">
              <div className="flex-1">
                <CardWithForm />
              </div>
              <div className="flex-1">
                <ProductWithForm />
              </div>
            </div>
          </div>
          <div></div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
