"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/base/ErrorState";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PokemonErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Unable to load Pokémon"
      description="The Pokémon detail view hit an unexpected problem."
      onRetry={reset}
    />
  );
}
