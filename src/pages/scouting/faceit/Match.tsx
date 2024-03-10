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
import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
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
    if (matchDetails && !matchDetailsLoading) {
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
  const {
    data: matchStatsData,
    isFetching: matchStatsLoading,
    error: matchStatsError,
  } = useQuery({
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
      <div className="flex flex-col gap-8">
        {!matchDetailsLoading && matchDetails && !matchStatsError && (
          <div className={"flex flex-col gap-4 lg:flex-row"}>
            <div className="flex flex-col gap-2">
              <Card className="h-fit w-fit">
                <CardHeader>
                  <div className="flex flex-col text-center mb-1 text-neutral-500">
                    <div className="text-2xl font-bold text-black">
                      {matchDetails.teams.faction1.name} vs{" "}
                      {matchDetails.teams.faction2.name}
                    </div>
                    <span>{matchDetails.competition_name}</span>
                    <span> {getCETTimeFormatted(matchDetails.started_at)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="flex gap-4 items-center justify-between">
                      <img
                        src={team1avatar}
                        alt="team 1 avatar"
                        className="h-24 w-24 rounded-lg"
                      />
                      <div className="text-3xl inline-flex left-0 right-0">
                        <div>{matchDetails.results.score["faction1"]}</div>
                        <span>-</span>
                        <div>{matchDetails.results.score["faction2"]}</div>
                      </div>
                      <img
                        src={team2avatar}
                        alt="team 2 avatar"
                        className="h-24 w-24 rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-2 justify-center w-fit">
              {maps.map(
                (map, i) =>
                  detailedResults.length > i && (
                    <Card key={i} className={"p-0"}>
                      <CardContent className="flex gap-2 pb-0 pl-0 items-center">
                        <div className="relative">
                          <img
                            src={map.image_lg}
                            alt="map"
                            className="h-32 brightness-[35%] rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-3xl">
                            {map.name}
                          </div>
                        </div>
                        <div className="flex gap-4 justify-center items-center ml-8">
                          <img
                            src={team1avatar}
                            alt="team 1 avatar"
                            className="h-20 w-20 rounded-lg"
                          />
                          <MapRow
                            map={map}
                            detailedResults={detailedResults}
                            index={i}
                          />
                          <img
                            src={team2avatar}
                            alt="team 2 avatar"
                            className="h-20 w-20 rounded-lg"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ),
              )}
            </div>
          </div>
        )}
        <div>
          <div className="flex flex-grow gap-2">
            {!matchStatsLoading && matchStatsData && !matchStatsError && (
              <Tabs defaultValue={"0"} className="max-w-[1000px]">
                <TabsList className="w-[600px]">
                  {matchStatsData.rounds.map((map, i) => {
                    return (
                      <TabsTrigger
                        className="w-full"
                        value={i.toString()}
                        key={i}
                      >
                        {getMapFromPick(map.round_stats.Map) ? (
                          <div>{getMapFromPick(map.round_stats.Map)?.name}</div>
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
                        <>
                          <div className="text-xl font-bold">
                            {matchDetails &&
                              matchDetails.teams[`faction${teamIndex + 1}`]
                                .name}
                          </div>
                          <Table key={teamIndex}>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Nickname</TableHead>
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
                                    {statOrder.map((stat, index) => (
                                      <TableCell key={index}>
                                        {player.player_stats[stat]}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </>
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
