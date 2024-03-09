import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { faceitScoutingService } from "@/services/scouting-service.ts";

export function Match() {
  const { matchId } = useParams();

  const { data: matchStats, isFetching: matchStatsLoading } = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => faceitScoutingService.getFaceitMatchStats(matchId!),
  });
  return (
    <div>
      {matchStatsLoading && <div>Loading...</div>}
      {!matchStatsLoading && matchStats && (
        <>
          <pre>{JSON.stringify(matchStats, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
