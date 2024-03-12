import { TrackerResult } from "@/models/tracker/columns.tsx";

type MapAccumulator = {
  [map: string]: number;
};
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

const getMaps = (data: TrackerResult[]) => {
  return data.map((result: TrackerResult) => result.mapName);
};
const countMaps = (maps: string[]) => {
  return maps.reduce((acc: MapAccumulator, mapName: string) => {
    acc[mapName] ? acc[mapName]++ : (acc[mapName] = 1);
    return acc;
  }, {});
};

const getWinRate = (data: TrackerResult[], map: string) => {
  const wins = data.filter(
    (result: TrackerResult) => result.mapName === map && result.result === "W",
  ).length;
  const losses = data.filter(
    (result: TrackerResult) => result.mapName === map && result.result === "L",
  ).length;
  return `${((wins / (wins + losses)) * 100).toFixed(2)}%`;
};
export const topPlayedMaps = (data: TrackerResult[], nb: number) => {
  const maps = getMaps(data);
  const mapCount = countMaps(maps);
  const sortedMapCount = Object.entries(mapCount).sort((a, b) => b[1] - a[1]);
  return sortedMapCount.slice(0, nb);
};

export const winRateTopMaps = (data: TrackerResult[]) => {
  const topPlayed = topPlayedMaps(data, 5);
  return topPlayed.map((map) => {
    return [map[0], getWinRate(data, map[0])];
  });
};

export const winRateAllMaps = (data: TrackerResult[]) => {
  const maps = getMaps(data);
  const mapCount = countMaps(maps);
  const sortedMapCount = Object.entries(mapCount).sort((a, b) => b[1] - a[1]);
  return sortedMapCount.map((map) => {
    return [map[0], getWinRate(data, map[0])];
  });
};
