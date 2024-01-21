// PlayerList.tsx
import React, { useEffect, useState } from "react";
import { AnalysisMap, Player, Team } from "@/models/analysis/analysismaps";

interface PlayerListProps {
  mapData: AnalysisMap;
  onPlayersSelected: (selectedPlayers: Player[]) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({
  mapData,
  onPlayersSelected,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const uniquePlayers = extractUniquePlayers(mapData);
    setPlayers(uniquePlayers);
  }, [mapData]);

  const extractUniquePlayers = (mapData: AnalysisMap): Player[] => {
    const uniquePlayers: Player[] = [];

    mapData.data.rounds.forEach((round) => {
      Object.values(round.teams).forEach((team: Team) => {
        Object.values(team.players).forEach((player: Player) => {
          if (!uniquePlayers.some((p) => p.name === player.name)) {
            uniquePlayers.push(player);
          }
        });
      });
    });

    return uniquePlayers;
  };

  const handlePlayerCheckboxChange = (playerName: string) => {
    const updatedSelectedPlayers: Player[] = [...selectedPlayers];
    const playerIndex = updatedSelectedPlayers.findIndex(
      (player) => player.name === playerName,
    );

    if (playerIndex === -1) {
      updatedSelectedPlayers.push(
        players.find((player) => player.name === playerName) as Player,
      );
    } else {
      updatedSelectedPlayers.splice(playerIndex, 1);
    }

    setSelectedPlayers(updatedSelectedPlayers);
    onPlayersSelected(updatedSelectedPlayers);
  };

  return (
    <div>
      <h2>Players list</h2>
      {players.length > 0 && (
        <ul>
          {players.map((player) => (
            <li key={player.name}>
              <input
                type="checkbox"
                id={player.name}
                name={player.name}
                value={player.name}
                checked={selectedPlayers.some((p) => p.name === player.name)}
                onChange={() => handlePlayerCheckboxChange(player.name)}
              />
              <label htmlFor={player.name}>{player.name}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlayerList;
