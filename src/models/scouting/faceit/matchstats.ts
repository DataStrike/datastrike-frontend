export interface PlayerStats {
  Role: "Tank" | "Damage" | "Support";
  Eliminations: string;
  Deaths: string;
  Assists: string;
  "Damage Dealt": string;
  "Damage Mitigated": string;
  "Healing Done": string;
  "K/D Ratio": string;
  Result: string;
}

interface Player {
  player_id: string;
  nickname: string;
  player_stats: PlayerStats;
}

interface TeamStats {
  TeamTotalDeaths: string;
  TeamAvgEliminations: string;
  Team: string;
  TeamTotalEliminations: string;
  TeamAvgDeaths: string;
  TeamWin: string;
  TeamScore: string;
}

interface Team {
  team_id: string;
  premade: boolean;
  team_stats: TeamStats;
  players: Player[];
}

interface RoundStats {
  OW2Mode: string;
  Map: string;
  Winner: string;
  ScoreSummary: string;
}

export interface MatchStats {
  rounds: {
    best_of: string;
    competition_id: string | null;
    game_id: string;
    game_mode: string;
    match_id: string;
    match_round: string;
    played: string;
    round_stats: RoundStats;
    teams: Team[];
  }[];
}
