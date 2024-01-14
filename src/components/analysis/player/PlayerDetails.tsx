// PlayerDetails.tsx
import React, { useMemo } from 'react';

interface PlayerDetailsProps {
  player: any; // Ajoutez le type correct pour les joueurs
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player }) => {
  const statKeys = useMemo(() => {
    const keysSet = new Set<string>();
    Object.values(player.characters).forEach((character: any) => {
      Object.keys(character.stats).forEach((key) => keysSet.add(key));
    });
    return Array.from(keysSet);
  }, [player]);

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Player Details</h2>
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Character</th>
            {statKeys.map((statKey) => (
              <th key={statKey} className="border px-4 py-2">{statKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(player.characters).map(([charKey, character]) => {
            // Vérifier si les statistiques du personnage sont vides
            const statsNotEmpty = Object.values(character.stats).some((value) => value !== null && value !== undefined);
            
            // Si les statistiques ne sont pas vides, afficher la ligne
            if (statsNotEmpty) {
              return (
                <tr key={charKey}>
                  <td className="border px-4 py-2">{charKey}</td>
                  {statKeys.map((statKey) => (
                    <td key={statKey} className="border px-4 py-2">{character.stats[statKey]}</td>
                  ))}
                </tr>
              );
            }

            // Sinon, retourner null pour ne pas créer la ligne
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerDetails;