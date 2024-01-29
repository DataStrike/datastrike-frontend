// PlayerDetails.tsx
import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Character, Player } from "@/models/analysis/analysismaps";

interface PlayerDetailsProps {
  player: Player;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player }) => {
  const statKeys = useMemo(() => {
    const keysSet = new Set<string>();
    Object.values(player.characters).forEach((character: Character) => {
      Object.keys(character.stats).forEach((key) => keysSet.add(key));
    });
    return Array.from(keysSet);
  }, [player]);

  const statValues = useMemo(() => {
    const valuesMap: { [key: string]: number[] } = {};
    statKeys.forEach((key) => {
      valuesMap[key] = [];
    });

    Object.values(player.characters).forEach((character: Character) => {
      Object.entries(character.stats).forEach(([key, value]) => {
        valuesMap[key].push(value ?? 0);
      });
    });

    return valuesMap;
  }, [player, statKeys]);

  return (
    <div className="bg-white p-4 rounded flex flex-col gap-2">
      <h2 className="text-lg font-bold mb-4">Player Details</h2>
      <ScrollArea className="whitespace-nowrap rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border px-4 py-2">Character</TableHead>
              {statKeys.map((statKey) => (
                <TableHead key={statKey} className="border px-4 py-2">
                  {statKey}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(player.characters).map(([charKey, character]) => {
              // Check if the character scouting are not empty
              const statsNotEmpty = Object.values(character.stats).some(
                (value) => value !== null && value !== undefined,
              );

              // If scouting are not empty, display the row
              if (statsNotEmpty) {
                return (
                  <TableRow className="overflow-auto" key={charKey}>
                    <TableCell className="border px-4 py-2">
                      {charKey}
                    </TableCell>
                    {statKeys.map((statKey) => (
                      <TableCell key={statKey} className="border px-4 py-2">
                        {statValues[statKey].shift()}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              }

              // Otherwise, return null to skip creating the row
              return null;
            })}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PlayerDetails;
