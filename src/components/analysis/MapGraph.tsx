import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
      // Si le graphique existe déjà, le détruire avant de créer un nouveau graphique
      chartInstance.destroy();
    }

    var killPoint = new Image();
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
          pointRadius: mapData.data.events.map((event) => (event.type === 'kill' ? 10 : 5)), // Définir le rayon du point en fonction du type
          pointStyle: mapData.data.events.map((event) => (event.type === 'kill' ? killPoint : objectivePoint)),
          showLine: false,
        //   pointStyle: map.data.events.map((event) => (event.type === 'kill' ? kill : 'circle')),
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
                callback: (value) => new Date(value).toLocaleTimeString(),
              },
            },
            y: {
              min: 0,
              max: Math.max(...mapData.data.events.map((event) => event.value)) + 1,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (context) => "kill",
                label: (context) => {
                  const event = mapData.data.events[context.dataIndex];
                  return `${event.type}: ${event.description}`;
                },
              },
            },
          },
        },
      };

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, config);
      setChartInstance(newChartInstance);
    }

    // Nettoyer le graphique lors du démontage du composant
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [mapData]);

  // ...

  return <canvas ref={chartRef} />;
};

export default MapGraph;