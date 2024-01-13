import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { MapSelector } from "@/components/ui/MapSelector";

interface Props {
  deleteMap: () => void;
  isLast: boolean;
}

export function Map({ deleteMap, isLast }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="grow">
          <MapSelector />
        </div>
        {isLast && (
          <Button size="icon" variant="destructive" onClick={deleteMap}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex grow gap-2">
        <Input className="pl-2" type="number" min="0" placeholder="Us" />
        <Separator className="h-10" orientation="vertical" />
        <Input className="px-2" type="number" min="0" placeholder="Them" />
      </div>
    </div>
  );
}
