import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapCard from './MapCard'; // Supposons que vous avez un composant MapCard

function MapList({ maps, onMapClick }: { maps: any[], onMapClick: (map: any) => void }) {
  const [selectedMap, setSelectedMap] = useState(null);

  const handleMapClick = (map: React.SetStateAction<null>) => {
    setSelectedMap(map);
    console.info('Map selected:', map.map_name)
  };

  return (
    <div className="map-container">
    {/* Liste de map-cards à gauche */}
    <div className="map-list">
      {maps.map((map) => (
        <MapCard key={map.id} map={map} onClick={() => onMapClick(map)} />
      ))}
    </div>
    </div>
  );
}

export default MapList;