// PlayerList.tsx
import React, { useEffect, useState } from "react";
import { AnalysisMap, Player, Team } from "@/models/analysis/analysismaps";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import TankIcon from "@/assets/roles/tank.svg";
import DPSIcon from "@/assets/roles/dps.svg";
import SupportIcon from "@/assets/roles/support.svg";


interface PlayerListProps {
  mapData: AnalysisMap;
  onPlayersSelected: (selectedPlayers: Player[]) => void;
}

const getRoleIcon = (role: string) => {
  switch (role.toLowerCase()) {
    case "tank":
      return TankIcon;
    case "dps":
      return DPSIcon;
    case "support":
      return SupportIcon;
    default:
      return null; // ou un logo par défaut si le rôle est inconnu
  }
};

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
    <Card className="w-fit h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
        <CardTitle>Players list</CardTitle>
      </CardHeader>
      <CardContent className="h-fit">
        {players.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {/* Affichage des 6 premiers joueurs */}
            {players
              .slice(0, 5)
              .sort((a, b) => {
                if (a.role === "Tank" && b.role !== "Tank") return -1;
                if (a.role !== "Tank" && b.role === "Tank") return 1;
                if (a.role === "DPS" && b.role !== "DPS") return -1;
                if (a.role !== "DPS" && b.role === "DPS") return 1;
                if (a.role === "Support" && b.role !== "Support") return -1;
                if (a.role !== "Support" && b.role === "Support") return 1;
                return 0;
              })
              .map((player, index) => (
                <React.Fragment key={player.name}>
                  {index === 0 && (
                    <li style={{ borderBottom: "1px solid gray", marginBottom: "15px" }}>
                      Équipe 1
                    </li>
                  )}
                  <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        id={player.name}
                        name={player.name}
                        value={player.name}
                        checked={selectedPlayers.some((p) => p.name === player.name)}
                        onClick={() => handlePlayerCheckboxChange(player.name)}
                      />
                      <label htmlFor={player.name} style={{ marginLeft: "5px", marginRight: "5px" }}>{player.name}</label>
                    </div>
                    {getRoleIcon(player.role) && (
                      <img src={getRoleIcon(player.role)} alt={player.role} width="20" height="20" style={{ marginLeft: "auto" }} />
                    )}
                  </li>
                </React.Fragment>
              ))}
            {/* Affichage des 6 derniers joueurs */}
            {players
              .slice(5)
              .sort((a, b) => {
                if (a.role === "Tank" && b.role !== "Tank") return -1;
                if (a.role !== "Tank" && b.role === "Tank") return 1;
                if (a.role === "DPS" && b.role !== "DPS") return -1;
                if (a.role !== "DPS" && b.role === "DPS") return 1;
                if (a.role === "Support" && b.role !== "Support") return -1;
                if (a.role !== "Support" && b.role === "Support") return 1;
                return 0;
              })
              .map((player, index) => (
                <React.Fragment key={player.name}>
                  {index === 0 && (
                    <li style={{ borderBottom: "1px solid gray", marginBottom: "15px" }}>
                      Équipe 2
                    </li>
                  )}
                  <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        id={player.name}
                        name={player.name}
                        value={player.name}
                        checked={selectedPlayers.some((p) => p.name === player.name)}
                        onClick={() => handlePlayerCheckboxChange(player.name)}
                      />
                      <label htmlFor={player.name} style={{ marginLeft: "5px", marginRight: "5px" }}>{player.name}</label>
                    </div>
                    {getRoleIcon(player.role) && (
                      <img src={getRoleIcon(player.role)} alt={player.role} width="20" height="20" style={{ marginLeft: "auto" }} />
                    )}
                  </li>
                </React.Fragment>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerList;
