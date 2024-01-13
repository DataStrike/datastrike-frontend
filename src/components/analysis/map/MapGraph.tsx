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

  Chart.register(zoomPlugin)

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
          data: mapData.data.events.map((event) => ({ x: parseFloat(event.timestamp), y: event.value })), // Utiliser les timestamps convertis pour les données x
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
                  return `${event.timestamp}: ${event.description}`;
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
                x: { min: 'original', max: 'original' },
                y: { min: 'original', max: 'original' },
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


  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MapGraph;