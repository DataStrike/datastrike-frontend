import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnalysisList from "@/components/analysis/AnalysisList";

import { useState, useEffect, ChangeEvent } from "react";
import io from "socket.io-client";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { SelectTeamComponent } from "@/components/team/SelectTeamComponent.tsx";
import { Team } from "@/models/teams/columns.tsx";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/teams-service.ts";
import { mapsService } from "@/services/maps-service.ts";
import { queryClient } from "@/pages/Layout.tsx";
import { WEBSOCKET_URL } from "@/utils/constants";
import { HelpCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import WorkshopInstructions from "@/components/analysis/WorkshopInstructions.tsx";
import { selectTeam } from "@/utils/functions.ts";
import { toast } from "sonner";

export function Analysis() {
  const [files, setFiles] = useState<File[]>([]);
  const [team, setTeam] = useState({} as Team);

  const { data: teams, isFetching: teamsFetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const { data: maps } = useQuery({
    queryKey: ["maps", team.id],
    queryFn: () => mapsService.getMapList(team.id),
  });

  useEffect(() => {
    if (teams && teams.length > 0 && !team.id) {
      selectTeam(teams, team, setTeam, localStorage);
    }
  }, [teams, team, setTeam]);

  const updateTeam = async (team: Team) => {
    setTeam(team);
    localStorage.setItem("lastSelectedTeam", team.name);
    await queryClient.invalidateQueries({ queryKey: ["maps", team.id] });
  };

  useEffect(() => {
    // Connect to the server only if there is a team id
    if (team.id) {
      const socket = io(WEBSOCKET_URL);

      socket.connect();

      const handleAnalysisData = async (args: string) => {
        await queryClient.invalidateQueries({ queryKey: ["maps", team.id] });
        if (args === "error") {
          toast.error("Error while processing the map");
        } else {
          toast.success("Map processed successfully");
        }
      };

      // Attach event listener for analysisData
      socket.on("analysisData", handleAnalysisData);

      return () => {
        // Disconnect when the component is unmounted or when team.id changes
        socket.disconnect();
        // Remove the event listener to prevent memory leaks
        socket.off("analysisData", handleAnalysisData);
      };
    }
  }, [team.id]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const filesArray = Array.from(selectedFiles);
      setFiles(filesArray);
    }
  };

  const handleFileUpload = async () => {
    if (!files || files.length === 0) {
      console.log("Aucun fichier sélectionné");
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append("teamId", team.id.toString());

    try {
      const response = await mapsService.addAnalysisMaps(team.id, formData);
      console.log("Réponse de l'API :", response);
    } catch (error) {
      console.error("Erreur lors du téléversement des fichiers :", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Analysis</div>
        {teamsFetching ? (
          <Skeleton className="h-4 w-[250px]" />
        ) : (
          <SelectTeamComponent
            teams={teams!}
            team={team.name}
            setTeam={(team: Team) => updateTeam(team)}
          />
        )}
      </div>

      {!teams || (teams.length == 0 && <div>No team detected.</div>)}
      {/* AnalysisList prend toute la largeur */}
      <div className="flex flex-col gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-fit" variant={"secondary"}>
              <HelpCircleIcon className="h-4 w-4 mr-2" />
              How does it work ?
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full p-4 lg:w-1/2 xl:w-1/3">
            <DialogHeader>
              <DialogTitle>Setup to analyze your data</DialogTitle>
            </DialogHeader>
            <div className="w-fit">
              Make sure to follow these steps to get the .txt log files :
              <Separator className={"my-2"} />
              <WorkshopInstructions />
            </div>
            <DialogClose asChild>
              <Button type="button" className="w-24 ml-auto">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>

        <div className="flex">
          <Input
            id="picture"
            type="file"
            onChange={handleFileChange}
            className="file:bg-gray-200 file:text-black-700 w-fit hover:file:bg-blue-100 mr-4"
            multiple
          />
          <Button onClick={handleFileUpload}> Upload files</Button>
        </div>
        <div className="flex h-full gap-4">
          {maps && <AnalysisList maps={maps} />}
        </div>
      </div>
    </div>
  );
}
