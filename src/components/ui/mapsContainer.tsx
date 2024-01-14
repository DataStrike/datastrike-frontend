import { Map } from "@/components/ui/Map";
import { Separator } from "@/components/ui/separator";
import { MapResult } from "@/models/overwatch/maps.ts";

interface Props {
  maps: MapResult[];
  deleteMap: (i: number) => void;
  updateMap: (index: number, field: string, value: any) => void;
}

export function MapsContainer({ maps, deleteMap, updateMap }: Props) {
  return (
    <div id="maps-container" className="flex flex-col">
      <label className="text-sm mt-3 mb-2 font-medium">Maps</label>
      <div className="flex flex-col gap-2">
        {maps.map((map, index) => (
          <div key={index}>
            <Map
              isLast={index === maps.length - 1}
              deleteMap={() => deleteMap(index)}
              map={map}
              updateMap={(field, value) => updateMap(index, field, value)}
            />
            {index !== maps.length - 1 && <Separator className="mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
