import { ListFilter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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
import { AppSidebar } from "@/components/app-sidebar";
import TopNavbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Inventory = () => {
  const activities = [
    {
      id: "1",
      name: "Activity 1",
      location: "Location 1",
      participants: ["User1", "User2"],
      description: "Description 1",
      createdBy: "Creator1",
    },
    {
      id: "2",
      name: "Activity 2",
      location: "Location 2",
      participants: ["User3"],
      description: "Description 2",
      createdBy: "Creator2",
    },
  ];

  return (
    <SidebarProvider className="bg-gray-50">
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-white px-4 sm:static sm:h-16 sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger />
            <div className="text-lg font-semibold text-gray-800 ml-2"></div>
            <TopNavbar />
          </header>

          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-gray-900">All Events</div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Card className="border rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  All Events
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Go through new and upcoming events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200">
                      <TableHead className="text-gray-600">Name</TableHead>
                      <TableHead className="text-gray-600">
                        Description
                      </TableHead>
                      <TableHead className="text-gray-600">Status</TableHead>
                      <TableHead className="hidden md:table-cell text-gray-600">
                        People Joined
                      </TableHead>
                      <TableHead className="hidden md:table-cell text-gray-600">
                        Location
                      </TableHead>
                      <TableHead className="text-gray-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id} className="border-gray-200">
                        <TableCell className="font-medium text-gray-900">
                          {activity.name}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {activity.description}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-center text-gray-600">
                          {activity.participants?.length || 0}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {activity.location}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="w-8 h-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;
