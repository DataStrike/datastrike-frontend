import {
  Data,
  Round,
  Player,
  Character,
} from "@/models/analysis/analysismaps.ts";

interface Props {
  data: Data;
}

export function CompsContainer({ data }: Props) {
  const compositions: {
    [round: number]: {
      [team: string]: {
        [player: string]: {
          character: string;
          start_time: number;
          end_time: number;
        }[];
      };
    };
  } = {};

  // each round
  data.rounds.forEach((round: Round, roundIndex: number) => {
    compositions[roundIndex] = {};

    // each team
    Object.values(round.teams).forEach((team) => {
      compositions[roundIndex][team.name] = {};

      // each player in the team
      Object.values(team.players).forEach((player: Player) => {
        compositions[roundIndex][team.name][player.name] = [];

        // each character played by the player
        Object.values(player.characters).forEach((character: Character) => {
          let currentRecord: {
            character: string;
            start_time: number;
            end_time: number;
          };

          // each played time for the character
          character.played_time.forEach((time) => {
            const start = Number(time.start);
            const end = Number(time.end);
            if (end - start > 0.5) {
              currentRecord = {
                character: character.name,
                start_time: start,
                end_time: end,
              };
              compositions[roundIndex][team.name][player.name].push(
                currentRecord,
              );
            }
          });
        });
      });
    });
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">Comps</div>
      <pre>
        <code>{JSON.stringify(compositions, null, 2)}</code>
      </pre>
    </div>
  );
}
