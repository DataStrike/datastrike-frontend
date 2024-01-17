import React, { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import StatsList from './StatsList';
import PlayerGraph from './DynamicGraph';

interface PlayerStatsGraphProps {
  mapData: any; // Remplacez "any" par le type approprié pour vos données
}

const PlayerStatsGraph: React.FC<PlayerStatsGraphProps> = ({ mapData }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedStats, setSelectedStats] = useState<string[]>([]);
  const [dataGraph, setDataGraph] = useState<{ [key: string]: any }>({});

  const handlePlayersSelected = (players: string[]) => {
    setSelectedPlayers(players);
  };

  const handleStatsSelected = (stats: string[]) => {
    setSelectedStats(stats);
  };

  useEffect(() => {
    let listeJoueursFiltres = {};

    mapData.data.rounds.forEach((round, index) => {
      for (const [nomEquipe, equipe] of Object.entries(round.teams)) {
        for (const [nomJoueur, joueur] of Object.entries(equipe.players)) {
          if (selectedPlayers.includes(joueur.name)) {
            const statsAgregats = {};
            for (const character of Object.values(joueur.characters)) {
              if (character.stats && Object.keys(character.stats).length > 0) {
                const statsNumeriques = {};
                for (const [key, value] of Object.entries(character.stats)) {
                  statsNumeriques[key] = parseFloat(value);
                }
                  
                for (const [key, value] of Object.entries(statsNumeriques)) {
                  if (statsAgregats[key]) {
                    statsAgregats[key] += value;
                  } else {
                    statsAgregats[key] = value;
                  }
                }
              }
            }
            if (Object.keys(statsAgregats).length > 0) {
              if (!listeJoueursFiltres[joueur.name]) {
                listeJoueursFiltres[joueur.name] = [];
              }
              listeJoueursFiltres[joueur.name].push({
                round: index,
                stats: statsAgregats,
              });
            }
          }
        }
      }
    });

    listeJoueursFiltres = filtrerStatsParCles(listeJoueursFiltres);
    setDataGraph(listeJoueursFiltres);
  }, [mapData, selectedPlayers, selectedStats]);

  function filtrerStatsParCles(listeJoueursFiltres) {
    const resultatsFiltres = {};

    for (const [nomJoueur, statsParRound] of Object.entries(listeJoueursFiltres)) {
      const statsFiltres = statsParRound.map(({ round, stats }) => {
        const statsFiltresJoueur = {};
        selectedStats.forEach((key) => {
          if (stats[key] !== undefined) {
            statsFiltresJoueur[key] = stats[key];
          }
        });
        return { round, stats: statsFiltresJoueur };
      });

      if (Object.keys(statsFiltres[0].stats).length > 0) {
        resultatsFiltres[nomJoueur] = statsFiltres;
      }
    }

    return resultatsFiltres;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ flex: 1, marginRight: '16px' }}>
        <PlayerList mapData={mapData} onPlayersSelected={handlePlayersSelected} />
        
      </div>
      <StatsList mapData={mapData} onStatsSelected={handleStatsSelected} />
      <div style={{ flex: 2 }}>
      {Object.keys(dataGraph).length > 0 && selectedStats && <PlayerGraph data={dataGraph} selectedStats={selectedStats}/>}
      </div>
    </div>
  );
};

export default PlayerStatsGraph;