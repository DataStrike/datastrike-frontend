import { TrackerResult } from "@/models/tracker/columns.tsx";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  data: TrackerResult[];
}

export function WinRateOverTime({ data }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart;

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Group data by date and calculate win rates for each day
        const groupedData = data.reduce(
          (acc, result) => {
            const date = result.date;
            const dayData = acc[date] || {
              total: 0,
              wins: 0,
              losses: 0,
              draws: 0,
            };

            dayData.total++;
            switch (result.result) {
              case "W":
                dayData.wins++;
                break;
              case "L":
                dayData.losses++;
                break;
              case "D":
                dayData.draws++;
                break;
            }

            acc[date] = dayData;

            return acc;
          },
          {} as Record<
            string,
            {
              total: number;
              wins: number;
              draws: number;
              losses: number;
            }
          >,
        );

        // Calculate cumulative win rates based on global win rate
        let cumulativeWins = 0;
        let cumulativeTotal = 0;

        // Sort the groupedData by their key (the date) and map the win rates
        const cumulativeWinRates = Object.keys(groupedData)
          .sort()
          .map((date) => {
            cumulativeWins += groupedData[date].wins;
            cumulativeTotal +=
              groupedData[date].total - groupedData[date].draws;
            return (cumulativeWins / cumulativeTotal) * 100;
          });

        const localWinRates = Object.keys(groupedData)
          .sort()
          .map((date) => {
            return (
              (groupedData[date].wins /
                (groupedData[date].total - groupedData[date].draws)) *
              100
            );
          });

        const formattedLabels = Object.keys(groupedData)
          .sort()
          .map((date) => {
            return date.slice(0, 10);
          });

        new Chart(ctx, {
          type: "line",
          data: {
            labels: formattedLabels,
            datasets: [
              {
                label: "Win Rate",
                data: cumulativeWinRates,
                borderColor: "#4CAF50",
                borderWidth: 4,
                pointRadius: 5,
                pointBackgroundColor: "#4CAF50",
                fill: false,
                tension: 0.1,
              },
              {
                label: "Local Win Rate",
                data: localWinRates,
                pointRadius: 5,
                borderWidth: 2,
                pointBackgroundColor: "#FFC107",
                fill: false,
                tension: 0.1,
              },
            ],
          },
          options: {
            clip: 16,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "bottom",
              },
            },
            scales: {
              x: {
                type: "category",
                labels: formattedLabels,
                position: "bottom",
              },
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 10,
                },
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
    <div className="w-[600px] h-[350px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
