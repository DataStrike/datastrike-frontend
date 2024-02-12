import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { TrackerResult } from "@/models/tracker/columns.tsx";
import { FormDataTrackerResult } from "@/models/overwatch/maps.ts";

async function getTrackerResults(teamId: number): Promise<TrackerResult[]> {
  if (!teamId) {
    throw new Error("Team id is required");
  }

  return await ky
    .get(`${BASE_URL}/teams/${teamId}/tracker`, {
      credentials: "include",
    })
    .json();
}

async function addTrackerResult(
  teamId: number,
  trackerResult: FormDataTrackerResult,
): Promise<void> {
  return await ky
    .post(`${BASE_URL}/teams/${teamId}/tracker`, {
      credentials: "include",
      json: trackerResult,
    })
    .json();
}

async function deleteTrackerResult(
  trackerResultId: number,
): Promise<void> {
  return await ky
    .delete(`${BASE_URL}/tracker/${trackerResultId}`, {
      credentials: "include",
    })
    .json();
}

export const trackerService = {
  getTrackerResults,
  addTrackerResult,
  deleteTrackerResult,
};
