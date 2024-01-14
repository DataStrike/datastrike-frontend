import { TrackerResult } from "@/models/tracker/columns.tsx";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  data: TrackerResult[];
}
export function WinRateScatter({ data }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Global winrate over time
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
          type: "scatter",
          data: {
            datasets: [
              {
                label: "Wins",
                data: [
                  {
                    x: 0,
                    y: 0,
                  },
                  {
                    x: 1,
                    y: 1,
                  },
                ],
                backgroundColor: "#4CAF50",
              },
              {
                label: "Losses",
                data: [
                  {
                    x: 0,
                    y: 1,
                  },
                  {
                    x: 1,
                    y: 0,
                  },
                ],
                backgroundColor: "#FF5252",
              },
              {
                label: "Draws",
                data: [
                  {
                    x: 0,
                    y: 0.5,
                  },
                  {
                    x: 1,
                    y: 0.5,
                  },
                ],
                backgroundColor: "#FFC107",
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
    <div className="flex flex-col gap-2">
      <div className="flex-grow">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
