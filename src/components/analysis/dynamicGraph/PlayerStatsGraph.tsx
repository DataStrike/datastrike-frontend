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

    const filteredData = filterDataByPlayersAndStats(
      mapData.data.stats_graph,
      selectedPlayers.map((player) => player.name),
      selectedStats
    );
   
    setDataGraph(filteredData);
  }, [mapData, selectedPlayers, selectedStats]);

  const filterDataByPlayersAndStats = (
    data: { [playerName: string]: GraphDataStats[] },
    selectedPlayers: string[],
    selectedStats: string[]
  ): { [playerName: string]: GraphDataStats[] } => {
    const result: { [playerName: string]: GraphDataStats[] } = {};

    for (const [playerName, statsByRound] of Object.entries(data)) {
      if (selectedPlayers.includes(playerName)) {
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
            (value) => !isNaN(value)
          )
        ) {
          result[playerName] = filteredStatsByRound;
        }
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
    <div className="flex gap-4">
      <div className="flex gap-2">
        <PlayerList
          mapData={mapData}
          onPlayersSelected={handlePlayersSelected}
        />
        <StatsList mapData={mapData} onStatsSelected={handleStatsSelected} />
      </div>

      <div className="flex-1 pr-4">
        {Object.keys(dataGraph).length > 0 && selectedStats.length > 0 && (
          <PlayerGraph data={dataGraph} selectedStats={selectedStats} />
        )}
      </div>
    </div>
  );
};

export default PlayerStatsGraph;
