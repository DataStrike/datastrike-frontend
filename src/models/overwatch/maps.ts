export type MapName =
  | "Antarctic Peninsula"
  | "Blizzard World"
  | "Busan"
  | "Circuit Royal"
  | "Colosseo"
  | "Dorado"
  | "Eichenwalde"
  | "Esperanca"
  | "Hanamura"
  | "Havana"
  | "Hollywood"
  | "Horizon Lunar Colony"
  | "Ilios"
  | "Junkertown"
  | "King's Row"
  | "Lijiang Tower"
  | "Midtown"
  | "Nepal"
  | "New Junk City"
  | "New Queen Street"
  | "Numbani"
  | "Oasis"
  | "Paraiso"
  | "Paris"
  | "Rialto"
  | "Route 66"
  | "Shambali Monastery"
  | "Suravasa"
  | "Temple of Anubis"
  | "Volskaya Industries"
  | "Watchpoint: Gibraltar";

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
  them_score: number;
  replay_code: string;
};

export const OW_MAPS: MapData = {
  Control: [
    "Antarctic Peninsula",
    "Busan",
    "Ilios",
    "Lijiang Tower",
    "Nepal",
    "Oasis",
  ],
  Escort: [
    "Circuit Royal",
    "Dorado",
    "Havana",
    "Junkertown",
    "Rialto",
    "Route 66",
    "Shambali Monastery",
    "Watchpoint: Gibraltar",
  ],
  Flashpoint: ["New Junk City", "Suravasa"],

  Hybrid: [
    "Blizzard World",
    "Eichenwalde",
    "Hollywood",
    "King's Row",
    "Midtown",
    "Numbani",
    "Paraiso",
  ],
  Push: ["Colosseo", "Esperanca", "New Queen Street"],
};
