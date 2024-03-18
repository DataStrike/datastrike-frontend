import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { TrackerResult } from "@/models/tracker/columns.tsx";
import { winRateAllModes } from "@/utils/stats.ts";

interface Props {
  data: TrackerResult[];
}

export function WinRateModesBarChart({ data }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart;

    if (chartRef.current) {
      // Group data by mode and calculate win rates for each mode
      const wr = winRateAllModes(data);
      // Convert string percentages to Number between 0 and 1
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: wr.map((mode) => mode[0]),
            datasets: [
              {
                label: "Win Rate",
                data: wr.map((mode) => {
                  const winRate =
                    typeof mode[1] === "string"
                      ? Number(mode[1].replace("%", ""))
                      : mode[1];
                  return winRate / 100;
                }),
                // background color should be linear gradient (from green to red) based on win rate
                backgroundColor: wr.map((mode) => {
                  const winRate =
                    typeof mode[1] === "string"
                      ? Number(mode[1].replace("%", ""))
                      : mode[1];
                  const green = 0;
                  const red = 255;
                  const color = Math.round((winRate / 100) * 220);
                  return `rgba(${red - color}, ${green + color}, 0, 0.5)`;
                }),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
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
    <div className="w-[600px] h-[300px]">
      <canvas ref={chartRef} width="w-full" height="h-full"></canvas>
    </div>
  );
}

export default WinRateModesBarChart;
