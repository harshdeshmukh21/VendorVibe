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
import { InputFile } from "./inputFile";

export function ProductWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Product.</CardTitle>
        <CardDescription>Deploy your new product in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-2 space-y-1.5">
              <div className="flex flex-col space-y-2.5 ">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Provide product type" />
                <Label htmlFor="name">Brand name</Label>
                <Input id="name" placeholder="Product brand" />
                <Label htmlFor="name">Enter quantity</Label>
                <Input id="name" placeholder="eg. 100 units" />
              </div>
              <div className="flex flex-col space-y-2.5 ">
                <Label htmlFor="name">List pricing</Label>
                <Input id="name" placeholder="Price per unit" />

                <Label htmlFor="name">Expiry</Label>
                <Input id="name" placeholder="Product expiry" />
                <InputFile></InputFile>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
