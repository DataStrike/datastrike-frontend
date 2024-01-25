import StatsCard from "@/components/tracker/stats/StatsCard.tsx";
import {
  Clock,
  GamepadIcon,
  KanbanSquareDashedIcon,
  PercentIcon,
} from "lucide-react";
import StatsCardList from "@/components/tracker/stats/StatsCardList.tsx";
import { Data } from "@/models/scouting/models.ts";

interface Props {
  stats: Data;
}
export function StatsContainer({ stats }: Props) {
  return (
    <div className="flex flex-col w-fit gap-2">
      <div className={"flex gap-2"}>
        <StatsCard
          cardTitle={"Games"}
          value={stats.games_played}
          icon={<GamepadIcon className="h-4 w-4" />}
        />
        <StatsCard
          cardTitle={"Time played"}
          value={(stats.time_played / 3600).toFixed(2) + "h"}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          cardTitle={"Winrate"}
          value={stats.winrate + "%"}
          icon={<PercentIcon className="h-4 w-4" />}
        />
        <StatsCard
          cardTitle={"KDA"}
          value={stats.kda}
          icon={<KanbanSquareDashedIcon className="h-4 w-4" />}
        />
      </div>
      <div className={"flex justify-between gap-2"}>
        <StatsCardList cardTitle={"Total"} data={Object.entries(stats.total)} />
        <StatsCardList
          cardTitle={"Average"}
          data={Object.entries(stats.average)}
        />
      </div>
    </div>
  );
}
