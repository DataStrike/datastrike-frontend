import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChangeEvent, useState } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/models/teams/data-table.tsx";
import { columns, Team } from "@/models/teams/columns.tsx";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/pages/Layout.tsx";
import { toast } from "sonner";

async function getTeams(): Promise<Team[]> {
  return await ky
    .get(`${BASE_URL}/teams`, {
      credentials: "include",
    })
    .json();
}

export function Teams() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const createTeam = async () => {
    try {
      await ky.post(`${BASE_URL}/teams`, {
        json: { name: name },
        credentials: "include",
      });

      await queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("Team created");
    } catch (error) {
      toast.error("Impossible to create team");
    }
  };

  const joinTeam = async () => {
    try {
      await ky.post(`${BASE_URL}/teams/${code}`, {
        credentials: "include",
      });

      await queryClient.invalidateQueries({ queryKey: ["teams"] });
      toast.success("Team joined");
    } catch (error) {
      toast.error("Impossible to join this team");
    }
  };

  const { data, isFetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl font-semibold">Teams</div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-2 w-full lg:w-72">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create</CardTitle>
              <CardDescription>Create a team</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Input
                placeholder="Name"
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
              <Button
                onClick={() => createTeam()}
                disabled={name.length === 0}
                className="w-full mt-2"
              >
                <Plus className="mr-2 h-4 w-4" /> Create a team
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Join</CardTitle>
              <CardDescription>Join a team from its code</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Input
                placeholder="Code"
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  setCode(e.target.value)
                }
              />
              <Button
                onClick={() => joinTeam()}
                disabled={code.length === 0}
                className="mt-2 w-full"
              >
                Join
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex grow">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Teams</CardTitle>
              <CardDescription>List of my teams</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center max-h-[600px] overflow-auto">
              <div className="w-full h-full">
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
    </div>
  );
}
