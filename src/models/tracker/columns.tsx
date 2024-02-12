import { ColumnDef } from "@tanstack/react-table";
import { RESULT } from "@/models/overwatch/maps.ts";
import { capitalize } from "@/utils/functions.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown, EditIcon, LinkIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { trackerService } from "@/services/tracker-service.ts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";

export type TrackerResult = {
  id: number;
  opponentTeamName: string;
  date: string;
  mapName: string;
  usScore: number;
  themScore: number;
  result: RESULT;
  info: string;
  replayCode: string;
  vodLink: string;
};

const onDeleteTrackerResult = async (trackerResultId: number) => {
  await trackerService.deleteTrackerResult(trackerResultId);
  toast.success("Map result deleted successfully");
  // Reload the page to refetch the data
  // TODO : Find a better way to do this without reloading the page
  window.location.reload();
};
const onEditTrackerResult = async (trackerResultId: number) => {
  const trackerResult = await trackerService.getTrackerResult(trackerResultId);
  // TODO : Open a modal to edit the tracker result
  console.log(trackerResult);
};
export const columns: ColumnDef<TrackerResult>[] = [
  {
    accessorKey: "opponentTeamName",
    header: "Team",
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
      const formattedDate = date.slice(0, 10);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "mapName",
    header: "Map",
    cell: ({ row }) => {
      const map = row.original.mapName;
      return <div>{capitalize(map)}</div>;
    },
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
    cell: ({ row }) => {
      const result: string = row.original.result;

      return result === "W" ? (
        <div className="text-xl">🟢</div>
      ) : result === "D" ? (
        <div className="text-xl">🟠</div>
      ) : (
        <div className="text-xl">🔴</div>
      );
    },
  },
  {
    accessorKey: "replayCode",
    header: "Code",
    cell: ({ row }) => {
      const code: string = row.original.replayCode;

      return code ? <div>{code}</div> : <></>;
    },
  },
  {
    accessorKey: "vodLink",
    header: "Link",
    cell: ({ row }) => {
      const vodLink = row.original.vodLink;

      const openLinkInNewTab = () => {
        window.open(vodLink, "_blank");
      };

      return (
        <Button
          className="disabled:opacity-10"
          variant="outline"
          size="icon"
          onClick={openLinkInNewTab}
          disabled={!vodLink}
        >
          <LinkIcon />
        </Button>
      );
    },
  },
  {
    accessorKey: "info",
    header: "Info",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const trackerResult = row.original;
      return (
        <div className="flex justify-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                onClick={async () => {
                  await onEditTrackerResult(trackerResult.id);
                }}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full p-4 lg:w-1/2 xl:w-1/3">
              <DialogHeader>
                <DialogTitle>Edit your result</DialogTitle>
              </DialogHeader>
              <div className="w-fit">Test</div>
              <DialogClose asChild>
                <Button type="button" className="w-24 ml-auto">
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            size="icon"
            onClick={async () => {
              await onDeleteTrackerResult(trackerResult.id);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
