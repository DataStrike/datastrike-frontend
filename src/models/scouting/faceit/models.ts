export interface FACEITTeam {
  items: TeamInfo[];
}

export interface TeamInfo {
  name: string;
  avatar: string;
  team_id: string;
}

export interface TeamDetails {
  name: string;
  nickname: string;
  avatar: string;
  team_id: string;
  members: Player[];
}

interface Player {
  user_id: string;
  nickname: string;
  avatar: string;
  faceit_url: string;
  country: string;
}

export interface Team {
  team_id: string;
  nickname: string;
  avatar: string;
  type: string;
  players: GamePlayer[];
}

interface GamePlayer {
  game_player_id: string;
  player_id: string;
  game_player_name: string;
  nickname: string;
  avatar: string;
  skill_level: number;
  faceit_url: string;
}

interface MatchResults {
  winner: string;
  score: {
    faction1: number;
    faction2: number;
  };
}

export interface Match {
  match_id: string;
  game_id: string;
  region: string;
  match_type: string;
  game_mode: string;
  max_players: number;
  teams_size: number;
  teams: {
    faction1: Team;
    faction2: Team;
  };
  playing_players: string[];
  competition_id: string;
  competition_name: string;
  competition_type: string;
  organizer_id: string;
  status: string;
  started_at: number;
  finished_at: number;
  results: MatchResults;
  faceit_url: string;
}

export interface FACEITHistory {
  items: Match[];
}

export interface PlayerDetails {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  faceit_url: string;
}
