// AnalysisDetailed.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mapsService } from "@/services/maps-service.ts";
import { useNavigate, useParams } from "react-router-dom";
import RoundList from "@/components/analysis/round/RoundList.tsx";
import MapGraph from "@/components/analysis/map/MapGraph.tsx";
import PlayerStatsGraph from "@/components/analysis/dynamicGraph/PlayerStatsGraph.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import PlayerList from "@/components/analysis/player/PlayerList.tsx";
import PlayerDetails from "@/components/analysis/player/PlayerDetails.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft } from "lucide-react";

export function AnalysisDetailed() {
  const [selectedRound, setSelectedRound] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const { mapId } = useParams();
  const navigate = useNavigate();

  const { data: map } = useQuery({
    queryKey: ["analysis", mapId],
    queryFn: () => mapsService.getMap(mapId),
  });

  const handleRoundClick = (round) => {
    setSelectedRound(round);
    setSelectedPlayer(null); // Reset selectedPlayer when a new round is clicked
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={"ghost"}
        className="w-fit pl-3"
        onClick={() => {
          navigate("/analysis");
        }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Analysis detailed</div>
      </div>

      {map && (
        <Tabs defaultValue="map">
          <TabsList className="w-[400px]">
            <TabsTrigger className="w-full" value="map">
              Map
            </TabsTrigger>
            <TabsTrigger className="w-full" value="rounds">
              Rounds
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="w-full h-[80vh] overflow-auto flex-col"
            value="map"
          >
            <MapGraph mapData={map} />
            <Separator className="my-4" />
            <PlayerStatsGraph mapData={map} />
          </TabsContent>
          <TabsContent value={"rounds"}>
            <div className="flex flex-col gap-4">
              <RoundList
                rounds={map.data.rounds}
                onRoundClick={handleRoundClick}
              />
              <Separator />
              {selectedRound && (
                <div className="flex max-w-full gap-4">
                  <PlayerList
                    teams={selectedRound.teams}
                    onPlayerClick={handlePlayerClick}
                  />
                  {selectedPlayer && (
                    <div className="flex-grow overflow-auto">
                      <PlayerDetails player={selectedPlayer} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
