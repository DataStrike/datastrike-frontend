// AnalysisList.tsx
import React from "react";
import MapList from "./map/MapList";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";
import { useNavigate } from "react-router-dom";

interface AnalysisListProps {
  maps: AnalysisMap[];
}

const AnalysisList: React.FC<AnalysisListProps> = ({ maps }) => {
  const navigate = useNavigate();
  const handleMapClick = (mapId: number) => {
    // Go to the map page
    navigate(`/analysis/${mapId}`);
  };
  return (
    <div className="w-full">
      <MapList
        maps={maps}
        onMapClick={(map) => {
          handleMapClick(map.id);
        }}
      />
    </div>
  );
};

export default AnalysisList;
