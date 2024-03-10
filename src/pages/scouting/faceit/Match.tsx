import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { getCETTimeFormatted } from "@/utils/functions.ts";
import { useEffect, useState } from "react";

import default_team from "@/assets/default_team.svg";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { PlayerStats } from "@/models/scouting/faceit/matchstats.ts";
interface Map {
  name: string;
  image_lg: string;
}

interface MatchDetails {
  faction1: number;
  faction2: number;
}
export function Match() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const statOrder: (keyof PlayerStats)[] = [
    "Role",
    "Eliminations",
    "Deaths",
    "Assists",
    "K/D Ratio",
    "Damage Dealt",
    "Damage Mitigated",
    "Healing Done",
  ];

  const getMapFromPick = (pick: string) => {
    if (!matchDetails) return;
    return matchDetails.voting.map.entities.find((map) => map.guid === pick)!;
  };

  // MAPS DETAILS
  const [maps, setMaps] = useState<Map[]>([]);
  const [detailedResults, setDetailedResults] = useState<MatchDetails[]>([]);
  const [team1avatar, setTeam1Avatar] = useState<string>(default_team);
  const [team2avatar, setTeam2Avatar] = useState<string>(default_team);

  const { data: matchDetails, isFetching: matchDetailsLoading } = useQuery({
    queryKey: ["matchDetails", matchId],
    queryFn: () => faceitScoutingService.getFaceitMatchDetails(matchId!),
  });

  useEffect(() => {
    if (matchDetails) {
      const picks = matchDetails.voting.map.pick;
      const maps = picks.map((pick: string) => {
        return matchDetails.voting.map.entities.find(
          (map) => map.guid === pick,
        )!;
      });
      const detailedResults = matchDetails.detailed_results.map((result) => {
        return {
          faction1: result.factions.faction1.score,
          faction2: result.factions.faction2.score,
        };
      });

      setTeam1Avatar(matchDetails.teams.faction1.avatar);
      setTeam2Avatar(matchDetails.teams.faction2.avatar);
      setDetailedResults(detailedResults);
      setMaps(maps);
    }
  }, [matchDetails]);

  // MAPS STATS
  const { data: matchStatsData, isFetching: matchStatsLoading } = useQuery({
    queryKey: ["matchStats", matchId],
    queryFn: () => faceitScoutingService.getFaceitMatchStats(matchId!),
  });

  return (
    <div>
      <Button
        variant="ghost"
        className="w-fit pl-3 mb-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
      {matchDetailsLoading && <div>Loading...</div>}
      <div className="flex gap-2">
        {!matchDetailsLoading && matchDetails && (
          <div className="w-64 h-fit border p-4 rounded-lg">
            <div>{matchDetails.competition_name}</div>
            <div>{getCETTimeFormatted(matchDetails.started_at)}</div>
            <div className={"flex flex-col gap-2 justify-center items-center"}>
              {maps.map((map, i) => {
                return (
                  <div
                    className="flex gap-4 justify-center items-center"
                    key={i}
                  >
                    <div className="flex flex-col gap-2">
                      {
                        <img
                          src={team1avatar}
                          alt={"team 1 avatar"}
                          className="h-12 w-12"
                        />
                      }
                    </div>
                    <MapRow
                      map={map}
                      detailedResults={detailedResults}
                      index={i}
                    />
                    <div className="flex flex-col gap-2">
                      {
                        <img
                          src={team2avatar}
                          alt={"team 2 avatar"}
                          className="h-12 w-12"
                        />
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <div>
            {matchStatsLoading && <div>Loading...</div>}
            <div className="flex flex-grow gap-2">
              {!matchStatsLoading && matchStatsData && (
                <Tabs defaultValue={"0"} className="grow">
                  <TabsList className="w-[600px]">
                    {matchStatsData.rounds.map((map, i) => {
                      return (
                        <TabsTrigger className="w-full" value={i.toString()}>
                          {getMapFromPick(map.round_stats.Map) ? (
                            <div>
                              {getMapFromPick(map.round_stats.Map)?.name}
                            </div>
                          ) : (
                            <div>Unknown map</div>
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  {matchStatsData.rounds.map((map, i) => {
                    return (
                      <TabsContent value={i.toString()} key={i}>
                        {map.teams.map((team, teamIndex) => (
                          <Table key={teamIndex}>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nickname</TableHead>
                                {/* Map over the statOrder array to ensure the stats are rendered in the desired order */}
                                {statOrder.map((stat, index) => (
                                  <TableHead key={index}>{stat}</TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {team.players
                                .sort((a, b) => {
                                  const roleOrder = {
                                    Tank: 0,
                                    Damage: 1,
                                    Support: 2,
                                  };

                                  return (
                                    roleOrder[a.player_stats.Role] -
                                    roleOrder[b.player_stats.Role]
                                  );
                                })
                                .map((player) => (
                                  <TableRow key={player.player_id}>
                                    <TableCell>{player.nickname}</TableCell>
                                    {/* Map over the statOrder array to ensure the stats are rendered in the desired order */}
                                    {statOrder.map((stat, index) => (
                                      <TableCell key={index}>
                                        {player.player_stats[stat]}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        ))}
                      </TabsContent>
                    );
                  })}
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MapRowProps {
  map: Map;
  detailedResults: MatchDetails[];
  index: number;
}
const MapRow = ({ map, detailedResults, index }: MapRowProps) => {
  return (
    <div className="flex justify-center">
      {detailedResults.length > index && (
        <div className="w-full" key={map.name}>
          <div className="text-3xl inline-flex left-0 right-0">
            <div>{detailedResults[index].faction1}</div>
            <span>-</span>
            <div>{detailedResults[index].faction2}</div>
          </div>
        </div>
      )}
    </div>
  );
};
