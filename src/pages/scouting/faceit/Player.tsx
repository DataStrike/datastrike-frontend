import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";

export function ScoutingTeam() {
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
              <div key={player.user_id}>
                <h3>{player.nickname}</h3>
                {player.avatar && (
                  <img
                    src={player.avatar}
                    alt="player avatar"
                    className="w-24 h-24"
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
