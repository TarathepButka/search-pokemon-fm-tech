"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { EvolutionCard } from "@/components/pokemon/EvolutionCard";
import type { PokemonSummary } from "@/lib/pokemon";

export type EvoNode = {
  pokemon: PokemonSummary;
  children: EvoNode[];
};

type EvolutionChainProps = {
  currentId: string;
  root: EvoNode | null;
};

function EvoStage({
  node,
  currentId,
}: {
  node: EvoNode;
  currentId: string;
}) {
  const { pokemon, children } = node;

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <EvolutionCard pokemon={pokemon} active={pokemon.id === currentId} />

      {children.length === 1 && (
        <>
          <div className="flex shrink-0 items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow-sm">
            <ArrowRight className="hidden size-4 md:block" />
            <ChevronRight className="size-4 md:hidden" />
          </div>
          <EvoStage node={children[0]} currentId={currentId} />
        </>
      )}

      {children.length > 1 && (
        <div className="flex flex-col gap-4">
          {children.map((child) => (
            <div key={child.pokemon.id} className="flex items-center gap-4 sm:gap-6">
              <div className="flex shrink-0 items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow-sm">
                <ArrowRight className="hidden size-4 md:block" />
                <ChevronRight className="size-4 md:hidden" />
              </div>
              <EvoStage node={child} currentId={currentId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EvolutionChain({ currentId, root }: EvolutionChainProps) {
  if (!root || root.children.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-semibold">Evolutions</h3>
      </div>

      <div className="-mt-6 overflow-x-auto pb-4 pt-8">
        <div className="flex min-w-max items-stretch justify-start gap-4 sm:gap-6 px-4 md:justify-center md:px-0">
          <EvoStage node={root} currentId={currentId} />
        </div>
      </div>
    </div>
  );
}
