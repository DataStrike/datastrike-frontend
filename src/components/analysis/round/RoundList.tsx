// RoundList.tsx
import React, { useEffect } from 'react';

interface RoundListProps {
  rounds: any[]; // Ajoutez le type correct pour les rounds
  onRoundClick: (round: any) => void;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, onRoundClick }) => {


  useEffect(() => {

    console.info('Rounds:', rounds);
  }
  );
  return (
    <div className="rounded-lg border border-gray-300 p-4">
      {rounds.map((round, index) => (
        <div
          key={round.id}
          className="rounded-md bg-gray-100 p-2 mb-2 cursor-pointer transition duration-300 hover:bg-gray-200"
          onClick={() => onRoundClick(round)}
        >
          Round {index + 1}
        </div>
      ))}
    </div>
  );
}

export default RoundList;