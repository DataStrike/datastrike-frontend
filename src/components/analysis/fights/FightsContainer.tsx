import { Data } from "@/models/analysis/analysismaps.ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {
  detectFights,
  detectFirstDeaths,
  detectFirstKills,
  getFightMetaData,
  parseDescription,
  getKeyValuesInfos,
} from "@/utils/analysis/timeline.ts";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import kill from "@/assets/analysis/kill.svg";
import ultimate from "@/assets/analysis/ultimate.svg";
import { countOccurrences, flattenArray, secToMin } from "@/utils/functions.ts";
import { ArrowRight } from "lucide-react";
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
        <div className="flex gap-4">
          <div>
            <h2 className="text-xl font-bold">First Killers</h2>
            <div>
              {firstKillers.map((player, index) => (
                <div className={"flex justify-between"} key={"player-" + index}>
                  <p>{player.key}</p>
                  <p>{player.value}</p>
                </div>
              ))}
            </div>
          </div>
          <Separator orientation={"vertical"} />
          <div>
            <h2 className="text-xl font-bold">First Deaths</h2>
            <div>
              {firstDeaths.map((player, index) => (
                <div className={"flex justify-between"} key={"player-" + index}>
                  <p>{player.key}</p>
                  <p>{player.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex gap-4 w-full flex-wrap">
          {fightsData.map((fights, index) => (
            <div className={"flex flex-col gap-4"} key={index}>
              <h2 className="text-xl font-bold">
                Round {fights.roundNumber + 1}
              </h2>
              <div className="flex gap-4 flex-wrap" key={index}>
                {fights.fights.map((fight, j) => (
                  <Card className={"h-fit"} key={j}>
                    <CardHeader className="w-full px-4">
                      <CardTitle className="w-full flex justify-between">
                        <span className="flex items-center">
                          {secToMin(fight[0].timestamp)}s
                          <ArrowRight className="w-4 h-4 mx-2" />
                          {secToMin(fight[fight.length - 1].timestamp)}s
                        </span>
                        <div className="flex gap-4">
                          <span className="flex">
                            <img src={kill} className="w-6 h-6" alt={"kill"} />
                            {fightsMetaData[index][j].nbKills}
                          </span>
                          <span className="flex">
                            <img
                              src={ultimate}
                              className="w-6 h-6 mr-1.5"
                              alt={"ultimate"}
                            />
                            {fightsMetaData[index][j].nbUltimates}
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={"pb-0"}>
                      <Accordion className={"w-80"} type="single" collapsible>
                        <AccordionItem
                          className={"border-b-0"}
                          value={"item-" + index}
                          key={index}
                        >
                          <AccordionTrigger>Details</AccordionTrigger>
                          <AccordionContent>
                            {fight.map((event, index) => (
                              <div key={index}>
                                <div className="flex gap-2">
                                  <span>
                                    {
                                      parseDescription(event.description)
                                        .player1
                                    }
                                  </span>
                                  <span>
                                    {parseDescription(event.description).action}
                                  </span>
                                  <span>
                                    {
                                      parseDescription(event.description)
                                        .player2
                                    }
                                  </span>
                                  <span>
                                    {
                                      parseDescription(event.description)
                                        .keyword
                                    }
                                  </span>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
