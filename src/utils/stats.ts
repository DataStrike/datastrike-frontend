import { TrackerResult } from "@/models/tracker/columns.tsx";
import { MapName, OW_MAPS } from "@/models/overwatch/maps.ts";
import { capitalize } from "@/utils/functions.ts";

export const findMapType = (mapName: MapName | "") => {
  if (mapName === "") return "";
  for (const [mapType, mapList] of Object.entries(OW_MAPS)) {
    if (mapList.includes(capitalize(mapName) as MapName)) {
      return mapType;
    }
  }
};

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
    return [map[0], getWinRate(data, map[0]), map[1]];
  });
};

export const winRateAllModes = (data: TrackerResult[]) => {
  const modeData = data.reduce(
    (acc, result) => {
      const mapType = findMapType(result.mapName as MapName);
      if (mapType) {
        const mode = acc[mapType] || {
          wins: 0,
          losses: 0,
          draws: 0,
        };
        switch (result.result) {
          case "W":
            mode.wins++;
            break;
          case "L":
            mode.losses++;
            break;
          case "D":
            mode.draws++;
            break;
        }
        acc[mapType] = mode;
      }
      return acc;
    },
    {} as Record<
      string,
      { wins: number; losses: number; draws: number; winRate: string }
    >,
  );

  const sortedModeData = Object.entries(modeData).sort((a, b) => {
    const aTotal = a[1].wins + a[1].losses + a[1].draws;
    const bTotal = b[1].wins + b[1].losses + b[1].draws;
    return bTotal - aTotal;
  });

  return sortedModeData.map(([mode, data]) => {
    return [
      mode,
      `${((data.wins / (data.wins + data.losses)) * 100).toFixed(2)}%`,
      data.wins + data.losses + data.draws,
    ];
  });
};

export const winRateOpponents = (data: TrackerResult[]) => {
  const opponents = data.map((result) => result.opponentTeamName);
  const opponentCount = opponents.reduce(
    (acc, opponent) => {
      acc[opponent] ? acc[opponent]++ : (acc[opponent] = 1);
      return acc;
    },
    {} as Record<string, number>,
  );

  // Sort opponents by the number of games played
  const sortedOpponents = Object.entries(opponentCount).sort(
    (a, b) => b[1] - a[1],
  );

  return sortedOpponents.map(([opponent]) => {
    const wins = data.filter(
      (result: TrackerResult) =>
        result.opponentTeamName === opponent && result.result === "W",
    ).length;
    const losses = data.filter(
      (result: TrackerResult) =>
        result.opponentTeamName === opponent && result.result === "L",
    ).length;
    const winrate = (wins / (wins + losses)) * 100;
    // If there are no games played, return N/A instead of NaN
    return [
      opponent,
      winrate ? `${winrate.toFixed(2)}%` : "N/A",
      opponentCount[opponent],
    ];
  });
};
