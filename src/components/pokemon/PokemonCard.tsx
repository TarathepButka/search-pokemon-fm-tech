"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { cn } from "@/lib/utils";
import type { PokemonSummary } from "@/lib/pokemon";
import { normalizePokemonName } from "@/lib/pokemon";

type PokemonCardProps = {
  pokemon: PokemonSummary;
  className?: string;
  compact?: boolean;
};

function PokemonCardComponent({
  pokemon,
  className,
  compact,
}: PokemonCardProps) {
  return (
    <Link
      href={`/pokemon/${normalizePokemonName(pokemon.name)}`}
      className={cn("group block h-full cursor-pointer", className)}
    >
      <Card className="h-full overflow-hidden border-border/60 bg-background/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
        <CardContent
          className={cn(
            "flex h-full flex-col gap-4 p-4",
            compact && "gap-3 p-3",
          )}
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-linear-to-br from-muted/70 via-muted/30 to-transparent">
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              fill
              sizes="(max-width: 640px) 65vw, (max-width: 1024px) 30vw, 18vw"
              className={cn(
                "object-contain transition-transform duration-300 group-hover:scale-105",
                compact ? "p-2" : "p-3",
              )}
              priority={compact}
            />
          </div>

          <div className={cn("space-y-3", compact && "space-y-2")}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  #{pokemon.number}
                </p>
                <h3 className="text-lg font-semibold leading-tight">
                  {pokemon.name}
                </h3>
              </div>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                {pokemon.classification}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
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

export const PokemonCard = memo(PokemonCardComponent);

export function PokemonCardSkeleton({ compact }: { compact?: boolean }) {
  return (
    <Card className="overflow-hidden border-border/60 bg-background/70">
      <CardContent className={cn("flex flex-col gap-4 p-4", compact && "p-3")}>
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
