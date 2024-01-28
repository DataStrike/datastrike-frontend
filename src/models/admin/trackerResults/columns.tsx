import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { TrackerResult } from "@/models/tracker/columns.tsx";

export const trackerColumns: ColumnDef<TrackerResult>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "team_id",
    header: "Team ID",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date;
      const formattedDate = date.slice(0, 19);
      return <div>{formattedDate}</div>;
    },
  },
];
