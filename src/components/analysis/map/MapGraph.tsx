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
 
  useEffect(() => {

    if (chartInstance) {
      chartInstance.destroy();
    }

    const killTeam1Point = new Image();
    killTeam1Point.src = killTeam1;

    const killTeam2Point = new Image();
    killTeam2Point.src = killTeam2;

    const objectivePoint = new Image();
    objectivePoint.src = objectiveIcon;


    console.info('Map data:', mapData)

    const FirstRound = mapData.data.rounds[0];

    var playerNames: any[] = []
    

    Object.values(FirstRound.teams).map((team) => (
      

      Object.values(team.players).map((player) => (
    
        playerNames.push(player.name))
        

    )))

  


    if (mapData && mapData.data) {

// Mapper les noms de joueurs aux données individuelles
        const playerData = playerNames.map((playerName, index) => {
          const playerEvents = mapData.data.events.filter((event: { player: string }) => event.player === playerName);
          console.info('Player events:', playerEvents);
          return {
            label: playerName,
            backgroundColor: `rgba(75, 192, 192, 0.2)`,
            borderColor: `rgba(75, 192, 192, 1)`,
            borderWidth: 1,
            pointRadius: playerEvents.map((event: { type: string }) => (event.type === 'kill' ? 10 : 5)),
            pointStyle: playerEvents.map((event: { type: string }) => {
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
            data: playerEvents.map((event: { timestamp: string; value: any }) => ({
              x: parseFloat(event.timestamp),
              y: playerName, // Utiliser les indices des joueurs comme catégories y
              description: event.description,
              type: event.type,
            })),
          };
        });

      const labels = mapData.data.events.map((event: { timestamp: any; }) => event.timestamp);

      console.info('Labels:', labels);
      console.info('Player Data:', playerData);

      const config = {
        type: 'line',
        data: {
          labels: labels,
          datasets: playerData,
        },
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              beginAtZero: true,
            },
            y: {
              type: 'category', // Utiliser le type 'category' pour l'axe y
              labels: playerNames,
              beginAtZero: true,
              offset: true,
              // min: 10,

            },
          },
          plugins: {

            legend: {
              display: false,
            },

            tooltip: {
              callbacks: {
                title: (context: { dataIndex: string | number; }[]) => {
                  
                  const playerIndex = context // Get the index of the playerData array
                  const playerEvent = context[0].dataset.data[context[0].dataIndex]; 

                  return playerEvent.type || "";
                },
                label: (context: { dataIndex: string | number; }) => {
                  const playerIndex = context.datasetIndex; // Get the index of the playerData array
                  const playerEvent = playerData[playerIndex].data[context.dataIndex]; 
                  return `${playerEvent.x}: ${playerEvent.description}`;
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
                mode: 'x',
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