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
import { MapsContainer } from "@/components/ui/MapsContainer.tsx";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/teams-service";
import { SelectTeamComponent } from "@/components/team/SelectTeamComponent";
import { FormDataTrackerResult, MapResult } from "@/models/overwatch/maps.ts";
import { columns } from "@/models/tracker/columns.tsx";
import { trackerService } from "@/services/tracker-service.ts";
import { toast } from "sonner";
import { queryClient } from "@/pages/Layout.tsx";
import { Team } from "@/models/teams/columns.tsx";
import { TrackerDatatable } from "@/models/tracker/tracker-datatable.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { WinRateDoughnut } from "@/components/charts/tracker/WinRateDoughnut.tsx";
import { WinRateOverTime } from "@/components/charts/tracker/WinRateOverTime.tsx";
import ChartContainer from "@/components/charts/ChartContainer.tsx";
import { StatsContainer } from "@/components/tracker/stats/StatsContainer.tsx";

const formSchema = z.object({
  opponentTeamName: z.string(),
  date: z.coerce.date(),
  info: z.string().optional(),
  vodLink: z.string().optional(),
});

export function Tracker() {
  const [maps, setMaps] = useState<MapResult[]>([]);
  const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({});
  const [team, setTeam] = useState({} as Team);

  const { data: teams, isFetching: teamsFetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  if (teams && teams.length > 0 && !team.id) {
    setTeam(teams[0]);
  }

  const { data: trackerResultList, isFetching } = useQuery({
    queryKey: ["tracker", team.id],
    queryFn: () => trackerService.getTrackerResults(team.id),
  });

  const updateTeam = async (team: Team) => {
    setTeam(team);

    // Invalidate the query so that it refetches with the new team
    await queryClient.invalidateQueries({ queryKey: ["tracker", team.id] });
  };
  const updateMap = (index: number, field: string, value: string | number) => {
    const updatedMaps = [...maps];
    updatedMaps[index] = {
      ...updatedMaps[index],
      [field]: value,
    };
    setMaps(updatedMaps);
  };
  const addMap = () => {
    const updatedMaps = [...maps];
    updatedMaps.push({
      map_name: "",
      us_score: 0,
      them_score: 0,
      replay_code: "",
    });
    setMaps(updatedMaps);
  };
  const deleteMap = (i: number) => {
    const updatedMaps = [...maps];
    updatedMaps.splice(i, 1);
    setMaps(updatedMaps);
  };
  const addTrackerResults = async (values: z.infer<typeof formSchema>) => {
    if (maps.length === 0) {
      toast.error("You must add at least one map");
    }
    setValues(values);
    if (!values.date) {
      return;
    } else {
      // Avoid GMT / CET errors
      values.date.setHours(12, 0, 0, 0);
    }
    const trackerResults: FormDataTrackerResult = {
      opponentTeam: values.opponentTeamName,
      info: values.info ? values.info : "",
      date: values.date,
      vodLink: values.vodLink ? values.vodLink : "",
      maps,
    };
    await trackerService.addTrackerResult(team.id, trackerResults);

    await queryClient.invalidateQueries({ queryKey: ["tracker", team.id] });
    // Clear all inputs and maps
    setMaps([]);
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

      {teams && teams.length > 0 && (
        <div className="flex flex-col gap-4 w-full lg:flex-row">
          <Card className="h-full w-64 lg:w-60">
            <CardHeader>
              <CardTitle>Add a result</CardTitle>
              <CardDescription>Add a result to your stats</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <AutoForm
                formSchema={formSchema}
                fieldConfig={{
                  info: { fieldType: "textarea" },
                  date: { fieldType: "date" },
                }}
                values={values}
                onSubmit={(values) => addTrackerResults(values)}
              >
                <MapsContainer
                  maps={maps}
                  deleteMap={deleteMap}
                  updateMap={updateMap}
                />
                <Button
                  type={"button"}
                  variant="add"
                  onClick={addMap}
                  className="my-2 w-full"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add a map
                </Button>
                <Separator />
                <Button type={"submit"} className="mt-2 w-full">
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </AutoForm>
            </CardContent>
          </Card>
          <Tabs defaultValue="datatable" className="grow">
            <TabsList className="w-[400px]">
              <TabsTrigger className="w-full" value="datatable">
                Table
              </TabsTrigger>
              <TabsTrigger className="w-full" value="stats">
                Stats
              </TabsTrigger>
              <TabsTrigger className="w-full" value="charts">
                Charts
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="w-full h-[80vh] overflow-auto"
              value="datatable"
            >
              {isFetching ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                <TrackerDatatable columns={columns} data={trackerResultList!} />
              )}
            </TabsContent>
            <TabsContent className="w-full h-full" value="stats">
              {isFetching ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                trackerResultList && (
                  <StatsContainer trackerResultList={trackerResultList} />
                )
              )}
            </TabsContent>

            <TabsContent className="w-full h-full" value="charts">
              {isFetching ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                <div className="flex flex-col gap-4">
                  <ChartContainer cardTitle="Win Rate">
                    <WinRateDoughnut data={trackerResultList!} />
                  </ChartContainer>
                  <ChartContainer cardTitle="Win Rate over time">
                    <WinRateOverTime data={trackerResultList!} />
                  </ChartContainer>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
