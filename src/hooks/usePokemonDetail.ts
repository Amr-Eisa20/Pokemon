import { useQuery } from '@tanstack/react-query';
import type { PokemonDetail } from '../types/pokemon.ts';
import { fetchFromAPI } from '../utils/api';

export const usePokemonDetail = (id: string) => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchFromAPI<PokemonDetail>(`/pokemon/${id}`),
    enabled: !!id,
  });
};
