import { TrackerResult } from "@/models/tracker/columns.tsx";

export const winRate = (data: TrackerResult[]) => {
  const wins = data.filter(
    (result: TrackerResult) => result.result === "W",
  ).length;
  const losses = data.filter(
    (result: TrackerResult) => result.result === "L",
  ).length;
  return `${((wins / (wins + losses)) * 100).toFixed(2)}%`;
};

// Get the average number of games played per day
export const nbAvgGames = (data: TrackerResult[]) => {
  const dates = data.map((result: TrackerResult) => result.date);
  const uniqueDates = [...new Set(dates)];
  return (data.length / uniqueDates.length).toFixed(2);
};
