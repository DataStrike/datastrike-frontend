import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnalysisList from "@/components/analysis/AnalysisList";

import { useState, useEffect } from "react";
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
export function Analysis() {
  const [files, setFiles] = useState<File[]>([]);
  const [maps, setMaps] = useState<any[]>([]);
  const [team, setTeam] = useState({} as Team);

  const { data: teams, isFetching: teamsFetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  if (teams && teams.length > 0 && !team.id) {
    setTeam(teams[0]);
  }

  const updateTeam = async (team: Team) => {
    setTeam(team);

    // Invalidate the query so that it refetches with the new team
    // await queryClient.invalidateQueries({ queryKey: ["tracker", team.id] });
  };
  useEffect(() => {
    fetchMapsFromAPI();
    const socket = io("http://localhost:3333");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("analysisData", (data: any) => {
      console.info("Received event: ", data);
      fetchMapsFromAPI();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMapsFromAPI = async () => {
    try {
      const response = await fetch("http://localhost:3333/maps");
      if (response.ok) {
        const data = await response.json();
        setMaps(data);
        console.log("Maps fetched from API:", data);
      } else {
        console.error("Failed to fetch maps from API");
      }
    } catch (error) {
      console.error("Error fetching maps from API:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
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
    formData.append("teamId", "FakeTeamId");

    try {
      const response = await fetch(
        "http://localhost:3333/new_overwatch_analysis",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        console.log("Fichiers téléversés avec succès");
        // Traiter la réponse du backend si nécessaire
      } else {
        console.error("Échec du téléversement des fichiers");
      }
    } catch (error) {
      console.error("Erreur lors du téléversement des fichiers :", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Tracker</div>
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

        <div className="flex h-[600px] gap-4">
          <div className="w-56">
            <Card className="w-full h-full">
              <CardHeader className="pt-4 px-4">
                <CardTitle>Filters</CardTitle>
                <CardDescription>Add filters to your research</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Input placeholder="Name" />
              </CardContent>
            </Card>
          </div>
          <AnalysisList maps={maps} />
        </div>
      </div>
    </div>
  );
}
