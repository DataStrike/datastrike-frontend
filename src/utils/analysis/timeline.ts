import { Data, DataEvent } from "@/models/analysis/analysismaps.ts";

export interface Fights {
  roundNumber: number;
  fights: DataEvent[][];
}

function getLastTimestampEvent(events: DataEvent[]) {
  return events[events.length - 1].timestamp;
}

export function detectFights(data: Data, time: number): Fights[] {
  let roundNumber = 0;

  const toReturn: Fights[] = [
    {
      roundNumber: roundNumber, // get index of round
      fights: [],
    },
  ];
  let fight = [];
  let lastTime = 0;
  const interestingEvents = ["kill", "ultimate"];

  for (const event of data.events) {
    // Check if round has changed
    const round = data.rounds?.[roundNumber]; // Using optional chaining to handle undefined data.rounds

    if (!round) {
      break;
    }
    const eventTime = Number(event.timestamp);
    const startTime = Number(round.start_time ? round.start_time : 0);
    const endTime = Number(
      round.end_time ? round.end_time : getLastTimestampEvent(data.events),
    );

    if (eventTime > endTime) {
      // Push the last fight of the round
      toReturn[roundNumber].fights.push(fight);
      fight = [];
      roundNumber++;
      toReturn.push({
        roundNumber: roundNumber,
        fights: [],
      });
    }

    // If the event is not a kill or an ultimate, we skip the event
    if (!interestingEvents.includes(event.type)) {
      continue;
    }

    // If the time between the last event and this event is greater than {time} seconds, we consider it's a new fight
    if (
      lastTime !== 0 &&
      eventTime - lastTime > time &&
      eventTime > startTime &&
      interestingEvents.includes(event.type)
    ) {
      // If the fight is not empty, we push it to the fights array
      if (fight.length > 0) {
        toReturn[roundNumber].fights.push(fight);
        fight = [];
      }
    }

    if (interestingEvents.includes(event.type)) {
      fight.push(event);
    }

    lastTime = eventTime;
  }

  return toReturn;
}

// Parse the description of an event to extract the character name
// ex: NafK kill Nazakoh
export function parseDescription(description: string) {
  const [player1, action, player2, keyword] = description.split(" ", 4);
  return { player1, action, player2, keyword };
}

// Get the name of the first player to get a kill in each fight
export function detectFirstKills(fights: DataEvent[][]) {
  return fights.map((fight) => {
    const firstKill = fight.find((event) => event.type === "kill");
    if (firstKill) {
      return parseDescription(firstKill.description).player1;
    }
  });
}

// Get the name of the first player to die in each fight
export function detectFirstDeaths(fights: DataEvent[][]) {
  return fights.map((fight) => {
    const firstDeath = fight.find((event) => event.type === "kill");
    if (firstDeath) {
      return parseDescription(firstDeath.description).player2;
    }
  });
}

export interface FightMetaData {
  nbKills: number;
  nbUltimates: number;
}
export function getFightMetaData(fight: DataEvent[]): FightMetaData {
  const nbKills = fight.filter((event) => event.type === "kill").length;
  const nbUltimates = fight.filter((event) => event.type === "ultimate").length;
  return { nbKills, nbUltimates };
}

export const getKeyValuesInfos = (countsObject: { [key: string]: number }) => {
  return Object.entries(countsObject)
    .map(([key, value]) => ({
      key,
      value,
    }))
    .sort((a, b) => b.value - a.value);
};
