interface Player {
  player_id: string;
  nickname: string;
  avatar: string;
  membership: string;
  game_player_id: string;
  game_player_name: string;
  game_skill_level: number;
  anticheat_required: boolean;
}

interface Faction {
  faction_id: string;
  leader: string;
  avatar: string;
  roster: Player[];
  substituted: boolean;
  name: string;
  type: string;
}

interface MapEntity {
  name: string;
  class_name: string;
  game_map_id: string;
  guid: string;
  image_lg: string;
  image_sm: string;
}

interface Voting {
  voted_entity_types: string[];
  map: {
    entities: MapEntity[];
    pick: string[];
  };
  attacking_first: {
    entities: MapEntity[];
    pick: string[];
  };
}

interface Results {
  winner: string;
  score: {
    [key: string]: number;
  };
}

interface DetailedResult {
  asc_score: boolean;
  winner: string;
  factions: {
    [key: string]: {
      score: number;
    };
  };
}

export interface MatchDetails {
  match_id: string;
  version: number;
  game: string;
  region: string;
  competition_id: string;
  competition_type: string;
  competition_name: string;
  organizer_id: string;
  teams: {
    faction1: Faction;
    faction2: Faction;
  };
  voting: Voting;
  calculate_elo: boolean;
  scheduled_at: number;
  configured_at: number;
  started_at: number;
  finished_at: number;
  chat_room_id: string;
  best_of: number;
  results: Results;
  detailed_results: DetailedResult[];
  status: string;
  round: number;
  group: number;
  faceit_url: string;
}
