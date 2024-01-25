import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scoutingService } from "@/services/scouting-service.ts";
import { HeroStats, PlayerData } from "@/models/stats/models.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function ScoutingPlayer() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const { playerId } = useParams();
  const navigate = useNavigate();

  const getPlayerSummary = async (playerId: string) => {
    try {
      const data: PlayerData = await scoutingService.getPlayerStats(playerId);
      setPlayerData(data);
    } catch (error) {
      console.error("Error fetching player scouting:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (playerId) {
        await getPlayerSummary(playerId);
      }
    };

    fetchData();
  }, [playerId]);

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        className="w-fit pl-3 -mb-2"
        onClick={() => {
          navigate("/scouting");
        }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Player stats</div>
      </div>

      <div className="flex gap-2 w-full">
        {/* Display hero-specific scouting */}
        {playerData?.heroes && (
          <HeroStatsContainer heroData={playerData.heroes || {}} />
        )}
      </div>
    </div>
  );
}

interface HeroStatsContainerProps {
  heroData: Record<string, HeroStats>;
}

const HeroStatsContainer: React.FC<HeroStatsContainerProps> = ({
  heroData,
}) => {
  // Extract column keys dynamically from the HeroStats type
  const columnKeys = Object.keys(heroData[Object.keys(heroData)[0]]).map(
    (key) => key as keyof HeroStats,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Hero</TableCell>
          {columnKeys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(heroData).map(([heroName, heroStats]) => (
          <HeroStatsRow
            key={heroName}
            heroName={heroName}
            heroStats={heroStats}
            columnKeys={columnKeys}
          />
        ))}
      </TableBody>
    </Table>
  );
};

interface HeroStatsRowProps {
  heroName: string;
  heroStats: HeroStats;
  columnKeys: (keyof HeroStats)[];
}

const HeroStatsRow: React.FC<HeroStatsRowProps> = ({
  heroName,
  heroStats,
  columnKeys,
}) => (
  <TableRow>
    <TableCell>{heroName}</TableCell>
    {columnKeys.map((key) => (
      <TableCell key={key}>
        {key.includes(".")
          ? getObjectValue(heroStats, key)
          : renderValue(heroStats[key])}
      </TableCell>
    ))}
  </TableRow>
);

// Helper function to get nested object value
const getObjectValue = (obj: any, path: string) => {
  const pathArray = path.split(".");
  let value = obj;
  for (const key of pathArray) {
    value = value[key];
  }
  return value;
};

// Helper function to render a value (convert object to string)
const renderValue = (value: any) => {
  if (typeof value === "object") {
    return JSON.stringify(value);
  }
  return String(value);
};
