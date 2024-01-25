import { useNavigate, useParams } from "react-router-dom";
import {
  GameMode,
  Platform,
  scoutingService,
} from "@/services/scouting-service.ts";
import { ArrowLeft, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select.tsx";
import errorMessage from "@/components/ui/errorMessage.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import PlayerStatsChart from "@/components/scouting/charts/PlayerStatsChart.tsx";

export function ScoutingPlayer() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  // State variables for dynamic gamemode and platform
  const [gamemode, setGamemode] = useState<
    "competitive" | "quickplay" | undefined
  >();
  const [platform, setPlatform] = useState<"pc" | "console" | undefined>();

  const {
    data: playersStats,
    isFetching: playersStatsLoading,
    error,
  } = useQuery({
    queryKey: ["players", playerId, gamemode, platform], // Include gamemode and platform in the query key
    queryFn: () =>
      scoutingService.getPlayerStats(playerId!, { gamemode, platform }),
  });

  const resetFilters = () => {
    setGamemode(undefined);
    setPlatform(undefined);
  };

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

      <div className="flex gap-2 items-center">
        <span>{playerId}</span>
        <Select
          value={gamemode || ""}
          onValueChange={(e) => setGamemode(e as GameMode)}
        >
          <SelectTrigger className="w-40">
            {gamemode || "Select Gamemode"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="competitive">Competitive</SelectItem>
            <SelectItem value="quickplay">Quickplay</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={platform || ""}
          onValueChange={(e) => setPlatform(e as Platform)}
        >
          <SelectTrigger className="w-40">
            {platform || "Select Platform"}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pc">PC</SelectItem>
            <SelectItem value="console">Console</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={resetFilters}>
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>

      {playersStatsLoading && (
        <>
          <Skeleton className={"w-80 h-10"} />
        </>
      )}
      {error && <>{errorMessage(error.message)}</>}
      {!playersStatsLoading && !error && (
        <Tabs defaultValue="general">
          <TabsList className="w-[400px]">
            <TabsTrigger className="w-full" value="general">
              General
            </TabsTrigger>
            <TabsTrigger className="w-full" value="heroes">
              Heroes
            </TabsTrigger>
            <TabsTrigger className="w-full" value="roles">
              Roles
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="w-full h-full overflow-auto flex-col"
            value="general"
          >
            <PlayerStatsChart data={playersStats.general} />
            {playersStats?.general && (
              <pre>{JSON.stringify(playersStats.general, null, 2)}</pre>
            )}
          </TabsContent>

          <TabsContent
            className="w-full h-full overflow-auto flex-col"
            value="heroes"
          >
            {playersStats?.heroes && (
              <pre>{JSON.stringify(playersStats.heroes, null, 2)}</pre>
            )}
          </TabsContent>
          <TabsContent
            className="w-full h-full overflow-auto flex-col"
            value="roles"
          >
            {playersStats?.roles && (
              <pre>{JSON.stringify(playersStats.roles, null, 2)}</pre>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
