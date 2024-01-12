import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { ChangeEvent } from "react";

interface Props {
  teams: any;
  team: string;
  setTeam: (team: string) => void;
}
export function SelectTeamComponent({ teams, team, setTeam }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={team} />
      </SelectTrigger>
      <SelectContent>
        {teams?.map((team: any) => (
          <SelectItem
            key={team.id}
            onSelect={(e: ChangeEvent<HTMLInputElement>) =>
              setTeam(e.target.value)
            }
            value={team.name.toString()}
          >
            {team.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
