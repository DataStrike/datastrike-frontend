// StatsKeyList.tsx

import React, { useState } from "react";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";

interface StatsKeyListProps {
  mapData: AnalysisMap;
  onStatsSelected: (selectedStats: string[]) => void;
}

const StatsKeyList: React.FC<StatsKeyListProps> = ({
  mapData,
  onStatsSelected,
}) => {
  let statsKeys = {};
  let somethingAdded = false;

  const [selectedStats, setSelectedStats] = useState<string[]>([]);

  Object.values(mapData.data.rounds[0].teams).forEach((team) => {
    Object.values(team.players).forEach((player) => {
      Object.values(player.characters).forEach((character) => {
        if (
          character &&
          character.stats &&
          Object.keys(character.stats).length > 0
        ) {
          statsKeys = character.stats;
          somethingAdded = true;
        }
      });

      // If something was added, break out of the outer loop
      if (somethingAdded) {
        return;
      }
    });

    // If something was added, break out of the outer loop
    if (somethingAdded) {
      return;
    }
  });

  const handleStatsCheckboxChange = (statsKey: string) => {
    // Update selected stats
    const updatedSelectedStats = selectedStats.includes(statsKey)
      ? selectedStats.filter((key) => key !== statsKey)
      : [...selectedStats, statsKey];

    setSelectedStats(updatedSelectedStats);

    // console.info(updatedSelectedStats)

    onStatsSelected(updatedSelectedStats);
  };

  return (
    <div>
      <h2>Events list</h2>
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
};

export default StatsKeyList;
