// PlayerList.tsx

import React, { useState } from "react";

interface PlayerListProps {
  mapData: any; // Remplacez "any" par le type approprié pour vos données
  onPlayersSelected: (selectedPlayers: string[]) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  mapData,
  onPlayersSelected,
}) => {
  const players = {};
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  Object.values(mapData.data.rounds[0].teams).map((team: any) =>
    Object.values(team.players).map(
      (player: any) => (players[player.name] = player.name),
    ),
  );

  const handleStatsCheckboxChange = (statsKey: string) => {
    // Mise à jour de la liste des statistiques sélectionnées
    const updatedSelectedStats = selectedPlayers.includes(statsKey)
      ? selectedPlayers.filter((key) => key !== statsKey)
      : [...selectedPlayers, statsKey];

    setSelectedPlayers(updatedSelectedStats);
    onPlayersSelected(updatedSelectedStats);
  };

  return (
    <div>
      <h2>Liste des Joueurs</h2>
      <ul>
        {Object.keys(players).map((key) => (
          <li key={key}>
            <input
              type="checkbox"
              id={key}
              checked={selectedPlayers.includes(key)}
              onChange={() => handleStatsCheckboxChange(key)}
            />
            <label htmlFor={key}>{key}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
