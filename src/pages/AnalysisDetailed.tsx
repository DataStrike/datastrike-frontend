// AnalysisDetailed.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mapsService } from "@/services/maps-service";
import { useNavigate, useParams } from "react-router-dom";
import RoundList from "@/components/analysis/round/RoundList";
import MapGraph from "@/components/analysis/map/MapGraph";
import PlayerStatsGraph from "@/components/analysis/dynamicGraph/PlayerStatsGraph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import PlayerList from "@/components/analysis/player/PlayerList";
import PlayerDetails from "@/components/analysis/player/PlayerDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Player, Round } from "@/models/analysis/analysismaps";

export function AnalysisDetailed() {
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { mapId } = useParams();
  const navigate = useNavigate();

  const { data: map } = useQuery({
    queryKey: ["analysis", mapId],
    queryFn: () => mapsService.getMap(mapId),
  });

  const handleRoundClick = (round: Round) => {
    setSelectedRound(round);
    setSelectedPlayer(null); // Reset selectedPlayer when a new round is clicked
  };

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      <Button
        variant="ghost"
        className="w-fit pl-3 -mb-2"
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
            className="w-full h-full overflow-auto flex-col"
            value="map"
          >
            <MapGraph mapData={map} />
            <Separator className="my-4" />
            <PlayerStatsGraph mapData={map} />
          </TabsContent>
          <TabsContent value="rounds">
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
