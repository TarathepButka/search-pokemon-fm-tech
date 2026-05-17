export type PokemonTypeName =
  | "Bug"
  | "Dark"
  | "Dragon"
  | "Electric"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Flying"
  | "Ghost"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water"
  | string;

export interface PokemonWeightHeight {
  minimum: string;
  maximum: string;
}

export interface PokemonAttack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonSummary {
  id: string;
  number: string;
  name: string;
  image: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  weight: PokemonWeightHeight;
  height: PokemonWeightHeight;
  evolutions: PokemonSummary[] | null;
}

export interface PokemonDetail extends PokemonSummary {
  attacks: {
    fast: PokemonAttack[];
    special: PokemonAttack[];
  };
}

export const ALL_TYPES: PokemonTypeName[] = [
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Dragon",
  "Normal",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Dark",
  "Fairy",
  "Steel",
  "Ice",
  "Fighting",
];

export function normalizePokemonName(name?: string | null) {
  return typeof name === "string" ? name.trim().toLowerCase() : "";
}

export function formatRange(range: PokemonWeightHeight) {
  return `${range.minimum} - ${range.maximum}`;
}

export function pokemonMatchesQuery(pokemon: PokemonSummary, query: string) {
  return pokemon.name.toLowerCase().includes(query.toLowerCase());
}
