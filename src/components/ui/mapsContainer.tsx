import { Map } from "@/components/ui/map.tsx";
interface Props {
  nbMaps: number;
}
export function MapsContainer({ nbMaps }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mt-3 h-full mb-2 font-medium ">Maps</label>
      <div className="flex flex-col gap-2">
        {Array.from({ length: nbMaps }, (_, i) => (
          <Map key={i} />
        ))}
      </div>
    </div>
  );
}
