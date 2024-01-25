export interface ClassicStats {
  assists: number;
  damage: number;
  deaths: number;
  eliminations: number;
  healing: number;
}

export interface Data {
  average: ClassicStats;
  games_lost: number;
  games_played: number;
  games_won: number;
  kda: number;
  time_played: number;
  total: ClassicStats;
  winrate: number;
}

export interface HeroesData {
  [hero: string]: Data;
}
export interface RolesData {
  damage: Data;
  support: Data;
  tank: Data;
}

export interface PlayerData {
  general: Data;
  heroes: HeroesData;
  roles: RolesData;
}
