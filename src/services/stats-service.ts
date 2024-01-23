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

async function getHeroes(): Promise<CharacterStats[]> {
  return await ky.get(`${STATS_URL}/heroes`).json();
}
async function getPlayerSummary(playerId: string): Promise<any> {
  return await ky.get(`${STATS_URL}/players/${playerId}/summary`).json();
}

async function getPlayerStats(playerId: string): Promise<any> {
  return await ky.get(`${STATS_URL}/players/${playerId}/stats/summary`).json();
}
async function searchPlayers(playerName: string): Promise<PlayerSummary> {
  return await ky.get(`${STATS_URL}/players?name=${playerName}`).json();
}

export const statsService = {
  getHeroes,
  getPlayerSummary,
  getPlayerStats,
  searchPlayers,
};
