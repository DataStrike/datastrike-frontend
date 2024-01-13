import ky from "ky";
import { BASE_URL } from "@/utils/constants.ts";
import { TrackerResult } from "@/models/tracker/columns.tsx";

export async function getTrackerResults(
  teamName: string,
): Promise<TrackerResult[]> {
  if (!teamName) {
    throw new Error("Team name is required");
  }

  return await ky
    .get(`${BASE_URL}/tracker/${teamName}`, {
      credentials: "include",
    })
    .json();
}
