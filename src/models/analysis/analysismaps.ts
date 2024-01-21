export interface AnalysisMap {
  id: number;
  date: string;
  mapName: string;
  mapType: string;
  team1Name: string;
  team2Name: string;
  team1Score: number;
  team2Score: number;
  data: Data;
}

export interface Data {
  class_name: string;
  date: string;
  events: DataEvent[];
  map_name: string;
  map_type: string;
  rounds: Round[];
  team1_name: string;
  team1_score: number;
  team2_name: string;
  team2_score: number;
  team_id: number;
}

export interface DataEvent {
  type: string;
  timestamp: string;
  player: string;
  description: string;
}

export interface Round {
  class_name: string;
  teams: Record<string, Team>;
  start_time: string;
  end_time: string;
  objective_captured?: ObjectiveCaptured[];
  objective_progress?: ObjectiveProgress[];
}

export interface Team {
  class_name: string;
  name: string;
  players: Record<string, Player>;
}

export interface Player {
  class_name: string;
  name: string;
  characters: Record<string, Character>;
}

export interface Character {
  class_name: string;
  name: string;
  played_time: PlayedTime[];
  stats: CharacterStats;
  deaths: Death[];
  kills: Kill[];
  ultimate_charged: string[];
  ultimate_use: UltimateUse[];
}

export interface PlayedTime {
  start: string;
  end: string;
}

export interface CharacterStats {
  barrier_damage: string;
  critical_hits_accuracy: string;
  damage: string;
  damage_blocked: string;
  damage_taken: string;
  deaths: string;
  defensive_assist: string;
  eliminations: string;
  final_blows: string;
  healing: string;
  healing_receive: string;
  hero_damage: string;
  hero_time_played: string;
  offensive_assists: string;
  round_most_damage: string;
  self_healing: string;
  solo_kills: string;
  ultimated_earn: string;
  ultimates_used: string;
  weapon_accuracy: string;
}

export interface Kill {
  time: string;
  player_victim: string;
  character_victim: string;
}

export interface Death {
  time: string;
  player_killer: string;
  character_killer: string;
}

export interface ObjectiveCaptured {
  time: string;
  team_name: string;
  control_team1_progress: string;
  control_team2_progress: string;
}

export interface ObjectiveProgress {
  time: string;
  team_name: string;
  progress: string;
}

export interface UltimateUse {
  start: string;
  end: string;
}

export interface GraphDataStats {
  round: number;
  stats: { [key: string]: number };
}
