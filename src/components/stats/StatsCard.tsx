import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface Props {
  icon?: ReactNode;
  cardTitle: string;
  value?: string | number;
  description?: string;
}

export function StatsCard({ icon, cardTitle, value, description }: Props) {
  return (
    <Card className="w-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 p-4">
        <CardTitle className="text-sm font-medium mr-12">{cardTitle}</CardTitle>
        {icon && <>{icon}</>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
