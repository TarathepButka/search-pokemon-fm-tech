"use client";

import { useQuery } from "@apollo/client/react";

import { POKEMONS_QUERY } from "@/features/pokemon/graphql/queries";
import type { PokemonSummary } from "@/lib/pokemon";

export function usePokemonCatalog(first = 151) {
  const query = useQuery<{ pokemons: PokemonSummary[] }>(POKEMONS_QUERY, {
    variables: { first },
    fetchPolicy: "cache-first",
  });

  return {
    pokemons: query.data?.pokemons ?? [],
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
  };
}
