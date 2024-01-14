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
