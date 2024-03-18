import {
  nbAvgGames,
  topPlayedMaps,
  winRate,
  winRateAllMaps,
  winRateAllModes,
  winRateOpponents,
  winRateTopMaps,
} from "@/utils/stats.ts";
import { Clock, KanbanSquare, MedalIcon, PercentIcon } from "lucide-react";
import StatsCard from "@/components/stats/StatsCard.tsx";
import { TrackerResult } from "@/models/tracker/columns.tsx";
import StatsCardList from "@/components/stats/StatsCardList.tsx";

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
          cardTitle="WR / Modes"
          icon={<MedalIcon className="h-4 w-4" />}
          data={winRateAllModes(trackerResultList)}
          description={"Sorted by nb of games played in each mode"}
        ></StatsCardList>
        <StatsCardList
          cardTitle="WR / Teams"
          icon={<MedalIcon className="h-4 w-4" />}
          data={winRateOpponents(trackerResultList)}
          description={"Sorted by nb of games played against them"}
        ></StatsCardList>
      </div>

      <div className="flex gap-4">
        <StatsCardList
          cardTitle="Top Played Maps"
          icon={<MedalIcon className="h-4 w-4" />}
          data={topPlayedMaps(trackerResultList, 5)}
          description={"Sorted by nb of games played"}
        ></StatsCardList>
        <StatsCardList
          cardTitle="WR / Top Played Maps"
          icon={<MedalIcon className="h-4 w-4" />}
          data={winRateTopMaps(trackerResultList)}
          description={"Sorted by nb of games played"}
        ></StatsCardList>
        <StatsCardList
          cardTitle="WR / All Maps"
          icon={<MedalIcon className="h-4 w-4" />}
          data={winRateAllMaps(trackerResultList)}
          description={"Sorted by nb of games played on each map"}
        ></StatsCardList>
      </div>

      <div className="flex gap-4"></div>
    </div>
  );
}
