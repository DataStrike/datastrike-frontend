// StatsKeyList.tsx

import React, { useEffect, useState } from 'react';

interface StatsKeyListProps {
  mapData: any; // Remplacez "any" par le type approprié pour vos données
  onStatsSelected: (selectedStats: string[]) => void;
}

const StatsKeyList: React.FC<StatsKeyListProps> = ({ mapData, onStatsSelected }) => {

  var statsKeys = {};
  let somethingAdded = false;

  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  
  Object.values(mapData.data.rounds[0].teams).forEach((team) => {
    Object.values(team.players).forEach((player) => {
      Object.values(player.characters).forEach((character) => {
        if (character && character.stats && Object.keys(character.stats).length > 0) {
          statsKeys = character.stats;
          somethingAdded = true;
        }
      });
  
      // Si quelque chose a été ajouté, sortir de la boucle externe
      if (somethingAdded) {
        return;
      }
    });
  
    // Si quelque chose a été ajouté, sortir de la boucle externe
    if (somethingAdded) {
      return;
    }
  });

  const handleStatsCheckboxChange = (statsKey: string) => {
    // Mise à jour de la liste des statistiques sélectionnées
    const updatedSelectedStats = selectedStats.includes(statsKey)
      ? selectedStats.filter((key) => key !== statsKey)
      : [...selectedStats, statsKey];

    setSelectedStats(updatedSelectedStats);

    // console.info(updatedSelectedStats)

    onStatsSelected(updatedSelectedStats);
  };

  

  return (
    <div>
      <h2>Liste des Clés de Statistiques</h2>
      <ul>
        {Object.keys(statsKeys).map((key) => (
          <li key={key}>
            <div>
            <input
                type="checkbox"
                id={key}
                checked={selectedStats.includes(key)}
                onChange={() => handleStatsCheckboxChange(key)}
              />
              <label htmlFor={key}>{key}</label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default StatsKeyList;