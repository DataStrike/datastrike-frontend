import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { MapSelector } from "@/components/ui/MapSelector";
import { MapResult } from "@/models/overwatch/maps.ts";
import { findMapType } from "@/utils/stats.ts";

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
        <MapSelector
          selectedMap={map.map_name}
          onSelect={(value) => updateMap("map_name", value)}
        />
        {isLast && (
          <Button
            size="icon"
            className={"grow"}
            variant="destructive"
            onClick={deleteMap}
          >
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
      {findMapType(map.map_name) === "Push" ||
      findMapType(map.map_name) === "Hybrid" ? (
        <div className="flex grow gap-2">
          <Input
            className="px-2"
            placeholder="Info us"
            onChange={(e) => updateMap("us_info", e.target.value)}
          />
          <Separator className="h-10" orientation="vertical" />
          <Input
            className="px-2"
            placeholder="Info them"
            onChange={(e) => updateMap("them_info", e.target.value)}
          />
        </div>
      ) : null}
      <Input
        className="px-2"
        type="text"
        placeholder="Replay code"
        value={map.replay_code}
        onChange={(e) => updateMap("replay_code", e.target.value)}
      />
    </div>
  );
}
