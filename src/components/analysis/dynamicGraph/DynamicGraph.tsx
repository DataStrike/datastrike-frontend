import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import { GraphDataStats } from "@/models/analysis/analysismaps.ts";
import { GRAPH_COLORS } from "@/utils/constants.ts";

interface DynamicGraphProps {
  data: { [playerName: string]: GraphDataStats[] };
  selectedStats: string[];
}

const DynamicGraph: React.FC<DynamicGraphProps> = ({ data, selectedStats }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  Chart.register(zoomPlugin);
  const [playerColors, setPlayerColors] = useState<{
    [player: string]: string;
  }>({});

  useEffect(() => {
    const players = Object.keys(data).slice(0, 10);
    const colorMap: { [player: string]: string } = {};

    players.forEach((player, index) => {
      colorMap[player] = GRAPH_COLORS[index];
    });

    setPlayerColors(colorMap);
  }, [data]);

  useEffect(() => {
    let chartInstance: Chart | undefined;

    if (chartRef.current && Object.keys(playerColors).length > 0) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [],
          },
          options: {
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                beginAtZero: true,
              },
              y: {
                type: "linear",
                position: "left",
                beginAtZero: true,
              },
            },
          },
        });

        const rounds = Object.values(data)[0].map((entry) => entry.round);
        const datasets = selectedStats.flatMap((selectedStat) => {
          return Object.keys(data).map((player) => {
            return {
              label: `${player} - ${selectedStat}`,
              data: data[player].map((roundEntry, index) => ({
                x: index,
                y: roundEntry.stats[selectedStat],
              })),
              borderColor: playerColors[player],
              backgroundColor: "transparent",
              borderWidth: 2,
              pointRadius: 5,
            };
          });
        });

        chartInstance.data.labels = rounds;
        chartInstance.data.datasets = datasets;
        chartInstance.update();
      }

      return () => {
        if (chartInstance) {
          console.log("Destroying chart instance");
          chartInstance.destroy();
        }
      };
    }
  }, [data, selectedStats, playerColors]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DynamicGraph;
