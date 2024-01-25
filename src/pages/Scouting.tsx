// Scouting.tsx
import { useQuery } from "@tanstack/react-query";
import {
  CharacterStats,
  PLAYERS_LIMIT,
  scoutingService,
} from "@/services/scouting-service.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import PlayerInfo from "@/components/scouting/PlayerInfo.tsx";
import { queryClient } from "@/pages/Layout.tsx";
import SkeletonCard from "@/components/scouting/SkeletonCard.tsx";

export function Scouting() {
  const [playerNameInput, setPlayerNameInput] = useState<string>("");
  const [playerNameQuery, setPlayerNameQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);

  // Query for characters
  const { data: characters } = useQuery({
    queryKey: ["characters"],
    queryFn: scoutingService.getHeroes,
  });

  const {
    data: players,
    isFetching: playersLoading,
    refetch,
  } = useQuery({
    queryKey: ["players", playerNameQuery, offset],
    queryFn: () => scoutingService.searchPlayers(playerNameQuery, offset),
    enabled: false,
  });

  const searchPlayer = async () => {
    setPlayerNameQuery(playerNameInput);
    await queryClient.invalidateQueries({
      queryKey: ["players", playerNameInput, offset],
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

  useEffect(() => {
    // Check if offset changes, if yes then refetch
    if (playerNameQuery === "") {
      return;
    }
    (async () => {
      await queryClient.invalidateQueries({
        queryKey: ["players", playerNameInput, offset],
      });
      await refetch();
    })();
  }, [offset]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Scouting</div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-4">
          <Input
            value={playerNameInput}
            type="text"
            className="w-56"
            placeholder={"Ex : Xx-Genji-xX"}
            onChange={(e) => setPlayerNameInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                searchPlayer();
              }
            }}
          ></Input>
          <Button onClick={searchPlayer}>Search</Button>
        </div>
        <div className="text-sm mt-2 text-gray-600">
          {players && <div>{players.total} players found</div>}
        </div>
      </div>

      {playersLoading && (
        <div className="grid grid-cols-6 gap-4">
          {[...Array(12)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {players && (
        <>
          <div className="flex gap-4 flex-wrap">
            {players.results.map((player) => (
              <PlayerInfo key={player.player_id} player={player} />
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              disabled={offset === 0}
              onClick={() => {
                const newOffset = offset - PLAYERS_LIMIT;
                if (newOffset >= 0 && newOffset < players.total) {
                  setOffset(newOffset);
                }
              }}
            >
              Previous
            </Button>
            <Button
              disabled={offset + PLAYERS_LIMIT >= players.total}
              onClick={() => {
                const newOffset = offset + PLAYERS_LIMIT;
                if (newOffset >= 0 && newOffset < players.total) {
                  setOffset(newOffset);
                }
              }}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Scouting;
