"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { EvolutionCard } from "@/components/pokemon/EvolutionCard";
import type { PokemonSummary } from "@/lib/pokemon";

type EvolutionChainProps = {
  currentId: string;
  stages: PokemonSummary[];
};

export function EvolutionChain({ currentId, stages }: EvolutionChainProps) {
  if (stages.length <= 1) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold">Evolutions</h3>
      </div>

      <div className="-mt-6 overflow-x-auto pb-4 pt-8">
        <div className="flex min-w-max items-stretch justify-start md:justify-center gap-4 sm:gap-6 px-4 md:px-0">
          {stages.map((pokemon, index) => (
            <div key={pokemon.id} className="flex items-center gap-3">
              <EvolutionCard
                pokemon={pokemon}
                active={pokemon.id === currentId}
              />
              {index < stages.length - 1 ? (
                <div className="hidden items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow-sm sm:flex">
                  <ArrowRight className="hidden size-4 md:block" />
                  <ChevronRight className="size-4 md:hidden" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
