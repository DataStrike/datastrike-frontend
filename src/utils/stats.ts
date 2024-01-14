export const winRate = (data: any) => {
  const wins = data.filter((result: any) => result.result === "W").length;
  const losses = data.filter((result: any) => result.result === "L").length;
  return `${((wins / (wins + losses)) * 100).toFixed(2)}%`;
};
