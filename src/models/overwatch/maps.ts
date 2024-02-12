export type MapName =
  | "Antarctic peninsula"
  | "Blizzard world"
  | "Busan"
  | "Circuit royal"
  | "Colosseo"
  | "Dorado"
  | "Eichenwalde"
  | "Esperanca"
  | "Hanamura"
  | "Havana"
  | "Hollywood"
  | "Horizon lunar colony"
  | "Ilios"
  | "Junkertown"
  | "King's row"
  | "Lijiang tower"
  | "Midtown"
  | "Nepal"
  | "New junk city"
  | "New queen street"
  | "Numbani"
  | "Oasis"
  | "Paraiso"
  | "Paris"
  | "Rialto"
  | "Route 66"
  | "Shambali monastery"
  | "Suravasa"
  | "Temple of anubis"
  | "Volskaya industries"
  | "Watchpoint: gibraltar";

export type MapType = "Push" | "Control" | "Escort" | "Hybrid" | "Flashpoint";

export type RESULT = "W" | "L" | "D";

export type MapData = {
  [key in MapType]: MapName[];
};

export type FormDataTrackerResult = {
  opponentTeam: string;
  info: string;
  date: Date;
  maps: MapResult[];
  vodLink: string;
};

export type MapResult = {
  map_name: MapName | "";
  us_score: number;
  us_payload?: number;
  them_score: number;
  them_payload?: number;
  replay_code: string;
};

export const OW_MAPS: MapData = {
  Control: [
    "Antarctic peninsula",
    "Busan",
    "Ilios",
    "Lijiang tower",
    "Nepal",
    "Oasis",
  ],
  Escort: [
    "Circuit royal",
    "Dorado",
    "Havana",
    "Junkertown",
    "Rialto",
    "Route 66",
    "Shambali monastery",
    "Watchpoint: gibraltar",
  ],
  Flashpoint: ["New junk city", "Suravasa"],
  Hybrid: [
    "Blizzard world",
    "Eichenwalde",
    "Hollywood",
    "King's row",
    "Midtown",
    "Numbani",
    "Paraiso",
  ],
  Push: ["Colosseo", "Esperanca", "New queen street"],
};
