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
    <Card className="w-full min-h-screen ">
      <CardHeader></CardHeader>
      <CardContent>
        <form></form>
      </CardContent>
      <CardFooter className="flex flex-row gap-[800px]">
        <div></div>
      </CardFooter>
    </Card>
  );
}
