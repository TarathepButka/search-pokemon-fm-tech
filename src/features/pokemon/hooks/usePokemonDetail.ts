"use client";

import { useQuery } from "@apollo/client/react";

import { POKEMON_QUERY } from "@/features/pokemon/graphql/queries";
import type { PokemonDetail } from "@/lib/pokemon";

export function usePokemonDetail(name: string) {
  const query = useQuery<{ pokemon: PokemonDetail | null }>(POKEMON_QUERY, {
    variables: { name },
    fetchPolicy: "cache-first",
  });

  return {
    pokemon: query.data?.pokemon ?? null,
    loading: query.loading,
    error: query.error,
    refetch: query.refetch,
  };
}
