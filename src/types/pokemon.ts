export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
  }
  
  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonSprites {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  }
  
  export interface PokemonStat {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  
  export interface PokemonAbility {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }
  
  export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    sprites: PokemonSprites;
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    base_experience: number;
  }
  