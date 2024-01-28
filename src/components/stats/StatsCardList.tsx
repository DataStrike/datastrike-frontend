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
  data: [string, number][];
}

export function StatsCardList({ icon, cardTitle, data }: StatsCardListProps) {
  return (
    <Card className="w-72">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 p-4">
        <CardTitle className="text-sm font-medium mr-12">{cardTitle}</CardTitle>
        {icon && <>{icon}</>}
      </CardHeader>
      <CardContent>
        {data &&
          data.map((item) => (
            <>
              <div className="flex w-full justify-between font-bold">
                <div className="mr-6">{capitalize(item[0])}:</div>
                <div>{item[1]}</div>
              </div>
            </>
          ))}
      </CardContent>
    </Card>
  );
}

export default StatsCardList;
