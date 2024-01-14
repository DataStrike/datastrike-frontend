import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

import annotationPlugin from 'chartjs-plugin-annotation';
import killTeam1 from '@/assets/analysis/kill_team1.png';
import killTeam2 from '@/assets/analysis/kill_team2.png';
import objectiveIcon from '@/assets/analysis/objectif.png';

interface MapGraphProps {
  mapData: any;
}

const MapGraph: React.FC<MapGraphProps> = ({ mapData }) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<any>(null);

  Chart.register(zoomPlugin)
  Chart.register(annotationPlugin);

  const annotationOptions = mapData.data.rounds.map((round: { start_time: string, end_time: string }, index: number) => ({
    type: 'box',
    drawTime: 'beforeDatasetsDraw',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: round.start_time,
    xMax: round.end_time,
    backgroundColor: `rgba(135, 137, 140, ${0.1 + 0.1 * index})`,
  }));
 
  console.info('Annotation options:', annotationOptions);


  useEffect(() => {

    if (chartInstance) {
      chartInstance.destroy();
    }

    console.info('Map data:', mapData)

    const killTeam1Point = new Image();
    killTeam1Point.src = killTeam1;

    const killTeam2Point = new Image();
    killTeam2Point.src = killTeam2;

    const objectivePoint = new Image();
    objectivePoint.src = objectiveIcon;

    if (mapData && mapData.data) {
      const labels = mapData.data.events.map((event: { timestamp: any; }) => event.timestamp);

      const datasets = [
        {
          label: 'Timeline',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          pointRadius: mapData.data.events.map((event: { type: string; }) => (event.type === 'kill' ? 10 : 5)),
          pointStyle: mapData.data.events.map((event: { type: string; }) => {
            if (event.type === 'kill_team1') {
              return killTeam1Point;
            } else if (event.type === 'kill_team2') {
              return killTeam2Point;
            } else if (event.type === 'objective') {
              return objectivePoint;
            } else {
              return null;
            }
          }),
          showLine: false,
          data: mapData.data.events.map((event: { timestamp: string; value: any; }) => ({ x: parseFloat(event.timestamp), y: event.value })), // Utiliser les timestamps convertis pour les données x
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
              max: Math.max(...mapData.data.events.map((event: { value: any; }) => event.value)) + 1,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context: { dataIndex: string | number; }[]) => {
                  if (context[0]) {
                    const event = mapData.data.events[context[0].dataIndex];
                    return event.type || "";
                  }
                  return "";
                },
                label: (context: { dataIndex: string | number; }) => {
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
            annotation: {
              annotations: annotationOptions,
            }
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