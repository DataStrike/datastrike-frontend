// MapCard.tsx

import React from 'react';
import { Button } from "@/components/ui/button"

interface MapCardProps {
  map: any; 
  onClick: () => void;
}

const MapCard: React.FC<MapCardProps> = ({ map, onClick }) => {
    return (
      <div
      className="rounded-lg overflow-hidden shadow-md bg-white p-6 mb-8 border border-gray-300"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{map.map_name}</h3>
        <p className="text-gray-600">{map.date}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="font-bold">{map.team1_name}</p>
          <p className="text-lg">{map.team1_score}</p>
        </div>
        <div className="text-xl mx-4">VS</div>
        <div className="text-center">
          <p className="font-bold">{map.team2_name}</p>
          <p className="text-lg">{map.team2_score}</p>
        </div>
      </div>

      {/* Nouvelle section pour le bouton */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          onClick={onClick}
        >
          See Map
        </button>
      </div>
    </div>
    );
  };
  
  export default MapCard;
