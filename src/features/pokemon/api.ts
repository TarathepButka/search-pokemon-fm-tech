import { print } from "graphql";

import {
  POKEMON_QUERY,
  POKEMONS_QUERY,
} from "@/features/pokemon/graphql/queries";
import type { PokemonDetail, PokemonSummary } from "@/lib/pokemon";

const GRAPHQL_ENDPOINT = "https://graphql-pokemon2.vercel.app";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function executeGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with ${response.status}`);
  }

  return (await response.json()) as GraphQLResponse<T>;
}

export async function fetchPokemonByName(name: string) {
  const response = await executeGraphQL<{ pokemon: PokemonDetail | null }>(
    print(POKEMON_QUERY),
    {
      name,
    },
  );

  return response.data?.pokemon ?? null;
}

export async function fetchPokemons(first = 151) {
  const response = await executeGraphQL<{ pokemons: PokemonSummary[] }>(
    print(POKEMONS_QUERY),
    {
      first,
    },
  );

  return response.data?.pokemons ?? [];
}
