import { ColumnDef } from "@tanstack/react-table";
import { RESULT } from "@/models/overwatch/maps.ts";
import { capitalize } from "@/utils/functions.ts";
import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown, LinkIcon, Trash } from "lucide-react";
import { toast } from "sonner";
import { trackerService } from "@/services/tracker-service.ts";

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
export const columns: ColumnDef<TrackerResult>[] = [
  {
    accessorKey: "opponentTeamName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Team
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Map
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Result
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
