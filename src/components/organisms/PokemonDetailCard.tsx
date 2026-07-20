import { useState } from 'react';
import type { PokemonDetail } from '../../types/pokemon.ts';
import { HEADER_GRADIENTS } from '../../utils/designSystem.ts';

interface PokemonDetailCardProps {
  pokemon: PokemonDetail;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400',
};

const statNames: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

export const PokemonDetailCard = ({ pokemon }: PokemonDetailCardProps) => {
  const displayName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
      <div className={`${HEADER_GRADIENTS.purple} py-6 px-8 text-center`}>
        <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
          ⚡ {displayName}
        </h1>
        <p className="text-white text-xl mt-1 opacity-90">
          #{pokemon.id.toString().padStart(4, '0')}
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-gray-100 rounded-full w-72 h-72 flex items-center justify-center">
                {imageError || !imageUrl ? (
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-8xl font-bold text-white">
                      {displayName.charAt(0)}
                    </span>
                  </div>
                ) : (
                  <img
                    src={imageUrl}
                    alt={displayName}
                    className="w-56 h-56 object-contain"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-center gap-2">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`${
                    typeColors[t.type.name] || 'bg-gray-400'
                  } text-white px-6 py-2 rounded-lg text-sm font-semibold capitalize`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="text-sm font-medium">Height</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <span className="text-sm font-medium">Weight</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Base Stats</h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-base font-semibold text-gray-700">
                        {statNames[stat.stat.name] || stat.stat.name}
                      </span>
                      <span className="text-base font-bold text-gray-900">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-gray-900 h-2.5 rounded-full transition-all"
                        style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Abilities</h2>
              <div className="space-y-2">
                {pokemon.abilities.map((ability) => (
                  <div key={ability.ability.name} className="flex items-center gap-2">
                    <span className="text-base text-gray-900 font-medium">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                    {ability.is_hidden && (
                      <span className="text-sm text-gray-500">(Hidden)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Base Experience</h2>
              <p className="text-4xl font-bold text-purple-600">
                {pokemon.base_experience} XP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
