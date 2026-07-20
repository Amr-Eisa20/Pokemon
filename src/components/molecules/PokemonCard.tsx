import { extractIdFromUrl } from '../../utils/api';
import type { PokemonListItem } from '../../types/pokemon.ts';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const id = extractIdFromUrl(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      to={`/pokemon/${id}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="p-6">
        <div className="relative w-full aspect-square mb-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg group-hover:from-gray-100 group-hover:to-gray-200 transition-colors">
          {imageError ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-2">
                  <span className="text-4xl font-bold text-white">
                    {displayName.charAt(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Image unavailable</p>
              </div>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={displayName}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
            <span className="text-sm text-gray-500">#{id.toString().padStart(3, '0')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
