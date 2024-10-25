import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Inventory.</CardTitle>
        <CardDescription>
          Deploy your new inventory in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-2 space-y-1.5">
              <Label htmlFor="framework">Select section</Label>

              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Groceries</SelectItem>
                  <SelectItem value="sveltekit">Medications</SelectItem>
                  <SelectItem value="astro">Stationary shops</SelectItem>
                  <SelectItem value="nuxt">Electonics</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col space-y-2.5 ">
                <Label htmlFor="name">Enter available quantity</Label>
                <Input id="name" placeholder="100 units" />
              </div>
              <div className="flex flex-col space-y-2.5 ">
                <Label htmlFor="name">Purchase price</Label>
                <Input
                  id="name"
                  placeholder="purchase price that was for you"
                />
                <Label htmlFor="name">Selling price</Label>
                <Input id="name" placeholder="Price per unit" />
                <Label htmlFor="name">Expiry</Label>
                <Input
                  id="name"
                  placeholder="Deadline for ur stock availability"
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
