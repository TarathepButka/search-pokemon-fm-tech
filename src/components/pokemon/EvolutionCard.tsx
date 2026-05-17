"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { cn } from "@/lib/utils";
import type { PokemonSummary } from "@/lib/pokemon";
import { normalizePokemonName } from "@/lib/pokemon";

type EvolutionCardProps = {
  pokemon: PokemonSummary;
  active?: boolean;
};

export function EvolutionCard({ pokemon, active }: EvolutionCardProps) {
  return (
    <Link
      href={`/pokemon/${normalizePokemonName(pokemon.name)}`}
      className="group block w-36 shrink-0 cursor-pointer sm:w-48"
    >
      <Card
        className={cn(
          "h-full overflow-hidden border-border/60 bg-background/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
          active && "ring-2 ring-amber-500 shadow-lg shadow-amber-500/10",
        )}
      >
        <CardContent
          className={cn("flex h-full flex-col gap-3 p-3", active && "sm:p-4")}
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-linear-to-br from-muted/70 via-muted/20 to-transparent">
            {pokemon.image ? (
              <Image
                src={pokemon.image}
                alt={pokemon.name ?? ""}
                fill
                sizes="(max-width: 640px) 44vw, 140px"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            ) : null}
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              #{pokemon.number}
            </p>
            <h3 className="text-sm font-semibold leading-tight sm:text-base">
              {pokemon.name}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {pokemon.types.slice(0, 2).map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
