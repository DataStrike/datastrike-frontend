// MapCard.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";

interface MapCardProps {
  map: AnalysisMap;
  onClick: () => void;
}

const MapCard: React.FC<MapCardProps> = ({ map, onClick }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-sm bg-white px-4 py-3 border items-center border-gray-200">
      <div className="flex items-center  gap-2">
        <div className="inline-flex gap-4 items-center">
          <h3 className="text-xl font-bold">{map.mapName}</h3>
          <p className="text-gray-600">{map.date}</p>
        </div>

        <div className="flex w-56  justify-center gap-4 ml-auto mr-16 items-center">
          <div className="text-center">
            <p className="font-bold">{map.team1Name}</p>
            <p className="text-lg">{map.team1Score}</p>
          </div>
          <div className="text-xl mx-4">vs</div>
          <div className="text-center">
            <p className="font-bold">{map.team2Name}</p>
            <p className="text-lg">{map.team2Score}</p>
          </div>
        </div>
        <Button onClick={onClick}>See Map</Button>
      </div>
    </div>
  );
};

export default MapCard;
