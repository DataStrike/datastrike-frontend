import { Team } from "@/models/teams/columns.tsx";
import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";

export async function getTeams(): Promise<Team[]> {
  return await ky
    .get(`${BASE_URL}/teams`, {
      credentials: "include",
    })
    .json();
}

async function kickUser(teamId: number, userId: number): Promise<void> {
  await ky.delete(`${BASE_URL}/teams/${teamId}/users/${userId}`, {
    credentials: "include",
  });
}

export async function markAdmin(teamId: number, userId: number): Promise<void> {
  await ky.put(`${BASE_URL}/teams/${teamId}/users/${userId}`, {
    credentials: "include",
  });
}

export async function regenerateCode(teamId: number): Promise<void> {
  await ky.put(`${BASE_URL}/teams/${teamId}/code`, {
    credentials: "include",
  });
}
export const teamsService = {
  getTeams,
  kickUser,
  markAdmin,
  regenerateCode,
};
