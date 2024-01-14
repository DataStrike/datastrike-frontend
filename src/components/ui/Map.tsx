import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { MapSelector } from "@/components/ui/MapSelector";
import { MapResult } from "@/models/overwatch/maps.ts";

interface Props {
  deleteMap: () => void;
  isLast: boolean;
  map: MapResult;
  updateMap: (field: string, value: any) => void;
}

export function Map({ deleteMap, isLast, map, updateMap }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="grow">
          <MapSelector
            selectedMap={map.map_name}
            onSelect={(value) => updateMap("map_name", value)}
          />
        </div>
        {isLast && (
          <Button size="icon" variant="destructive" onClick={deleteMap}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex grow gap-2">
        <Input
          className="pl-2"
          type="number"
          min="0"
          placeholder="Us"
          value={map.us_score}
          onChange={(e) => updateMap("us_score", e.target.value)}
        />
        <Separator className="h-10" orientation="vertical" />
        <Input
          className="px-2"
          type="number"
          min="0"
          placeholder="Them"
          value={map.them_score}
          onChange={(e) => updateMap("them_score", e.target.value)}
        />
      </div>
    </div>
  );
}
