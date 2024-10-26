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

export function FormforZone() {
  return (
    <Card className="w-full min-h-screen">
      <CardHeader>
        <CardTitle>Smart Match</CardTitle>
        <CardDescription>Match and make alias.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full  items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Product name</Label>
              <Input id="name" placeholder="Name of your product" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Zone</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select your Zone" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Zone A</SelectItem>
                  <SelectItem value="sveltekit">Zone B</SelectItem>
                  <SelectItem value="astro">Zone C</SelectItem>
                  <SelectItem value="nuxt">Zone D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row gap-[800px]">
        <Button>Generate Matches</Button>
        <div>
          <Label htmlFor="name">Best Match generated:</Label>
          <Input id="name" placeholder="Detailed review of best match" />
        </div>
      </CardFooter>
    </Card>
  );
}
