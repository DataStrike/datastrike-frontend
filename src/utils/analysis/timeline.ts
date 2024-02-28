import { Data, DataEvent } from "@/models/analysis/analysismaps.ts";
export function detectFights(data: Data, time: number) {
  const fights = [];
  let fight = [];
  let lastTime = 0;
  const interestingEvents = ["kill", "ultimate"];

  for (const event of data.events) {
    // If the event is not a kill or an ultimate, we skip the event
    if (!interestingEvents.includes(event.type)) {
      continue;
    }
    const eventTime = Number(event.timestamp);

    // If the time between the last event and this event is greater than {time} seconds,
    // we consider it a new fight
    if (
      lastTime !== 0 &&
      eventTime - lastTime > time &&
      interestingEvents.includes(event.type)
    ) {
      fights.push(fight);
      fight = [];
    }

    if (interestingEvents.includes(event.type)) {
      fight.push(event);
    }

    lastTime = eventTime;
  }

  return fights;
}

// Parse the description of an event to extract the character name
// ex: NafK kill Nazakoh
export function parseDescription(description: string) {
  const player1 = description.split(" ")[0];
  const action = description.split(" ")[1];
  const player2 = description.split(" ")[2];

  return { player1, action, player2 };
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
