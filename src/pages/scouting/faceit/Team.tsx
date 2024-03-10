import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";

import default_person from "@/assets/default_person.svg";
import default_team from "@/assets/default_team.svg";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { SegmentStats } from "@/models/scouting/faceit/team_stats.ts";
export function Team() {
  const navigate = useNavigate();

  const { teamId } = useParams();

  const order: (keyof SegmentStats)[] = [
    "Matches",
    "Wins",
    "Win rate %",
    "Team Total Eliminations",
    "Team Total Deaths",
    "Team Average K/D Ratio",
  ];

  const { data: teamDetails, isFetching: teamDetailsLoading } = useQuery({
    queryKey: ["teamDetails", teamId],
    queryFn: () => faceitScoutingService.getTeamDetails(teamId!),
  });

  const { data: teamStats, isFetching: teamStatsLoading } = useQuery({
    queryKey: ["teamStats", teamId],
    queryFn: () => faceitScoutingService.getTeamStats(teamId!),
  });
  return (
    <div>
      {!teamDetailsLoading && teamDetails && (
        <>
          <Button
            variant="ghost"
            className="w-fit pl-3 mb-2"
            onClick={() => {
              navigate("/scouting");
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-4 mb-8">
            {teamDetails.avatar && (
              <img
                src={teamDetails.avatar}
                alt="team avatar"
                className="h-32 w-32 rounded-lg"
              />
            )}
            {!teamDetails.avatar && (
              <img src={default_team} alt="team avatar" className="h-32 w-32" />
            )}
            <div className={"flex flex-col justify-between"}>
              <h1 className="text-3xl">{teamDetails.name}</h1>
              {!teamStatsLoading && teamStats && (
                <div className="flex flex-col text-xl">
                  <div>{teamStats.lifetime.Wins} W</div>
                  <div>
                    {Number(teamStats.lifetime.Matches) -
                      Number(teamStats.lifetime.Wins)}{" "}
                    L
                  </div>
                  <div>WR: {teamStats.lifetime["Win rate %"]}%</div>
                </div>
              )}
            </div>
          </div>
          <div className="text-2xl font-bold mb-2">Members</div>
          <div className="flex gap-4 flex-wrap mb-6">
            {teamDetails.members
              .sort((a, b) => a.nickname.localeCompare(b.nickname))
              .map((player) => (
                <div
                  key={player.user_id}
                  onClick={() =>
                    navigate(`/scouting/faceit/players/${player.user_id}`)
                  }
                >
                  <PlayerCard player={player} />
                </div>
              ))}
          </div>
        </>
      )}
      <div className="text-2xl font-bold mb-2">Stats</div>
      {!teamStatsLoading && teamStats && (
        <div className={"flex gap-4 flex-wrap"}>
          {teamStats.segments
            .sort(
              (a, b) => parseInt(b.stats.Matches) - parseInt(a.stats.Matches),
            )
            .map((segment) => (
              <Card key={segment.label} className="w-72">
                <CardHeader>
                  <CardTitle>{segment.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {order.map((key) => (
                      <div key={key} className="flex justify-between">
                        <div>{key}</div>
                        <div>{segment.stats[key]}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

const PlayerCard = ({ player }: { player: any }) => {
  return (
    <div className="px-4 pb-2 rounded-lg shadow transition-all hover:shadow-xl hover:cursor-pointer">
      {player.avatar && (
        <img
          src={player.avatar}
          alt="player avatar"
          className="h-32 w-32 rounded-lg"
        />
      )}
      {!player.avatar && (
        <img src={default_person} alt="player avatar" className="h-32 w-32" />
      )}
      <h1>{player.nickname}</h1>
    </div>
  );
};
