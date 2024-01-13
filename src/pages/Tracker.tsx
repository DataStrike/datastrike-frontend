import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import AutoForm from "@/components/ui/auto-form";
import { Separator } from "@/components/ui/separator";
import { MapsContainer } from "@/components/ui/MapsContainer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/teams-service";
import { SelectTeamComponent } from "@/components/team/SelectTeamComponent";
import { MapResult } from "@/models/overwatch/maps.ts";
import { DataTable } from "@/models/teams/data-table.tsx";
import { columns } from "@/models/tracker/columns.tsx";
import { getTrackerResults } from "@/services/tracker-service.ts";

const formSchema = z.object({
  opponentTeamName: z.string(),
  date: z.coerce.date(),
  info: z.string().optional(),
});

export function Tracker() {
  const [maps, setMaps] = useState<MapResult[]>([]);
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const [team, setTeam] = useState("");

  if (teams && team === "") {
    setTeam(teams[0].name);
  }

  const addMap = () => {
    const updatedMaps = [...maps];
    updatedMaps.push({
      map_name: "",
      map_type: "",
      us_score: 0,
      them_score: 0,
    });
    setMaps(updatedMaps);
  };

  const deleteMap = (i: number) => {
    const updatedMaps = [...maps];
    updatedMaps.splice(i, 1);
    setMaps(updatedMaps);
  };

  const addTrackerResults = () => {
    console.log(maps);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["tracker", team],
    queryFn: () => getTrackerResults(team),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Tracker</div>
        <SelectTeamComponent
          teams={teams}
          team={team}
          setTeam={(team) => setTeam(team)}
        />
      </div>
      <div className="flex flex-col gap-3 w-full lg:flex-row">
        <Card className="w-full h-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Add a result</CardTitle>
            <CardDescription>Add a result to your stats</CardDescription>
          </CardHeader>
          <CardContent className="h-full">
            <AutoForm
              formSchema={formSchema}
              fieldConfig={{
                info: { fieldType: "textarea" },
              }}
            ></AutoForm>
            <MapsContainer maps={maps} deleteMap={deleteMap} />
            <Button variant="outline" onClick={addMap} className="my-2">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add a map
            </Button>
            <Separator />
            <Button onClick={addTrackerResults} className="mt-2">
              <SaveIcon className="mr-2 h-4 w-4" />
              Save
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full h-[700px] lg:grow">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              View your results and stats in a table
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              {isFetching ? (
                <div> Loading... </div>
              ) : (
                <DataTable columns={columns} data={data!} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
