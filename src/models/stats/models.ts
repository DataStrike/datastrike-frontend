export interface HeroAverageStats {
  assists: number;
  damage: number;
  deaths: number;
  eliminations: number;
  healing: number;
}

export interface HeroTotalStats {
  assists: number;
  damage: number;
  deaths: number;
  eliminations: number;
  healing: number;
}

export interface HeroStats {
  average: HeroAverageStats;
  games_lost: number;
  games_played: number;
  games_won: number;
  kda: number;
  time_played: number;
  total: HeroTotalStats;
  winrate: number;
}

export interface HeroesData {
  [hero: string]: HeroStats;
}

export interface RoleAverageStats {
  assists: number;
  damage: number;
  deaths: number;
  eliminations: number;
  healing: number;
}

export interface RoleTotalStats {
  assists: number;
  damage: number;
  deaths: number;
  eliminations: number;
  healing: number;
}

export interface RoleStats {
  average: RoleAverageStats;
  games_lost: number;
  games_played: number;
  games_won: number;
  kda: number;
  time_played: number;
  total: RoleTotalStats;
  winrate: number;
}

export interface RolesData {
  damage: RoleStats;
  support: RoleStats;
  tank: RoleStats;
}

export interface GeneralStats {
  average: {
    assists: number;
    damage: number;
    deaths: number;
    eliminations: number;
    healing: number;
  };
  games_lost: number;
  games_played: number;
  games_won: number;
  kda: number;
  time_played: number;
  total: {
    assists: number;
    damage: number;
    deaths: number;
    eliminations: number;
    healing: number;
  };
  winrate: number;
}

export interface PlayerData {
  general: GeneralStats;
  heroes: HeroesData;
  roles: RolesData;
}
