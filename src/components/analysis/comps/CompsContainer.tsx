import { Data, DataEvent } from "@/models/analysis/analysismaps.ts";
import { getPlayerNames } from "@/utils/analysis/timeline.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { secToMin } from "@/utils/functions.ts";

interface Props {
  data: Data;
}

interface TeamComposition {
  player: string;
  heroes: Heroes[];
}

interface Heroes {
  name: string;
  start: number;
  end: number;
}

interface SingleComposition {
  player: string;
  hero: string;
}

interface Composition {
  composition: SingleComposition[];
  start: number;
  end: number;
}

export function CompsContainer({ data }: Props) {
  const players = getPlayerNames(data);

  const hero_spawn = data.events.filter((event) => event.type === "hero_spawn");
  const hero_swaps = data.events.filter((event) => event.type === "hero_swap");

  const heroesPlayed = (players: {
    team1: string[];
    team2: string[];
  }): TeamComposition[][] => {
    const team1Heroes: TeamComposition[] = players.team1.map((player) => ({
      player,
      heroes: getHeroesForPlayer(player, hero_spawn, hero_swaps),
    }));
    const team2Heroes: TeamComposition[] = players.team2.map((player) => ({
      player,
      heroes: getHeroesForPlayer(player, hero_spawn, hero_swaps),
    }));
    return [team1Heroes, team2Heroes];
  };

  const getHeroesForPlayer = (
    player: string,
    spawnEvents: DataEvent[],
    swapEvents: DataEvent[],
  ): Heroes[] => {
    const playerEvents = [
      ...spawnEvents.filter((event) => event.player === player),
      ...swapEvents.filter((event) => event.player === player),
    ];

    const heroes: Heroes[] = [];
    let currentHero: Heroes = { name: "", start: 0, end: 0 };
    playerEvents.forEach((event) => {
      if (event.type === "hero_spawn") {
        currentHero = {
          name: event.hero,
          start: Number(event.timestamp),
          end: Infinity,
        };
      } else if (event.type === "hero_swap") {
        currentHero.end = Number(event.timestamp);
        if (currentHero.start !== currentHero.end) {
          heroes.push(currentHero);
        }
        currentHero = {
          name: event.hero,
          start: Number(event.timestamp),
          end: Infinity,
        };
      }
    });
    if (heroes.length === 0 || currentHero.end === Infinity) {
      heroes.push(currentHero);
    }
    return heroes;
  };

  const allCompositionRecords = heroesPlayed(players);

  const getCompositionsByTeam = (
    teamCompositions: TeamComposition[],
  ): Composition[] => {
    const compositions: Composition[] = [];
    const uniqueTimers: number[] = [];
    console.log(teamCompositions);
    // Get all the unique start or end times
    teamCompositions.forEach((player) => {
      player.heroes.forEach((hero) => {
        if (!uniqueTimers.includes(hero.start)) {
          uniqueTimers.push(hero.start);
        }
        if (!uniqueTimers.includes(hero.end)) {
          uniqueTimers.push(hero.end);
        }
      });
    });
    uniqueTimers.sort((a, b) => a - b);
    // For each unique timer, determine the composition
    uniqueTimers.forEach((time, index) => {
      const composition: Composition = {
        composition: [],
        start: time,
        end: uniqueTimers[index + 1] ? uniqueTimers[index + 1] : Infinity,
      };
      teamCompositions.forEach((player) => {
        player.heroes.forEach((hero) => {
          if (hero.start <= time && hero.end > time) {
            composition.composition.push({
              player: player.player,
              hero: hero.name,
            });
          }
        });
      });
      compositions.push(composition);
    });

    // If composition is empty, remove it
    compositions.forEach((composition, index) => {
      if (composition.composition.length === 0) {
        compositions.splice(index, 1);
      }
    });
    return compositions;
  };

  const compoTeam1 = getCompositionsByTeam(allCompositionRecords[0]);
  const compoTeam2 = getCompositionsByTeam(allCompositionRecords[1]);

  console.log(compoTeam1, compoTeam2);
  const determineAllCompositions = () => {
    const allTimers = [
      ...compoTeam1.map((comp) => comp.start),
      ...compoTeam1.map((comp) => comp.end),
      ...compoTeam2.map((comp) => comp.start),
      ...compoTeam2.map((comp) => comp.end),
    ];
    const uniqueTimers = Array.from(new Set(allTimers)).sort((a, b) => a - b);

    const compositions: {
      start: number;
      end: number;
      team1: SingleComposition[];
      team2: SingleComposition[];
    }[] = [];

    uniqueTimers.forEach((time, index) => {
      const composition: {
        start: number;
        end: number;
        team1: SingleComposition[];
        team2: SingleComposition[];
      } = {
        start: time,
        end: uniqueTimers[index + 1] ? uniqueTimers[index + 1] : Infinity,
        team1: [],
        team2: [],
      };
      compoTeam1.forEach((comp) => {
        if (comp.start <= time && comp.end > time) {
          comp.composition.forEach((player) => {
            composition.team1.push(player);
          });
        }
      });
      compoTeam2.forEach((comp) => {
        if (comp.start <= time && comp.end > time) {
          comp.composition.forEach((player) => {
            composition.team2.push(player);
          });
        }
      });
      compositions.push(composition);

      // Remove empty compositions
      compositions.forEach((composition, index) => {
        if (composition.team1.length === 0 && composition.team2.length === 0) {
          compositions.splice(index, 1);
        }
      });
    });
    return compositions;
  };
  // Get all unique timers from both compositions
  const allCompositions = determineAllCompositions();

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <TableComponent allCompositions={allCompositions} />
      </div>
    </div>
  );
}

interface TableComponentProps {
  allCompositions: {
    start: number;
    end: number;
    team1: SingleComposition[];
    team2: SingleComposition[];
  }[];
}
const TableComponent = ({ allCompositions }: TableComponentProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Round</TableHead>
            <TableHead>Start time</TableHead>
            <TableHead>End time</TableHead>
            <TableHead>Team 1</TableHead>
            <TableHead>Team 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompositions.map((comp, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{secToMin(comp.start)}</TableCell>
              <TableCell>{secToMin(comp.end)}</TableCell>
              <TableCell>
                {comp.team1.map((player, index) => (
                  <span key={index}>
                    {player.player} - {player.hero}
                    <br />
                  </span>
                ))}
              </TableCell>
              <TableCell>
                {comp.team2.map((player, index) => (
                  <span key={index}>
                    {player.player} - {player.hero}
                    <br />
                  </span>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
