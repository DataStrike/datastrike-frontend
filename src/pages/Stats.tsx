// Stats.tsx
import { useQuery } from "@tanstack/react-query";
import { CharacterStats, statsService } from "@/services/stats-service.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import PlayerInfo from "@/components/stats/PlayerInfo.tsx";
import { queryClient } from "@/pages/Layout.tsx";
import SkeletonCard from "@/components/stats/SkeletonCard.tsx";

export function Stats() {
  const [playerNameInput, setPlayerNameInput] = useState<string>("");
  const [playerNameQuery, setPlayerNameQuery] = useState<string>("");

  // Query for characters
  const { data: characters } = useQuery({
    queryKey: ["characters"],
    queryFn: statsService.getHeroes,
  });

  const {
    data: players,
    isFetching: playersLoading,
    refetch,
  } = useQuery({
    queryKey: ["players", playerNameQuery],
    queryFn: () => statsService.searchPlayers(playerNameQuery),
    enabled: false,
  });

  const searchPlayer = async () => {
    setPlayerNameQuery(playerNameInput);
    await queryClient.invalidateQueries({
      queryKey: ["players", playerNameInput],
    });
    await refetch();
  };

  // Group characters by their role
  const groupedCharacters: Record<string, CharacterStats[]> = {};
  if (characters) {
    characters.forEach((character) => {
      const { role } = character;
      if (!groupedCharacters[role]) {
        groupedCharacters[role] = [];
      }
      groupedCharacters[role].push(character);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Stats</div>
      </div>

      <div className="flex gap-4">
        <Input
          value={playerNameInput}
          type="text"
          className="w-56"
          placeholder={"Ex : Sways-21220"}
          onChange={(e) => setPlayerNameInput(e.target.value)}
        ></Input>
        <Button onClick={searchPlayer}>Search</Button>
      </div>

      {playersLoading && (
        <div className="grid grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {players && (
        <div className="flex gap-8 flex-wrap">
          {players.results.map((player) => (
            <PlayerInfo key={player.player_id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;
