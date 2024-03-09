import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";

import default_person from "@/assets/default_person.svg";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
export function Team() {
  const navigate = useNavigate();

  const { teamId } = useParams();

  const { data: teamStats, isFetching: teamStatsLoading } = useQuery({
    queryKey: ["teams", teamId],
    queryFn: () => faceitScoutingService.getTeamStats(teamId!),
  });
  return (
    <div>
      {teamStatsLoading && <div>Loading...</div>}
      {!teamStatsLoading && teamStats && (
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
            <img
              src={teamStats.avatar}
              alt="team avatar"
              className="h-48 w-48"
            />
            <h1 className="text-3xl">{teamStats.name}</h1>
          </div>
          <div className="flex gap-4 flex-wrap">
            {teamStats.members.map((player) => (
              <div
                key={player.user_id}
                onClick={() =>
                  navigate(`/scouting/faceit/players/${player.user_id}`)
                }
              >
                <h3>{player.nickname}</h3>
                {player.avatar && (
                  <img
                    src={player.avatar}
                    alt="player avatar"
                    className="w-24 h-24"
                  />
                )}
                {!player.avatar && (
                  <img
                    src={default_person}
                    alt="player avatar"
                    className="w-24 h-24 bg-neutral-300"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
