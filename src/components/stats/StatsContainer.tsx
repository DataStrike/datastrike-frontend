import { nbAvgGames, winRate } from "@/utils/stats.ts";
import { Clock, KanbanSquare, PercentIcon } from "lucide-react";
import StatsCard from "@/components/stats/StatsCard.tsx";
import { TrackerResult } from "@/models/tracker/columns.tsx";

interface Props {
  trackerResultList: TrackerResult[];
}

export function StatsContainer({ trackerResultList }: Props) {
  return (
    <div className="flex gap-4">
      <StatsCard
        cardTitle="Win Rate"
        value={winRate(trackerResultList)}
        description="Win rate overall "
      >
        <PercentIcon className="h-4 w-4" />
      </StatsCard>
      <StatsCard
        cardTitle="Total Games"
        value={trackerResultList.length}
        description="Total games played"
      >
        <KanbanSquare className="h-4 w-4" />
      </StatsCard>
      <StatsCard
        cardTitle="Nb average games"
        value={nbAvgGames(trackerResultList)}
        description="Games per day"
      >
        <Clock className="h-4 w-4" />
      </StatsCard>
    </div>
  );
}
