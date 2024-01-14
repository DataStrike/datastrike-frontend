import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown, ClipboardIcon, LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/models/models.ts";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { queryClient } from "@/pages/Layout.tsx";

export type Team = {
  id: number;
  name: string;
  players: User[];
  code: string;
};

const copyToClipboard = async (code: string) => {
  await navigator.clipboard.writeText(code);
  toast.success("Copied to clipboard");
};

const leaveTeam = async (code: string) => {
  await ky.delete(`${BASE_URL}/teams/${code}`, {
    credentials: "include",
  });

  await queryClient.invalidateQueries({ queryKey: ["teams"] });
  toast.success("Left team successfully");
};
export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "players",
    header: "Players",
    cell: ({ row }) => {
      const players = row.original.players;
      return (
        <div>
          {players.map((player) => (
            <div key={player.name}>{player.name}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const team = row.original;
      return (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(team.code)}
          >
            <ClipboardIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => leaveTeam(team.code)}
          >
            <LogOutIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
