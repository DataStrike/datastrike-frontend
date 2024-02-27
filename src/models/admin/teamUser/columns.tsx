import { ColumnDef } from "@tanstack/react-table";
import { AdminTeamUser } from "@/services/admin-service.ts";

export const teamUser: ColumnDef<AdminTeamUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "teamId",
    header: "Team ID",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
