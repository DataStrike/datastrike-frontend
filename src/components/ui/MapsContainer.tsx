import { Map } from "@/components/ui/map.tsx";
import { Separator } from "@/components/ui/separator.tsx";
interface Props {
  nbMaps: number;
}
export function MapsContainer({ nbMaps }: Props) {
  return (
    <div id="maps-container" className="flex flex-col ">
      <label className="text-sm mt-3 mb-2 font-medium ">Maps</label>
      <div className="flex flex-col gap-2">
        {Array.from({ length: nbMaps }, (_, i) => (
          <div key={i}>
            <Map />
            {i !== nbMaps - 1 && <Separator className="mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
