import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

import zoomPlugin from 'chartjs-plugin-zoom';
import killIcon from '@/assets/kill.png';
import objectiveIcon from '@/assets/objectif.png';

interface MapGraphProps {
  mapData: any;
}

const MapGraph: React.FC<MapGraphProps> = ({ mapData }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<any>(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const killPoint = new Image();
    killPoint.src = killIcon;

    const objectivePoint = new Image();
    objectivePoint.src = objectiveIcon;

    if (mapData && mapData.data) {
      const labels = mapData.data.events.map((event) => event.timestamp);

      const datasets = [
        {
          label: 'Timeline',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          pointRadius: mapData.data.events.map((event) => (event.type === 'kill' ? 10 : 5)),
          pointStyle: mapData.data.events.map((event) => (event.type === 'kill' ? killPoint : objectivePoint)),
          showLine: false,
          data: mapData.data.events.map((event) => event.value),
        },
      ];

      const config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              ticks: {
                callback: (value) => {
                  return Math.floor(value / 1000);
                },
              },
              beginAtZero: true,
            },
            y: {
              min: 0,
              max: Math.max(...mapData.data.events.map((event) => event.value)) + 1,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => {
                  if (context[0]) {
                    const event = mapData.data.events[context[0].dataIndex];
                    return event.type || "";
                  }
                  return "";
                },
                label: (context) => {
                  const event = mapData.data.events[context.dataIndex];
                  return `${event.type}: ${event.description}`;
                },
              },
            },
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
              pan: {
                enabled: true,
                mode: 'xy',
              },
            },
          },
        },
      };

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [mapData]);

  // Fonction pour zoomer sur l'axe x
  const zoomInX = () => {
    if (chartInstance) {
      chartInstance.zoom('x', 1.1);
    }
  };

  // Fonction pour dézoomer sur l'axe x
  const zoomOutX = () => {
    if (chartInstance) {
      chartInstance.zoom('x', 0.9);
    }
  };

  return (
    <div>
      <button onClick={zoomInX}>Zoom In X</button>
      <button onClick={zoomOutX}>Zoom Out X</button>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MapGraph;