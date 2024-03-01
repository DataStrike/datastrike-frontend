import { Data } from "@/models/analysis/analysismaps.ts";
import {
  detectFights,
  detectFirstDeaths,
  detectFirstKills,
  getFightMetaData,
  getKeyValuesInfos,
} from "@/utils/analysis/timeline.ts";
import { countOccurrences, flattenArray } from "@/utils/functions.ts";
import { FightsRoundContainer } from "@/components/analysis/fights/FightsRoundContainer.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { SkullIcon } from "lucide-react";
import kill from "@/assets/analysis/kill.svg";
interface Props {
  data: Data;
}

export function FightsContainer({ data }: Props) {
  const fightsData = detectFights(data, 10);
  const firstKillersNames = fightsData.map((fights) =>
    detectFirstKills(fights.fights),
  );
  const firstDeathsNames = fightsData.map((fights) =>
    detectFirstDeaths(fights.fights),
  );

  const fightsMetaData = fightsData.map((fights) =>
    fights.fights.map((fight) => getFightMetaData(fight)),
  );

  const firstKillers = getKeyValuesInfos(
    countOccurrences(flattenArray(firstKillersNames)),
  );

  const firstDeaths = getKeyValuesInfos(
    countOccurrences(flattenArray(firstDeathsNames)),
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 ">
        <FirstStatsCards
          firstKillers={firstKillers}
          firstDeaths={firstDeaths}
        />
        <div className="flex gap-4 w-full flex-wrap">
          {fightsData.map((fights, index) => (
            <div className={"flex flex-col gap-4"} key={index}>
              <FightsRoundContainer
                fights={fights}
                index={index}
                fightsMetaData={fightsMetaData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FirstStatsCardsProps {
  firstKillers: { key: string; value: number }[];
  firstDeaths: { key: string; value: number }[];
}
const FirstStatsCards = ({
  firstKillers,
  firstDeaths,
}: FirstStatsCardsProps) => {
  return (
    <div className={"flex gap-4"}>
      <Card className="w-fit h-fit">
        <CardHeader className="text-xl font-bold px-4 pr-2.5">
          <CardTitle>
            <div className="flex justify-between">
              <span className={"mr-8"}>1st killers</span>
              <img src={kill} className="w-6 h-6" alt={"kill"} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col">
          {firstKillers.map((player, index) => (
            <div className={"flex justify-between"} key={"player-" + index}>
              <p>{player.key}</p>
              <p>{player.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="w-fit h-fit">
        <CardHeader className="text-xl font-bold px-4 pr-2.5">
          <CardTitle>
            <div className="flex justify-between">
              <span className={"mr-8"}>1st deaths</span>
              <SkullIcon className="w-6 h-6" />
            </div>
          </CardTitle>{" "}
        </CardHeader>
        <CardContent className="flex flex-col">
          {firstDeaths.map((player, index) => (
            <div className={"flex justify-between"} key={"player-" + index}>
              <p>{player.key}</p>
              <p>{player.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
