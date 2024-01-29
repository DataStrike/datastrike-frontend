// PlayerList.tsx
import React, { useEffect } from "react";
import { Player, Team } from "@/models/analysis/analysismaps.ts";

interface PlayerListProps {
  teams: Record<string, Team>;
  onPlayerClick: (player: Player) => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ teams, onPlayerClick }) => {
  useEffect(() => {
    if (!teams) return;
    console.info("Teams:", teams);

    Object.values(teams).map((team) => console.info("Team:", team));
  }, [teams]);
  return (
    <div className="rounded-md border border-gray-300 p-4">
      {teams &&
        Object.values(teams).map((team, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-bold">{team.name}</h2>
            <ul>
              {team.players &&
                Object.values(team.players).map((player, playerIndex) => (
                  <li
                    key={playerIndex}
                    onClick={() => onPlayerClick(player)}
                    className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  >
                    {player.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PlayerList;
