import { ColumnDef } from "@tanstack/react-table";
import { AdminTeam } from "@/services/admin-service.ts";

export const teamsColumns: ColumnDef<AdminTeam>[] = [
  {
    accessorKey: "id",
    header: "ID",
    filterFn: "equalsString",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
];
