// AnalysisList.tsx
import React, { useState } from "react";
import MapList from "./map/MapList";
import RoundList from "./round/RoundList";
import MapGraph from "./map/MapGraph";
import PlayerList from "./player/PlayerList";
import CharacterList from "./character/CharacterList";
import PlayerDetails from "./player/PlayerDetails";
import { Button } from "../ui/button";
import { AnalysisMap } from "@/models/analysis/analysismaps.ts";
import PlayerStatsGraph from "./dynamicGraph/PlayerStatsGraph";

interface AnalysisListProps {
  maps: AnalysisMap[]; // Ajoutez le type correct pour les maps
}

const AnalysisList: React.FC<AnalysisListProps> = ({ maps }) => {
  const [selectedMap, setSelectedMap] = useState<any | null>(null);
  const [selectedRound, setSelectedRound] = useState<any | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null);
  const [displayMode, setDisplayMode] = useState<string>("map");

  const handleMapClick = (map_data: any) => {
    if (map_data) {
      // map_data.data.events = adjustEventValues(map_data.data.events, 15);
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

  return (
    <div className="flex flex-1 overflow-auto">
      {/* Ajustez la largeur selon vos besoins */}
      {!selectedMap &&
        !selectedRound &&
        !selectedPlayer &&
        !selectedCharacter && (
          <div className="w-full">
            <MapList maps={maps} onMapClick={handleMapClick} />
          </div>
        )}
      {selectedMap &&
        !selectedRound &&
        !selectedPlayer &&
        !selectedCharacter && (
          <div className="flex flex-col gap-2 mr-2">
            <RoundList
              rounds={selectedMap.data.rounds}
              onRoundClick={handleRoundClick}
            />
            <Button onClick={handleBackButtonClick}>Back</Button>
            <div className="flex flex-col gap-2">
            {displayMode === "playerStats" && <Button onClick={() => setDisplayMode("map")}>Afficher Map</Button>}
            {displayMode === "map" && <Button onClick={() => setDisplayMode("playerStats")}>Afficher Stats</Button>}

            </div>
          </div>
        )}
      {selectedRound && !selectedPlayer && !selectedCharacter && (
        <div>
          <PlayerList
            teams={selectedRound.teams}
            onPlayerClick={handlePlayerClick}
          />
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

      <div className="flex-1">
        {" "}
        {displayMode === "map" && selectedMap && !selectedRound && !selectedPlayer && !selectedCharacter && (
        <div className="flex-1">
          <MapGraph mapData={selectedMap} />
        </div>
      )}

      {displayMode === "playerStats" && selectedMap && !selectedRound && !selectedPlayer && !selectedCharacter && (
        <div className="flex-1">
          <PlayerStatsGraph mapData={selectedMap} />
        </div>
      )}
      {selectedPlayer && <PlayerDetails player={selectedPlayer} />}
        
    </div>
    </div>
  );
};

export default AnalysisList;
