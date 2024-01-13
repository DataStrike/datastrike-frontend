import { Map } from "@/components/ui/Map";
import { Separator } from "@/components/ui/separator";
import { MapResult } from "@/models/overwatch/maps.ts";

interface Props {
  maps: MapResult[];
  deleteMap: (i: number) => void;
}

export function MapsContainer({ maps, deleteMap }: Props) {
  return (
    <div id="maps-container" className="flex flex-col">
      <label className="text-sm mt-3 mb-2 font-medium">Maps</label>
      <div className="flex flex-col gap-2">
        {Array.from({ length: maps.length }, (_, i) => (
          <div key={i}>
            <Map
              isLast={i === maps.length - 1}
              deleteMap={() => deleteMap(i)}
            />
            {i !== maps.length - 1 && <Separator className="mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
