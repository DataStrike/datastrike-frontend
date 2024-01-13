// AnalysisList.tsx
import React, { useState } from 'react';
import MapList from './map/MapList';
import RoundList from './round/RoundList';
import MapGraph from './map/MapGraph';
import PlayerList from './player/PlayerList';
import CharacterList from './character/CharacterList';
import {Button} from '../ui/button';

interface AnalysisListProps {
  maps: any[]; // Ajoutez le type correct pour les maps
}

const AnalysisList: React.FC<AnalysisListProps> = ({ maps }) => {
    
    const [selectedMap, setSelectedMap] = useState<any | null>(null);
    const [selectedRound, setSelectedRound] = useState<any | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null);

    const handleMapClick = (map_data: any) => {
        if (map_data) {
          map_data.data.events = adjustEventValues(map_data.data.events, 15);
          setSelectedMap(map_data);
          setSelectedRound(null);
          setSelectedPlayer(null);
          setSelectedCharacter(null);
        }
      };
    
      const handleRoundClick = (round: any) => {
        setSelectedRound(round);
        setSelectedPlayer(null);
        setSelectedCharacter(null);
        console.info('Player selected:', round)
      };
    
      const handlePlayerClick = (player: any) => {
        setSelectedPlayer(player);
        setSelectedCharacter(null);

      };
    
      const handleCharacterClick = (character: any) => {
        setSelectedCharacter(character);
      };
    
      const handleBackButtonClick = () => {
        if (selectedCharacter) {
          setSelectedCharacter(null);
        } else if (selectedPlayer) {
          setSelectedPlayer(null);
        } else if (selectedRound) {
          setSelectedRound(null);
        } else if (selectedMap) {
          setSelectedMap(null);
        }
      };

function adjustEventValues(events, thresholdSeconds) {
    events.sort((a, b) => parseFloat(a.timestamp) - parseFloat(b.timestamp));
  
    // Parcourir les événements
    let lastEvent = null;
    let index = 1; // Compteur pour attribuer des valeurs distinctes
  
    for (const event of events) {
      // Vérifier s'il y a un événement précédent
      if (lastEvent !== null) {
        // Convertir les horodatages en objets Date
        const currentTimestamp = new Date(parseFloat(event.timestamp) * 1000);
        const lastTimestamp = new Date(parseFloat(lastEvent.timestamp) * 1000);
  
        // Calculer la différence en secondes entre les horodatages
        const timeDifferenceSeconds = (currentTimestamp.getTime() - lastTimestamp.getTime()) / 1000;
  
        // Vérifier si la différence est inférieure à la limite
        if (timeDifferenceSeconds < thresholdSeconds) {
          // Augmenter la valeur de l'événement actuel
          index += 1;
        } else {
          // Réinitialiser le compteur si la différence est supérieure à la limite
          index = 1;
        }
      }
  
      // Attribuer la valeur à l'événement actuel
      event.value = index;
  
      // Mettre à jour l'événement précédent
      lastEvent = event;
    }
  
    return events;
  }

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="w-1/4"> {/* Ajustez la largeur selon vos besoins */}
        {!selectedMap && !selectedRound && !selectedPlayer && !selectedCharacter && (
          <div>
            <MapList maps={maps} onMapClick={handleMapClick} />
          </div>
        )}
        {selectedMap && !selectedRound && !selectedPlayer && !selectedCharacter && (
          <div>
            <RoundList rounds={selectedMap.data.rounds} onRoundClick={handleRoundClick} />
            <Button onClick={handleBackButtonClick}>Back</Button>
          </div>
        )}
        {selectedRound && !selectedPlayer && !selectedCharacter && (
          <div>
            <PlayerList teams={selectedRound.teams} onPlayerClick={handlePlayerClick} />
            <Button onClick={handleBackButtonClick}>Back</Button>
          </div>
        )}
        {selectedPlayer && !selectedCharacter && (
          <div>
            <CharacterList
              characters={selectedPlayer.characters}
              onCharacterClick={handleCharacterClick}
            />
            <Button onClick={handleBackButtonClick}>Back</Button>
          </div>
        )}
      </div>

      <div className="xl:w-3/4"> {/* Ajustez la largeur selon vos besoins */}
        {selectedMap && !selectedRound && !selectedPlayer && !selectedCharacter && (
          <MapGraph mapData={selectedMap} />
        )}
        {/* {selectedRound && !selectedPlayer && !selectedCharacter && (
          <MapGraph mapData={selectedRound} />
        )}
        {selectedPlayer && !selectedCharacter && (
          <MapGraph mapData={selectedPlayer} />
        )}
        {selectedCharacter && (
          <MapGraph mapData={selectedCharacter} />
        )} */}
      </div>
    </div>
  );
};

export default AnalysisList;