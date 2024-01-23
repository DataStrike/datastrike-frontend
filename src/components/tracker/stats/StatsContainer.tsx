import { nbAvgGames, topPlayedMaps, winRate } from "@/utils/stats.ts";
import { Clock, KanbanSquare, MedalIcon, PercentIcon } from "lucide-react";
import StatsCard from "@/components/tracker/stats/StatsCard.tsx";
import { TrackerResult } from "@/models/tracker/columns.tsx";
import StatsCardList from "@/components/tracker/stats/StatsCardList.tsx";

interface Props {
  trackerResultList: TrackerResult[];
}

export function StatsContainer({ trackerResultList }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <StatsCard
          cardTitle="Win Rate"
          value={winRate(trackerResultList)}
          description="Win rate overall "
          icon={<PercentIcon className="h-4 w-4" />}
        ></StatsCard>
        <StatsCard
          cardTitle="Total Games"
          value={trackerResultList.length}
          description="Total games played"
          icon={<KanbanSquare className="h-4 w-4" />}
        ></StatsCard>
        <StatsCard
          cardTitle="Nb average games"
          value={nbAvgGames(trackerResultList)}
          description="Games per day"
          icon={<Clock className="h-4 w-4" />}
        ></StatsCard>
      </div>

      <div className="flex gap-4">
        <StatsCardList
          cardTitle="Top Played Maps"
          icon={<MedalIcon className="h-4 w-4" />}
          data={topPlayedMaps(trackerResultList, 5)}
        ></StatsCardList>
      </div>
    </div>
  );
}
