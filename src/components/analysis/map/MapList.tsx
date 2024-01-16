// MapList.tsx
import React from "react";
import MapCard from "./MapCard";

interface MapListProps {
  maps: any[]; // Ajoutez le type correct pour les maps
  onMapClick: (map: any) => void;
}

const MapList: React.FC<MapListProps> = ({ maps, onMapClick }) => {
  return (
    <div className="flex flex-col gap-2">
      {maps.map((map) => (
        <MapCard key={map.id} map={map} onClick={() => onMapClick(map)} />
      ))}
    </div>
  );
};

export default MapList;
