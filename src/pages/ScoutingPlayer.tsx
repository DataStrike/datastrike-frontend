import { useNavigate, useParams } from "react-router-dom";
import { scoutingService } from "@/services/scouting-service.ts";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useQuery } from "@tanstack/react-query";

export function ScoutingPlayer() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const { data: playersStats, isFetching: playersStatsLoading } = useQuery({
    queryKey: ["players", playerId],
    queryFn: () => scoutingService.getPlayerStats(playerId!),
  });

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

      {playersStatsLoading && <div>Loading...</div>}
      {!playersStatsLoading && (
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
