interface LifetimeStats {
  "Current Win Streak": string;
  Matches: string;
  "Recent Results": string[];
  Wins: string;
  "Team Total Deaths": string;
  "Team Average K/D Ratio": string;
  "Win rate %": string;
  "Longest Win Streak": string;
  "Team Total Eliminations": string;
}

export interface SegmentStats {
  "Team Total Eliminations": string;
  "Team Total Deaths": string;
  "Win rate %": string;
  "Team Average K/D Ratio": string;
  Matches: string;
  Wins: string;
}

interface Segment {
  mode: string;
  label: string;
  img_small: string;
  img_regular: string;
  stats: SegmentStats;
  type: string;
}

export interface TeamStats {
  team_id: string;
  game_id: string;
  lifetime: LifetimeStats;
  segments: Segment[];
}
