import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import { AdminMap } from "@/services/admin-service.ts";
export const mapsColumns: ColumnDef<AdminMap>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "teamId",
    header: "Team ID",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <div>{date}</div>;
    },
  },
];
