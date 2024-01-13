// CharacterList.tsx
import React from 'react';

interface CharacterListProps {
  characters: any[]; // Ajoutez le type correct pour les personnages
  onCharacterClick: (character: any) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterClick }) => {
  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id} onClick={() => onCharacterClick(character)}>
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;