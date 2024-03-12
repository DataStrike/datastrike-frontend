import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
  cardTitle: string;
}

export function ChartContainer({ children, cardTitle }: Props) {
  return (
    <Card className="w-fit h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
        <CardTitle className="text-md mr-12">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent className="h-fit">
        <Fragment>{children}</Fragment>
      </CardContent>
    </Card>
  );
}

export default ChartContainer;
