import { useQuery } from '@tanstack/react-query';
import type { PokemonListResponse } from '../types/pokemon.ts';
import { fetchFromAPI } from '../utils/api';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const usePokemonList = (page: number) => {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  
  return useQuery({
    queryKey: ['pokemon', 'list', page],
    queryFn: () => 
      fetchFromAPI<PokemonListResponse>(
        `/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      ),
  });
};
