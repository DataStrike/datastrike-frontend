import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash2Icon } from "lucide-react";

export function Map() {
  const deleteMap = () => {
    console.log("delete");
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="grow">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Map" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>KOTH</SelectLabel>
                <SelectItem value="lijiang">Lijiang</SelectItem>
                <SelectItem value="nepal">Nepal</SelectItem>
                <SelectItem value="oasis">Oasis</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button variant="destructive">
          <Trash2Icon className="h-4 w-4" onClick={deleteMap} />
        </Button>
      </div>
      <div className="flex grow gap-2 ">
        <Input className="pl-2" type="number" min="0" placeholder="Us" />
        <Separator className="h-10" orientation="vertical" />
        <Input className="px-2" type="number" min="0" placeholder="Them" />
      </div>
    </div>
  );
}
