import { Data, Round } from "@/models/analysis/analysismaps.ts";

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

  console.log(getRoundsInfo(data.rounds));

  const hero_spawn = data.events.filter((event) => event.type === "hero_spawn");
  const hero_swaps = data.events.filter((event) => event.type === "hero_swap");

  console.log(hero_spawn, hero_swaps);

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
