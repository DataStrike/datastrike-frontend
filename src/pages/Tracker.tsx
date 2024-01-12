import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { z } from "zod";
import AutoForm from "@/components/ui/auto-form";
import { Separator } from "@/components/ui/separator.tsx";
import { MapsContainer } from "@/components/ui/mapsContainer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SaveIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/teams-service.ts";
import { SelectTeamComponent } from "@/components/team/SelectTeamComponent.tsx";

const formSchema = z.object({
  teamName: z.string(),
  date: z.coerce.date(),
  info: z.string().optional(),
});

export function Tracker() {
  const [nbMaps, setNbMaps] = useState(1);
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const [team, setTeam] = useState("");

  if (teams && team === "") {
    setTeam(teams[0].name);
  }
  const addMap = () => {
    setNbMaps(nbMaps + 1);
  };
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
            <MapsContainer nbMaps={nbMaps} />
            <Button variant="outline" onClick={addMap} className="my-2">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add a map
            </Button>
            <Separator />
            <Button className="mt-2">
              <SaveIcon className="mr-2 h-4 w-4" />
              Save
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full lg:grow">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              View your results and stats in a table
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
