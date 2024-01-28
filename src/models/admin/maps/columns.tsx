import { ColumnDef } from "@tanstack/react-table";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
export const mapsColumns: ColumnDef<AnalysisMap>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
