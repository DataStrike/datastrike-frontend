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
import { capitalize } from "@/utils/functions.ts";
import { StatsContainer } from "@/components/scouting/StatsContainer.tsx";

export function ScoutingPlayer() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  // State variables for dynamic gamemode and platform
  const [gamemode, setGamemode] = useState<GameMode | undefined>();
  const [platform, setPlatform] = useState<Platform | undefined>();

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

      <div className="flex gap-4">
        <div className="text-2xl font-semibold">
          <span>{playerId}</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Select
          value={gamemode || ""}
          onValueChange={(e) => setGamemode(e as GameMode)}
        >
          <SelectTrigger className="w-40">
            {gamemode || "All Gamemodes"}
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
            {platform || "All Platforms"}
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
            {playersStats?.general && (
              <div className={"flex flex-col gap-4"}>
                <StatsContainer stats={playersStats.general} />
              </div>
            )}
          </TabsContent>

          <TabsContent
            className="w-full h-full overflow-auto flex-col"
            value="heroes"
          >
            <div className="flex flex-col gap-2">
              {playersStats?.heroes &&
                Object.entries(playersStats.heroes).map(([hero, stats]) => (
                  <div key={hero} className={"flex flex-col gap-2"}>
                    <div className="font-bold"> {capitalize(hero)}</div>
                    <StatsContainer stats={stats} />
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent
            className="w-full h-full overflow-auto flex-col"
            value="roles"
          >
            <div className="flex flex-col gap-2">
              {playersStats?.roles &&
                Object.entries(playersStats.roles).map(([role, stats]) => (
                  <div key={role} className={"flex flex-col gap-2"}>
                    <div className="font-bold"> {capitalize(role)}</div>
                    <StatsContainer stats={stats} />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
