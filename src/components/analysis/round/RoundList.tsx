// RoundList.tsx
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Round } from "@/models/analysis/analysismaps.ts";

interface RoundListProps {
  rounds: Round[]; // Add the correct type for rounds
  onRoundClick: (round: Round) => void;
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
        {rounds.map((_, index) => (
          <SelectItem key={`round-${index}`} value={index.toString()}>
            {`Round ${index + 1}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoundList;
