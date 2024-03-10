import ky from "ky";
import { FACEIT_API_KEY, FACEIT_URL, STATS_URL } from "@/utils/constants.ts";
import { PlayerData } from "@/models/scouting/models.ts";
import {
  FACEITHistory,
  FACEITTeam,
  PlayerDetails,
  TeamDetails,
} from "@/models/scouting/faceit/models.ts";
import { MatchDetails } from "@/models/scouting/faceit/matchdetails.ts";
import { MatchStats } from "@/models/scouting/faceit/matchstats.ts";
import { TeamStats } from "@/models/scouting/faceit/team_stats.ts";
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
export const TEAMS_LIMIT = 50;
export const HISTORY_LIMIT = 50;

async function getHeroes(): Promise<CharacterStats[]> {
  return await ky.get(`${STATS_URL}/heroes`).json();
}
async function getPlayerSummary(playerId: string): Promise<any> {
  return await ky.get(`${STATS_URL}/players/${playerId}/summary`).json();
}

async function getPlayerStats(
  playerId: string,
  params: StatsParams = {},
): Promise<PlayerData> {
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

/////////////
// FACEIT API
/////////////
async function searchTeams(
  teamName: string,
  offset: number = 0,
): Promise<FACEITTeam> {
  return await ky
    .get(
      `${FACEIT_URL}/search/teams?nickname=${teamName}&offset=${offset}&limit=${TEAMS_LIMIT}&game=ow2`,
      {
        headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
      },
    )
    .json();
}
async function getTeamDetails(teamId: string): Promise<TeamDetails> {
  return await ky
    .get(`${FACEIT_URL}/teams/${teamId}`, {
      headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
    })
    .json();
}

async function getTeamStats(teamId: string): Promise<TeamStats> {
  return await ky
    .get(`${FACEIT_URL}/teams/${teamId}/stats/ow2`, {
      headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
    })
    .json();
}

async function getFaceitPlayerDetails(
  playerId: string,
): Promise<PlayerDetails> {
  return await ky
    .get(`${FACEIT_URL}/players/${playerId}`, {
      headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
    })
    .json();
}

async function getFaceitPlayerHistory(
  playerId: string,
): Promise<FACEITHistory> {
  return await ky
    .get(`${FACEIT_URL}/players/${playerId}/history?limit=${HISTORY_LIMIT}`, {
      headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
    })
    .json();
}

async function getFaceitMatchDetails(matchId: string): Promise<MatchDetails> {
  return await ky
    .get(`${FACEIT_URL}/matches/${matchId}`, {
      headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
    })
    .json();
}

async function getFaceitMatchStats(matchId: string): Promise<MatchStats> {
  return await ky
    .get(`${FACEIT_URL}/matches/${matchId}/stats`, {
      headers: { Authorization: `Bearer ${FACEIT_API_KEY}` },
    })
    .json();
}

export const blizzardScoutingService = {
  getHeroes,
  getPlayerSummary,
  getPlayerStats,
  searchPlayers,
};

export const faceitScoutingService = {
  searchTeams,
  getTeamDetails,
  getTeamStats,
  getFaceitPlayerHistory,
  getFaceitPlayerDetails,
  getFaceitMatchDetails,
  getFaceitMatchStats,
};
