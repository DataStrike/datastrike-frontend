import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

interface DynamicGraphProps {
  data: { [player: string]: { round: number; stats: { [key: string]: number } }[] };
  selectedStats: string[];
}

const DynamicGraph: React.FC<DynamicGraphProps> = ({ data, selectedStats }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<any>(null);

  Chart.register(zoomPlugin);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const rounds = Object.values(data)[0].map((entry) => entry.round); // Assuming all players have the same rounds
    const datasets = selectedStats.flatMap((selectedStat) => {
      return Object.keys(data).map((player) => {
        return {
          label: `${player} - ${selectedStat}`,
          data: data[player].map((roundEntry, index) => ({
            x: index,
            y: roundEntry.stats[selectedStat],
          })),
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
          backgroundColor: 'transparent',
          borderWidth: 2,
          pointRadius: 5,
        };
      });
    });
    
    console.log("rounds:", rounds);
    console.log("datasets:", datasets);
    console.log("data:", data)

    const config = {
        type: 'line',
        data: {
          labels: rounds,
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              beginAtZero: true,
            },
            y: {
              type: 'linear',
              position: 'left',
              beginAtZero: true,
            },
          },
        },
      };

    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, config);
    setChartInstance(newChartInstance);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default DynamicGraph;