import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  data: {
    games_played: number;
    games_won: number;
    games_lost: number;
    time_played: number;
    winrate: number;
    kda: number;
    total: {
      eliminations: number;
      assists: number;
      deaths: number;
      damage: number;
      healing: number;
    };
    average: {
      eliminations: number;
      assists: number;
      deaths: number;
      damage: number;
      healing: number;
    };
  };
}

export function PlayerStatsChart({ data }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Games Won", "Games Lost"],
            datasets: [
              {
                data: [data.games_won, data.games_lost],
                backgroundColor: ["#4CAF50", "#FF5252"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        });
      }
    }

    // Clean up the chart on component unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div className="w-[300px] h-[150px]">
      <canvas ref={chartRef} width="w-full" height="h-full"></canvas>
    </div>
  );
}

export default PlayerStatsChart;
