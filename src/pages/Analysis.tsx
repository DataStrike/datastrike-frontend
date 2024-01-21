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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { mapsService } from "@/services/maps-service.ts";
import { queryClient } from "@/pages/Layout.tsx";
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
      setTeam(teams[0]);
    }
  }, [teams, team]);

  const updateTeam = async (team: Team) => {
    setTeam(team);
    await queryClient.invalidateQueries({ queryKey: ["maps", team.id] });
  };

  useEffect(() => {
    // Connect to the server only if there is a team id
    if (team.id) {
      const socket = io("http://localhost:3333");

      socket.connect();

      console.log("Connected to server");

      const handleAnalysisData = async () => {
        await queryClient.invalidateQueries({ queryKey: ["maps", team.id] });
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
          <div className="w-56">
            <Card className="w-full h-[600px]">
              <CardHeader className="pt-4 px-4 ">
                <CardTitle>Filters</CardTitle>
                <CardDescription>Add filters to your research</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col">
                <span className="opacity-40 text-sm">
                  Filters coming soon...
                </span>
              </CardContent>
            </Card>
          </div>
          {maps && <AnalysisList maps={maps} />}
        </div>
      </div>
    </div>
  );
}
