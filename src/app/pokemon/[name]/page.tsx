import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PokemonDetailClient } from "@/components/pokemon/PokemonDetailClient";
import { fetchPokemonByName } from "@/features/pokemon/api";
import { normalizePokemonName } from "@/lib/pokemon";

type PokemonPageProps = {
  params: Promise<{
    name?: string;
  }>;
};

export async function generateMetadata({
  params,
}: PokemonPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pokemonName = normalizePokemonName(resolvedParams.name);

  if (!pokemonName) {
    return {
      title: "Pokémon not found",
      description: "The requested Pokémon could not be loaded.",
    };
  }

  const pokemon = await fetchPokemonByName(pokemonName);

  if (!pokemon) {
    return {
      title: "Pokémon not found",
      description: "The requested Pokémon could not be loaded.",
    };
  }

  return {
    title: `${pokemon.name} · ${pokemon.classification}`,
    description: `View ${pokemon.name}'s stats, attacks, and evolution chain.`,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const resolvedParams = await params;
  const pokemonName = normalizePokemonName(resolvedParams.name);

  if (!pokemonName) {
    notFound();
  }

  const pokemon = await fetchPokemonByName(pokemonName);

  if (!pokemon) {
    notFound();
  }

  return <PokemonDetailClient name={pokemonName} initialData={pokemon} />;
}
