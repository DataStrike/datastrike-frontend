import React, { useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import StatsList from "./StatsList";
import PlayerGraph from "./DynamicGraph";
import {
  AnalysisMap,
  GraphDataStats,
  Player,
} from "@/models/analysis/analysismaps.ts";

interface PlayerStatsGraphProps {
  mapData: AnalysisMap;
}

const PlayerStatsGraph: React.FC<PlayerStatsGraphProps> = ({ mapData }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  const [dataGraph, setDataGraph] = useState<{
    [playerName: string]: GraphDataStats[];
  }>({});

  useEffect(() => {
    const filteredPlayersData = mapData.data.rounds.reduce(
      (filteredData, round, index) => {
        for (const [, team] of Object.entries(round.teams)) {
          for (const [, player] of Object.entries(team.players)) {
            if (
              selectedPlayers.some(
                (selectedPlayer) => selectedPlayer.name === player.name,
              )
            ) {
              const aggregatedStats: { [key: string]: number } = {};

              for (const character of Object.values(player.characters)) {
                if (character.stats) {
                  for (const [key, value] of Object.entries(character.stats)) {
                    const numericValue = parseFloat(value as string);
                    aggregatedStats[key] =
                      (aggregatedStats[key] || 0) + numericValue;
                  }
                }
              }

              if (
                Object.values(aggregatedStats).some((value) => !isNaN(value))
              ) {
                filteredData[player.name] = filteredData[player.name] || [];
                filteredData[player.name].push({
                  round: index,
                  stats: aggregatedStats,
                });
              }
            }
          }
        }
        return filteredData;
      },
      {} as { [key: string]: GraphDataStats[] },
    );

    const filteredDataGraph = filterStatsByKeys(filteredPlayersData);
    setDataGraph(filteredDataGraph);
  }, [mapData, selectedPlayers, selectedStats]);

  const filterStatsByKeys = (filteredPlayersData: {
    [key: string]: GraphDataStats[];
  }): { [key: string]: GraphDataStats[] } => {
    const result: { [key: string]: GraphDataStats[] } = {};

    for (const [playerName, statsByRound] of Object.entries(
      filteredPlayersData,
    )) {
      const filteredStatsByRound = statsByRound.map(({ round, stats }) => {
        const filteredStats: { [key: string]: number } = {};
        selectedStats.forEach((key) => {
          if (stats[key] !== undefined) {
            filteredStats[key] = stats[key];
          }
        });
        return { round, stats: filteredStats };
      });

      if (
        Object.values(filteredStatsByRound[0].stats).some(
          (value) => !isNaN(value),
        )
      ) {
        result[playerName] = filteredStatsByRound;
      }
    }

    return result;
  };

  const handlePlayersSelected = (players: Player[]) => {
    setSelectedPlayers(players);
  };

  const handleStatsSelected = (stats: string[]) => {
    setSelectedStats(stats);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ flex: 1, marginRight: "16px" }}>
        <PlayerList
          mapData={mapData}
          onPlayersSelected={handlePlayersSelected}
        />
      </div>
      <StatsList mapData={mapData} onStatsSelected={handleStatsSelected} />
      <div style={{ flex: 2 }}>
        {Object.keys(dataGraph).length > 0 && selectedStats.length > 0 && (
          <PlayerGraph data={dataGraph} selectedStats={selectedStats} />
        )}
      </div>
    </div>
  );
};

export default PlayerStatsGraph;
