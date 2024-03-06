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
import { getHeroIcon, secToMin } from "@/utils/functions.ts";
import { generateImageHeroes } from "@/utils/generateImageObjects.ts";

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

const insertHeroIsOk = (start: number, end: number) => {
  return start < end;
};

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
    let currentHero: Heroes | null = null;

    playerEvents.forEach((event) => {
      if (event.type === "hero_spawn") {
        if (currentHero) {
          if (currentHero.name === event.hero) {
            heroes.shift();
          }
          currentHero.end = Number(event.timestamp);
          heroes.push({ ...currentHero }); // Push a copy of currentHero
        }

        currentHero = {
          name: event.hero,
          start: Number(event.timestamp),
          end: Infinity,
        };
      } else if (event.type === "hero_swap") {
        if (event.timestamp == 0) {
          // Remove the first hero if the player swaps before the game starts
          heroes.shift();
        }

        if (currentHero) {
          currentHero.end = Number(event.timestamp);

          if (insertHeroIsOk(currentHero.start, currentHero.end)) {
            heroes.push({ ...currentHero }); // Push a copy of currentHero
          }
        }

        currentHero = {
          name: event.hero,
          start: Number(event.timestamp),
          end: Infinity,
        };
      }
    });

    if (currentHero) {
      heroes.push(currentHero);
    }

    // For each heroes, if the end of i > start of i+1, end of i = start of i+1

    heroes.forEach((hero, index) => {
      if (index < heroes.length - 1) {
        if (hero.end > heroes[index + 1].start) {
          hero.end = heroes[index + 1].start;
        }
      }
      // If 2 same heroes are played, remove the second one and update the end of the first one
      if (index < heroes.length - 1) {
        if (hero.name === heroes[index + 1].name) {
          // Remove the second hero and update the end of the first one with the end of the second one
          heroes[index].end = heroes[index + 1].end;
          heroes.splice(index + 1, 1);
        }
      }
    });

    return heroes;
  };

  const allCompositionRecords = heroesPlayed(players);

  const getCompositionsByTeam = (
    teamCompositions: TeamComposition[],
  ): Composition[] => {
    const compositions: Composition[] = [];
    const uniqueTimers: number[] = [];
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
  const heroesIcons = generateImageHeroes();

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
          {allCompositions.map((comp, i) => {
            const previousComp = allCompositions[i - 1];
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{secToMin(comp.start)}</TableCell>
                <TableCell>{secToMin(comp.end)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {comp.team1.map((player, j) => {
                      let isSameAsPrevious = false;
                      if (previousComp) {
                        isSameAsPrevious = previousComp.team1.some(
                          (p) => p.hero === player.hero,
                        );
                      }
                      return (
                        <img
                          key={j}
                          src={getHeroIcon(player.hero, heroesIcons).src}
                          alt={player.hero}
                          className={`h-10 w-10 ${
                            isSameAsPrevious ? "opacity-30" : ""
                          }`}
                        />
                      );
                    })}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center">
                    {comp.team2.map((player, j) => {
                      let isSameAsPrevious = false;
                      if (previousComp) {
                        isSameAsPrevious = previousComp.team2.some(
                          (p) => p.hero === player.hero,
                        );
                      }
                      return (
                        <img
                          key={j}
                          src={getHeroIcon(player.hero, heroesIcons).src}
                          alt={player.hero}
                          className={`h-10 w-10 ${
                            isSameAsPrevious ? "opacity-30" : ""
                          }`}
                        />
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
