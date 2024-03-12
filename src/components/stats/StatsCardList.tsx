import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { capitalize } from "@/utils/functions.ts";
interface StatsCardListProps {
  icon?: ReactNode;
  cardTitle: string;
  data:
    | [string, number][]
    | string[][]
    | [string, string, number][]
    | (string | number)[][];
  description?: string;
}

export function StatsCardList({
  icon,
  cardTitle,
  data,
  description,
}: StatsCardListProps) {
  return (
    <Card className="w-fit h-fit max-h-64 overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 p-4">
        <CardTitle className="text-sm font-medium mr-12">{cardTitle}</CardTitle>
        {icon && <>{icon}</>}
      </CardHeader>
      <CardContent>
        {data &&
          data.map((item, key) => (
            <div key={key}>
              <div className="flex w-full justify-between">
                <div className="mr-6 font-bold">
                  {capitalize(item[0] as string)}
                </div>
                <div className="flex gap-2">
                  {item[2] && <span> {item[2]} played |</span>}
                  <span> {item[1]}</span>
                </div>
              </div>
            </div>
          ))}
        <p className="text-xs text-muted-foreground mt-4">{description}</p>
      </CardContent>
    </Card>
  );
}

export default StatsCardList;
