import { Data, DataEvent, Round } from "@/models/analysis/analysismaps.ts";
import { getPlayerNames } from "@/utils/analysis/timeline.ts";

interface Props {
  data: Data;
}

export function CompsContainer({ data }: Props) {
  /*[
    { "round": 0, "start": "0.00", "end": "190.71" },
    { "round": 1, "start": "190.71", "end": "380.32" },
    { "round": 2, "start": "380.32", "end": "490.12" }
  ];*/

  const getRoundsInfo = (rounds: Round[]) => {
    return rounds.map((round: Round) => {
      return {
        round: Array.prototype.indexOf.call(rounds, round),
        start: round.start_time,
        end: round.end_time,
      };
    });
  };

  const players = getPlayerNames(data);

  const hero_spawn = data.events.filter((event) => event.type === "hero_spawn");
  const hero_swaps = data.events.filter((event) => event.type === "hero_swap");

  // Get the heros played by each player
  // Players is {team1: { player1: [heroes], player2: [heroes] }, team2: { player1: [heroes], player2: [heroes] }}
  // be careful, heroes can be swap and I need all the heroes played by each player

  const getHeroesForPlayer = (
    player: string,
    spawnEvents: DataEvent[],
    swapEvents: DataEvent[],
  ) => {
    const playerEvents = [
      ...spawnEvents.filter((event) => event.player === player),
      ...swapEvents.filter((event) => event.player === player),
    ];
    return Array.from(new Set(playerEvents.map((event) => event.hero)));
  };

  const heroesPlayed = (players: { team1: string[]; team2: string[] }) => {
    const team1Heroes = players.team1.map((player) => ({
      player,
      heroes: getHeroesForPlayer(player, hero_spawn, hero_swaps),
    }));

    const team2Heroes = players.team2.map((player) => ({
      player,
      heroes: getHeroesForPlayer(player, hero_spawn, hero_swaps),
    }));

    return { team1: team1Heroes, team2: team2Heroes };
  };

  const allCompositionRecords = heroesPlayed(players);
  console.log(allCompositionRecords);
  console.log(getRoundsInfo(data.rounds));
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">Comps</div>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Team 1 composition</th>
            <th>Team 2 composition</th>
          </tr>
        </thead>
      </table>
      <pre>
        {/*
        <code>{JSON.stringify(allCompositionRecords, null, 2)}</code>
*/}
      </pre>
    </div>
  );
}
