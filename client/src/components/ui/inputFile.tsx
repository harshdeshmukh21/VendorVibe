import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile() {
  return (
    <div className="grid w-full max-w-sm items-center pt-2 gap-2.5">
      <Label htmlFor="picture">Add product picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
