import { useInfiniteQuery } from '@tanstack/react-query';
import type { PokemonListResponse } from '../types/pokemon.ts';
import { fetchFromAPI } from '../utils/api';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const usePokemonInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['pokemon', 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      fetchFromAPI<PokemonListResponse>(
        `/pokemon?limit=${ITEMS_PER_PAGE}&offset=${pageParam}`
      ),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return parseInt(url.searchParams.get('offset') || '0', 10);
    },
    initialPageParam: 0,
  });
};
