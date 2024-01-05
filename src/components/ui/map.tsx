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

export function Map() {
  return (
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
      <div className="flex gap-2 ">
        <Input
          className="min-w-[64px] pl-2"
          type="number"
          min="0"
          placeholder="Us"
        />
        <Separator className="h-10" orientation="vertical" />
        <Input
          className="min-w-[64px] px-2"
          type="number"
          min="0"
          placeholder="Them"
        />
      </div>
    </div>
  );
}
