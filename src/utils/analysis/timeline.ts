import { Data } from "@/models/analysis/analysismaps.ts";

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
