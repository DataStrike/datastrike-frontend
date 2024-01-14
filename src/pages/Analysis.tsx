import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/teams-service.ts";
import { SelectTeamComponent } from "@/components/team/SelectTeamComponent.tsx";
import { Team } from "@/models/teams/columns.tsx";
import { queryClient } from "@/pages/Layout.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export function Analysis() {
  const { data: teams, isFetching: teamsFetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const [team, setTeam] = useState({} as Team);

  if (teams && teams.length > 0 && !team.id) {
    setTeam(teams[0]);
  }

  const updateTeam = async (team: Team) => {
    setTeam(team);

    // Invalidate the query so that it refetches with the new team
    await queryClient.invalidateQueries({ queryKey: ["tracker", team.id] });
  };
  return (
    <div>
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
    </div>
  );
}
