import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Team } from "@/models/teams/columns.tsx";

interface Props {
  teams: Team[];
  team: string;
  setTeam: (teamName: Team) => void;
}

export function SelectTeamComponent({ teams, team, setTeam }: Props) {
  const teamNames = teams.map((team) => team.name);

  return (
    <Select
      onValueChange={(value) => {
        const selectedTeam = teams.find((t) => t.name === value);
        if (selectedTeam) {
          setTeam(selectedTeam);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={team} />
      </SelectTrigger>
      <SelectContent>
        {teamNames?.map((name: string) => (
          <SelectItem key={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
