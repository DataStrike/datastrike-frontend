// StatsKeyList.tsx

import React, { useState } from "react";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { capitalize } from "@/utils/functions.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

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
    <Card className="w-fit max-h-full overflow-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
        <CardTitle>Stats list</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        <ul>
          {Object.keys(statsKeys).map((key) => (
            <li key={key}>
              <Checkbox
                id={key}
                checked={selectedStats.includes(key)}
                onClick={() => handleStatsCheckboxChange(key)}
              />
              <label htmlFor={key}>{capitalize(key)}</label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default StatsKeyList;
