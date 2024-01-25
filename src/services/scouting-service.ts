import ky from "ky";
import { STATS_URL } from "@/utils/constants.ts";
export type CharacterStats = {
  key: string;
  name: string;
  portrait: string;
  role: string;
};
export type PlayerInfos = {
  avatar: string;
  player_id: string;
  name: string;
  privacy: string;
  career_url: string;
};

export type PlayerSummary = {
  total: number;
  results: PlayerInfos[];
};

export type StatsParams = {
  gamemode?: GameMode;
  platform?: Platform;
};

export type GameMode = "competitive" | "quickplay";
export type Platform = "pc" | "console";

export const PLAYERS_LIMIT = 50;

async function getHeroes(): Promise<CharacterStats[]> {
  return await ky.get(`${STATS_URL}/heroes`).json();
}
async function getPlayerSummary(playerId: string): Promise<any> {
  return await ky.get(`${STATS_URL}/players/${playerId}/summary`).json();
}

async function getPlayerStats(
  playerId: string,
  params: StatsParams = {},
): Promise<any> {
  if (
    params.gamemode &&
    !["competitive", "quickplay"].includes(params.gamemode)
  ) {
    throw new Error("Invalid gamemode");
  }

  // Validate platform if provided
  if (params.platform && !["pc", "console"].includes(params.platform)) {
    throw new Error("Invalid platform");
  }

  // Build URL with optional parameters
  let url = `${STATS_URL}/players/${playerId}/stats/summary`;

  if (params.gamemode) {
    url += `?gamemode=${params.gamemode}`;
  }

  // Append platform to the URL if provided
  if (params.platform) {
    url += `${params.gamemode ? "&" : "?"}platform=${params.platform}`;
  }
  return await ky.get(url).json();
}
async function searchPlayers(
  playerName: string,
  offset: number = 0,
): Promise<PlayerSummary> {
  return await ky
    .get(
      `${STATS_URL}/players?name=${playerName}&offset=${offset}&limit=${PLAYERS_LIMIT}`,
    )
    .json();
}

export const scoutingService = {
  getHeroes,
  getPlayerSummary,
  getPlayerStats,
  searchPlayers,
};
