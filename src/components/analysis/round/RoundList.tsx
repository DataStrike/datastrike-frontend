// RoundList.tsx
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";

interface RoundListProps {
  rounds: any[]; // Add the correct type for rounds
  onRoundClick: (round: any) => void;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, onRoundClick }) => {
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  return (
    <Select
      onValueChange={(value) => {
        const selectedRoundIndex = parseInt(value);
        setSelectedRound(selectedRoundIndex);
        onRoundClick(rounds[selectedRoundIndex]);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={`Round ${
            selectedRound !== null ? selectedRound + 1 : ""
          }`}
        />
      </SelectTrigger>
      <SelectContent>
        {rounds.map((round, index) => (
          <SelectItem key={round.id} value={index.toString()}>
            {`Round ${index + 1}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoundList;
