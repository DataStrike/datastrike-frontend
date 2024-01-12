import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "@/services/teams-service.ts";
import { SelectTeamComponent } from "@/components/team/SelectTeamComponent.tsx";

export function Analysis() {
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const [team, setTeam] = useState("");

  if (teams && team === "") {
    setTeam(teams[0].name);
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Analysis</div>
        <SelectTeamComponent
          teams={teams}
          team={team}
          setTeam={(team) => setTeam(team)}
        />
      </div>
    </div>
  );
}
