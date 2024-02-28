import React, { useEffect, useRef } from "react";
import Chart, { TooltipItem } from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import deathIcon from "@/assets/analysis/death.png";
import killIcon from "@/assets/analysis/kill.png";
import ultimateIcon from "@/assets/analysis/ultimate.png";
import objectiveIcon from "@/assets/analysis/objectif.png";
import swapHeroIcon from "@/assets/analysis/swapHero.png";
import { AnalysisMap, DataEvent } from "@/models/analysis/analysismaps.ts";
import { capitalize } from "@/utils/functions.ts";
import { detectFights } from "@/utils/analysis/timeline.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface MapGraphProps {
  mapData: AnalysisMap;
}

const MapGraph: React.FC<MapGraphProps> = ({ mapData }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  Chart.register(zoomPlugin);
  Chart.register(annotationPlugin);

  const annotationOptions: AnnotationOptions[] = mapData.data.rounds.map(
    (round: { start_time: string; end_time: string }, index: number) => ({
      type: "box",
      drawTime: "beforeDatasetsDraw",
      xScaleID: "x",
      yScaleID: "y",
      xMin: round.start_time,
      xMax: round.end_time,
      backgroundColor: `rgba(135, 137, 140, ${0.1 + 0.1 * index})`,
    }),
  );

  useEffect(() => {
    let chartInstance: Chart | undefined;

    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const DeathPoint = new Image();
      DeathPoint.src = deathIcon;

      const killPoint = new Image();
      killPoint.src = killIcon;

      const objectivePoint = new Image();
      objectivePoint.src = objectiveIcon;

      const ultimatePoint = new Image();
      ultimatePoint.src = ultimateIcon;

      const swapHeroPoint = new Image();
      swapHeroPoint.src = swapHeroIcon;

      const FirstRound = mapData.data.rounds[0];

      const playerNames: string[] = [];

      Object.values(FirstRound.teams).map((team) =>
        Object.values(team.players).map((player) =>
          playerNames.push(player.name),
        ),
      );

      if (mapData && mapData.data) {
        const playerData = playerNames.map((playerName) => {
          const playerEvents = mapData.data.events.filter(
            (event: { player: string }) => event.player === playerName,
          );
          return {
            label: playerName,
            backgroundColor: `rgba(75, 192, 192, 0.2)`,
            borderColor: `rgba(75, 192, 192, 1)`,
            borderWidth: 1,
            pointRadius: playerEvents.map((event: { type: string }) =>
              event.type === "kill" ? 10 : 5,
            ),
            pointStyle: playerEvents.map((event: { type: string }) => {
              if (event.type === "death") {
                return DeathPoint;
              } else if (event.type === "kill") {
                return killPoint;
              } else if (event.type === "objective") {
                return objectivePoint;
              } else if (event.type === "ultimate") {
                return ultimatePoint;
              } else if (event.type === "hero_swap") {
                return swapHeroPoint;
              } else {
                return undefined; // Return undefined for other cases
              }
            }),
            showLine: false,
            data: playerEvents.map((event: DataEvent) => ({
              x: parseFloat(event.timestamp),
              y: playerName,
              description: event.description,
              type: event.type,
            })),
          };
        });

        const labels = mapData.data.events.map(
          (event: DataEvent) => event.timestamp,
        );

        const ctx = chartRef.current.getContext("2d");

        if (!ctx) return;
        new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: playerData,
          },
          options: {
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                beginAtZero: true,
              },
              y: {
                type: "category",
                labels: playerNames,
                offset: true,
              },
            },
            plugins: {
              legend: {
                display: false,
              },

              tooltip: {
                callbacks: {
                  title: (itemList: TooltipItem<never>[]) => {
                    const context = itemList[0];
                    const playerEvent =
                      playerData[context.datasetIndex].data[context.dataIndex];
                    if (!playerEvent) return "";
                    return capitalize(playerEvent.type);
                  },
                  label: (item: TooltipItem<never>) => {
                    const playerIndex = item.datasetIndex;
                    const playerEvent =
                      playerData[playerIndex].data[item.dataIndex];
                    return `${playerEvent.x}: ${playerEvent.description}`;
                  },
                },
              },
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                    speed: 0.05,
                  },
                  pinch: {
                    enabled: true,
                  },
                  mode: "x",
                },
                pan: {
                  enabled: true,
                  mode: "xy",
                },
              },
              annotation: {
                annotations: annotationOptions,
              },
            },
          },
        });
      }

      return () => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      };
    }
  }, [mapData]);

  const fights = detectFights(mapData.data, 10);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold">Timeline</h2>
      <div className="w-5/6">
        <canvas ref={chartRef} />
      </div>
      <h2 className="text-xl font-bold">Fights</h2>
      <div className="flex gap-4 w-full flex-wrap">
        {fights.map((fight, index) => (
          <Card className="w-fit h-fit" key={index}>
            {fight.at(0)!.timestamp && (
              <CardHeader>
                <CardTitle>{fight.at(0)!.timestamp}s</CardTitle>
              </CardHeader>
            )}
            <CardContent>
              {fight.map((event, index) => (
                <div key={index}>
                  <p>{event.timestamp}</p>
                  <p>{event.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapGraph;
