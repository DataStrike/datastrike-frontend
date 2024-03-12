import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowUpDown,
  EditIcon,
  EyeOffIcon,
  LogOutIcon,
  RepeatIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import { User } from "@/models/models.ts";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { queryClient } from "@/pages/Layout.tsx";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { teamsService } from "@/services/teams-service.ts";
import { Tooltip } from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export type Team = {
  id: number;
  name: string;
  players: User[];
  code: string;
  isAdmin: boolean;
};

interface SpoilerProps {
  code: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const Spoiler = ({ code }: SpoilerProps) => {
  const [revealed, setRevealed] = useState(false);

  const toggleReveal = () => {
    setRevealed(!revealed);
  };

  return (
    <>
      {revealed ? (
        <div>{code}</div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"outline"} size={"icon"} onClick={toggleReveal}>
                <EyeOffIcon className="h-4 w-4"></EyeOffIcon>
              </Button>
            </TooltipTrigger>
            <TooltipContent>See code</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

const leaveTeam = async (code: string) => {
  await ky.delete(`${BASE_URL}/teams/${code}`, {
    credentials: "include",
  });

  await queryClient.invalidateQueries({ queryKey: ["teams"] });
  toast.success("Left team successfully");
};

const markAdmin = async (teamId: number, userId: number) => {
  await teamsService.markAdmin(teamId, userId);

  await queryClient.invalidateQueries({ queryKey: ["teams"] });
  toast.success("Marked admin successfully");
};

const kickUser = async (teamId: number, userId: number) => {
  await teamsService.kickUser(teamId, userId);

  await queryClient.invalidateQueries({ queryKey: ["teams"] });
  toast.success("Kicked user successfully");
};

const regenerateCode = async (teamId: number) => {
  await teamsService.regenerateCode(teamId);

  await queryClient.invalidateQueries({ queryKey: ["teams"] });
  toast.success("Code regenerated successfully");
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
    cell: ({ row }) => {
      const team = row.original;
      return (
        <div className="flex gap-2 justify-center items-center">
          <Spoiler code={team.code} />
          {team.isAdmin && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"secondary"}
                    size={"icon"}
                    onClick={() => regenerateCode(team.id)}
                  >
                    <RepeatIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Regenerate code</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const team = row.original;
      const players = team.players;
      return (
        <div className="flex justify-center gap-2">
          {team.isAdmin && (
            <>
              <Dialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <Button size={"icon"} variant={"secondary"}>
                          <EditIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>Administration panel</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DialogContent className="w-full p-4 lg:w-1/2 xl:w-1/3">
                  <DialogHeader>
                    <DialogTitle>Team Administration Panel</DialogTitle>
                  </DialogHeader>
                  <div className="w-full">
                    <div className="flex flex-col gap-2 w-full">
                      {players.map((player) => (
                        <div key={player.name}>
                          <div className="flex justify-between items-center">
                            <span>{player.name}</span>
                            <div className="flex gap-2">
                              {!player.isAdmin && (
                                <>
                                  <Button
                                    variant={"default"}
                                    onClick={() =>
                                      markAdmin(team.id, player.id)
                                    }
                                  >
                                    <StarIcon className="h-4 w-4 mr-2" />
                                    Make admin
                                  </Button>

                                  <Button
                                    variant={"destructive"}
                                    onClick={() => kickUser(team.id, player.id)}
                                  >
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Kick
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => leaveTeam(team.code)}
                >
                  <LogOutIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Leave team</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
