// RoundList.tsx
import React, { useEffect } from "react";

interface RoundListProps {
  rounds: any[]; // Ajoutez le type correct pour les rounds
  onRoundClick: (round: any) => void;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, onRoundClick }) => {
  useEffect(() => {
    console.info("Rounds:", rounds);
  });
  return (
    <div className="rounded-md border border-gray-300 w-fit p-4">
      {rounds.map((round, index) => (
        <div
          key={round.id}
          className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          onClick={() => onRoundClick(round)}
        >
          Round {index + 1}
        </div>
      ))}
    </div>
  );
};

export default RoundList;
