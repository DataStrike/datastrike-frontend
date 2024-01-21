import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";

async function getMapList(teamId: number): Promise<AnalysisMap[]> {
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

async function getMap(mapId: string | undefined): Promise<AnalysisMap> {
  if (!mapId) {
    throw new Error("Map id is required");
  }

  return await ky
    .get(`${BASE_URL}/maps/${mapId}`, {
      credentials: "include",
    })
    .json();
}

export const mapsService = {
  addAnalysisMaps,
  getMapList,
  getMap,
};
