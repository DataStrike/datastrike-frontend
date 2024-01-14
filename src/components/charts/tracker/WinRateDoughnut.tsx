import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { TrackerResult } from "@/models/tracker/columns.tsx";

interface Props {
  data: TrackerResult[];
}

export function WinRateTrackerChart({ data }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart;

    if (chartRef.current) {
      const wins = data.filter((result) => result.result === "W").length;
      const losses = data.filter((result) => result.result === "L").length;
      const draws = data.filter((result) => result.result === "D").length;

      const winRate = (wins / data.length) * 100;

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["Wins", "Losses", "Draws"],
            datasets: [
              {
                data: [wins, losses, draws],
                backgroundColor: ["#4CAF50", "#FF5252", "#FFC107"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: `Win Rate: ${winRate.toFixed(2)}%`,
                font: {
                  size: 16,
                },
              },
              legend: {
                display: false,
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

export default WinRateTrackerChart;
