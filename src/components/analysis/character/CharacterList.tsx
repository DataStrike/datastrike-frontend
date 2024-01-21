import React from "react";
import { Character } from "@/models/analysis/analysismaps.ts";

interface CharacterListProps {
  characters?: Character[];
  onCharacterClick: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  onCharacterClick,
}) => {
  return (
    <div className="rounded-md border border-gray-300 p-4">
      <h2 className="text-xl font-bold">Characters</h2>
      <ul>
        {characters &&
          Object.values(characters).map((character) => (
            <li
              key={character.name}
              onClick={() => onCharacterClick(character)}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
            >
              {character.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CharacterList;
