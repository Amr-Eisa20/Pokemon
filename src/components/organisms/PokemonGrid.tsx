import type { PokemonListItem } from '../../types/pokemon.ts';
import { SkeletonCard } from '../atoms/SkeletonCard.tsx';
import { PokemonCard } from '../molecules/PokemonCard';

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  isLoading?: boolean;
}

export const PokemonGrid = ({ pokemon, isLoading = false }: PokemonGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemon.map((p) => (
        <PokemonCard key={p.url} pokemon={p} />
      ))}
    </div>
  );
};
