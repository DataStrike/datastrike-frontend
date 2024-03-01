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
interface Props {
  data: Data;
}

export function FightsContainer({ data }: Props) {
  const fights = detectFights(data, 10);
  const firstKillers = detectFirstKills(fights);
  const firstDeaths = detectFirstDeaths(fights);

  const fightsMetaData = fights.map((fight) => getFightMetaData(fight));

  /*const playerNames = Object.values(mapData.data.rounds[0].teams).map((team) =>
    Object.values(team.players).map((player) => player.name),
  );*/

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold">Fights</h2>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-2 w-full flex-wrap">
          {fights.map((fight, index) => (
            <Card className={"h-fit"} key={index}>
              <CardHeader className="w-full px-4">
                <CardTitle className="w-full flex justify-between">
                  <span>Fight {index}</span>
                  <div className="flex gap-4">
                    <span className="flex">
                      <img src={kill} className="w-6 h-6" alt={"kill"} />
                      {fightsMetaData[index].nbKills}
                    </span>
                    <span className="flex">
                      <img
                        src={ultimate}
                        className="w-6 h-6 mr-1.5"
                        alt={"ultimate"}
                      />
                      {fightsMetaData[index].nbUltimates}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                              {parseDescription(event.description).player1}
                            </span>
                            <span>
                              {parseDescription(event.description).action}
                            </span>
                            <span>
                              {parseDescription(event.description).player2}
                            </span>
                            <span>
                              {parseDescription(event.description).keyword}
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

        <div className="flex gap-4">
          <div>
            <h2 className="text-xl font-bold">First Killers</h2>
            <div>
              {firstKillers.map((player, index) => (
                <p key={index}>{player}</p>
              ))}
            </div>
          </div>
          <Separator orientation={"vertical"} />
          <div>
            <h2 className="text-xl font-bold">First Deaths</h2>
            <div>
              {firstDeaths.map((player, index) => (
                <p key={index}>{player}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
