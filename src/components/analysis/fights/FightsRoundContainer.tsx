import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { secToMin } from "@/utils/functions.ts";
import { ArrowRight } from "lucide-react";
import kill from "@/assets/analysis/kill.svg";
import ultimate from "@/assets/analysis/ultimate.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import {
  FightMetaData,
  Fights,
  parseDescription,
} from "@/utils/analysis/timeline.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
interface Props {
  fights: Fights;
  index: number;
  fightsMetaData: FightMetaData[][];
}
export function FightsRoundContainer({ fights, index, fightsMetaData }: Props) {
  return (
    <>
      <h2 className="text-xl font-bold">Round {fights.roundNumber + 1}</h2>
      <div className="flex gap-4 flex-wrap" key={index}>
        {fights.fights.map((fight, i) => (
          <Card className={"h-fit"} key={i}>
            <CardHeader className="w-full px-4">
              <CardTitle className="w-full flex justify-between">
                <span className="flex items-center">
                  {secToMin(fight[0].timestamp)}s
                  <ArrowRight className="w-4 h-4 mx-2" />
                  {secToMin(fight[fight.length - 1].timestamp)}s
                </span>
                <div className="flex gap-4">
                  <span className="flex">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className={"cursor-default flex"}>
                          <img src={kill} className="w-6 h-6" alt={"kill"} />
                          {fightsMetaData[index][i].nbKills}
                        </TooltipTrigger>
                        <TooltipContent>Number of kills</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span className="flex">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className={"cursor-default flex"}>
                          <img
                            src={ultimate}
                            className="w-6 h-6 mr-1.5"
                            alt={"ultimate"}
                          />
                          {fightsMetaData[index][i].nbUltimates}
                        </TooltipTrigger>
                        <TooltipContent>Number of ultimates</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className={"pb-0"}>
              <Accordion className={"w-96"} type="single" collapsible>
                <AccordionItem
                  className={"border-b-0"}
                  value={"item-" + index}
                  key={"item-" + index}
                >
                  <AccordionTrigger>See more</AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player 1</TableHead>
                          <TableHead>Action</TableHead>
                          <TableHead>Player 2</TableHead>
                        </TableRow>
                      </TableHeader>
                      {fight.map((event) => (
                        <TableBody key={event.player}>
                          <TableRow>
                            <TableCell>
                              {parseDescription(event.description).player1}
                            </TableCell>
                            <TableCell>
                              {parseDescription(event.description).action}
                            </TableCell>
                            <TableCell>
                              {parseDescription(event.description).player2}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
