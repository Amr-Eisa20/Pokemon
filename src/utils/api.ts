import { BASE_URL } from './constants';

export const fetchFromAPI = async (endpoint: string) => {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      return response.json();
};

export const fetchPokemonList =  (url: string): number => {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  };