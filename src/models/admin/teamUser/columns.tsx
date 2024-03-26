import { ColumnDef } from "@tanstack/react-table";
import { AdminTeamUser } from "@/services/admin-service.ts";

export const teamUser: ColumnDef<AdminTeamUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
    filterFn: "equalsString",
  },
  {
    accessorKey: "userId",
    header: "User ID",
    filterFn: "equalsString",
  },
  {
    accessorKey: "teamId",
    header: "Team ID",
    filterFn: "equalsString",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
