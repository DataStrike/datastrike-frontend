import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";

async function getMaps(teamId: number): Promise<AnalysisMap[]> {
  if (!teamId) {
    throw new Error("Team id is required");
  }

  return await ky
    .get(`${BASE_URL}/teams/${teamId}/maps`, {
      credentials: "include",
    })
    .json();
}
async function addAnalysisMaps(teamId: number, maps: FormData): Promise<void> {
  await ky.post(`${BASE_URL}/teams/${teamId}/maps`, {
    credentials: "include",
    body: maps,
  });
}

export const mapsService = {
  addAnalysisMaps,
  getMaps,
};
