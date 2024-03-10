// Scouting.tsx
import { useQuery } from "@tanstack/react-query";
import {
  PLAYERS_LIMIT,
  blizzardScoutingService,
  faceitScoutingService,
} from "@/services/scouting-service.ts";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import PlayerInfo from "@/components/scouting/PlayerInfo.tsx";
import { queryClient } from "@/pages/Layout.tsx";
import SkeletonCard from "@/components/scouting/SkeletonCard.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { TeamCard } from "@/components/scouting/faceit/TeamCard.tsx";
export function Scouting() {
  // FACEIT API
  const [teamNameInput, setTeamNameInput] = useState<string>("");
  const [teamNameQuery, setTeamNameQuery] = useState<string>("");
  // BLIZZARD API
  const [playerNameInput, setPlayerNameInput] = useState<string>("");
  const [playerNameQuery, setPlayerNameQuery] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);

  const {
    data: players,
    isFetching: playersLoading,
    refetch: refetchPlayers,
  } = useQuery({
    queryKey: ["players", playerNameQuery, offset],
    queryFn: () =>
      blizzardScoutingService.searchPlayers(playerNameQuery, offset),
    enabled: false,
  });

  const searchPlayer = async () => {
    setPlayerNameQuery(playerNameInput);
    await queryClient.invalidateQueries({
      queryKey: ["players", playerNameInput, offset],
    });
    await refetchPlayers();
  };

  const {
    data: teams,
    isFetching: teamsLoading,
    refetch: refetchTeams,
  } = useQuery({
    queryKey: ["teams", teamNameQuery],
    queryFn: () => faceitScoutingService.searchTeams(teamNameQuery),
    enabled: false,
  });

  const searchTeams = async () => {
    setTeamNameQuery(teamNameInput);
    await queryClient.invalidateQueries({
      queryKey: ["teams", teamNameInput],
    });
    await refetchTeams();
  };

  useEffect(() => {
    // Check if offset changes, if yes then refetch
    if (playerNameQuery === "") {
      return;
    }
    (async () => {
      await queryClient.invalidateQueries({
        queryKey: ["players", playerNameInput, offset],
      });
      await refetchPlayers();
    })();
  }, [offset]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Scouting</div>
      </div>

      <div className="flex flex-col">
        <Tabs defaultValue="faceit" className="grow">
          <TabsList className="w-[400px]">
            <TabsTrigger className="w-full" value="faceit">
              FACEIT
            </TabsTrigger>
            <TabsTrigger className="w-full" value="blizzard">
              Blizzard
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full h-[80vh] overflow-auto" value="faceit">
            Search players / teams on FACEIT
            <div className="flex gap-4 m-1">
              <Input
                value={teamNameInput}
                type="text"
                className="w-56"
                placeholder={"Ex : Team Peps"}
                onChange={(e) => setTeamNameInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    searchTeams().then((r) => r);
                  }
                }}
              ></Input>
              <Button onClick={searchTeams}>Search</Button>
            </div>
            {teamsLoading && (
              <div className="grid grid-cols-6 gap-4">
                {[...Array(12)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            )}
            {teams && (
              <>
                <span className={"text-sm text-gray-600"}>
                  Matching with players or team name : "{teamNameQuery}"
                </span>
                <div className="flex flex-wrap gap-4 mt-4">
                  {teams.items.map((team) => (
                    <TeamCard key={team.team_id} team={team} />
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          <TabsContent
            className="w-full h-[80vh] overflow-auto"
            value="blizzard"
          >
            Search players on Blizzard
            <div className="flex gap-4 m-1">
              <Input
                value={playerNameInput}
                type="text"
                className="w-56"
                placeholder={"Ex : Xx-Genji-xX"}
                onChange={(e) => setPlayerNameInput(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    searchPlayer().then((r) => r);
                  }
                }}
              ></Input>
              <Button onClick={searchPlayer}>Search</Button>
            </div>
            <div className="text-sm mt-2 text-gray-600">
              {players && <div>{players.total} players found</div>}
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
                    <PlayerInfo key={player.player_id} team={player} />
                  ))}
                </div>

                <div className="flex gap-2 mt-2">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Scouting;
