// RoundList.tsx
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Round } from "@/models/analysis/analysismaps.ts";

interface RoundListProps {
  rounds: Round[];
  onRoundClick: (round: Round) => void;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, onRoundClick }) => {
  const [selectedRound, setSelectedRound] = useState<number | null>(null);

  // If there is only one round, select it by default
  useEffect(() => {
    if (rounds.length === 1) {
      setSelectedRound(0);
      onRoundClick(rounds[0]);
    }
  }, []);

  return (
    <Select
      onValueChange={(value) => {
        const selectedRoundIndex = parseInt(value);
        setSelectedRound(selectedRoundIndex);
        onRoundClick(rounds[selectedRoundIndex]);
      }}
    >
      <SelectTrigger className="w-[120px]">
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
