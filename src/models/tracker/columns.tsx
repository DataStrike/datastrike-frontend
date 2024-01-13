import { ColumnDef } from "@tanstack/react-table";
import { RESULT } from "@/models/overwatch/maps.ts";

export type TrackerResult = {
  opponentTeamName: string;
  date: Date;
  mapName: string;
  usScore: number;
  themScore: number;
  result: RESULT;
};
export const columns: ColumnDef<TrackerResult>[] = [
  {
    accessorKey: "opponentTeamName",
    header: "Team",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "mapName",
    header: "Map",
  },
  {
    accessorKey: "usScore",
    header: "Us",
  },
  {
    accessorKey: "themScore",
    header: "Them",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
];
