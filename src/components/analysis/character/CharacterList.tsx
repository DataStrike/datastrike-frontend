import React from 'react';

interface CharacterListProps {
  characters?: any; // Ajoutez le type correct pour les personnages (dict)
  onCharacterClick: (character: any) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterClick }) => {
  return (
    <div className="rounded-md border border-gray-300 p-4">
      <h2 className="text-xl font-bold">Characters</h2>
      <ul>
        {characters && Object.values(characters).map((character) => (
          <li key={character.id} onClick={() => onCharacterClick(character)} className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;