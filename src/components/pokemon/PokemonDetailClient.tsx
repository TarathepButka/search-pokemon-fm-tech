"use client";

import Image from "next/image";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Flame, HeartPulse, Shield, Swords } from "lucide-react";
import { EmptyState } from "@/components/base/EmptyState";
import { EvolutionChain } from "@/components/pokemon/EvolutionChain";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePokemonCatalog } from "@/features/pokemon/hooks/usePokemonCatalog";
import type { PokemonDetail, PokemonSummary } from "@/lib/pokemon";
import { formatRange } from "@/lib/pokemon";

type PokemonDetailClientProps = {
  name: string;
  initialData?: PokemonDetail | null;
};

function StatPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3">
      <div className="flex size-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function AttackList({
  title,
  icon,
  attacks,
}: {
  title: string;
  icon: React.ReactNode;
  attacks: Array<{ name: string; type: string; damage: number }>;
}) {
  return (
    <Card className="border-border/60 bg-background/70">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {attacks.length ? (
          attacks.map((attack) => (
            <div
              key={`${attack.name}-${attack.type}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="space-y-1">
                  <p className="font-medium leading-none">{attack.name}</p>
                  <TypeBadge type={attack.type} />
                </div>
              </div>
              <Badge variant="secondary" className="rounded-full">
                {attack.damage}
              </Badge>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No attacks available.</p>
        )}
      </CardContent>
    </Card>
  );
}

export function PokemonDetailClient({
  name,
  initialData,
}: PokemonDetailClientProps) {
  const router = useRouter();

  // initialData comes from the server (SSR fetch) and is the source of truth.
  // We do NOT re-fetch via Apollo here to avoid cache merge issues where
  // InMemoryCache returns a partial object that overwrites complete server data.
  const pokemon = initialData ?? null;

  const { pokemons } = usePokemonCatalog();

  const fullChain = useMemo(() => {
    if (!pokemon || !pokemons.length) return [];

    const findByName = (n?: string | null) => {
      if (!n) return null;
      const target = n.toLowerCase();
      return pokemons.find((p) => p?.name?.toLowerCase() === target);
    };

    // Find the root of the evolution chain by going upwards
    let root: PokemonSummary = pokemon;
    let foundPrevious = true;

    while (foundPrevious) {
      const rootName = root.name?.toLowerCase();
      if (!rootName) {
        foundPrevious = false;
        break;
      }

      const previous = pokemons.find((p) =>
        p?.evolutions?.some(
          (e) => e?.name?.toLowerCase() === rootName,
        ),
      );

      if (previous && previous.name) {
        // Prevent infinite loop if data is circular
        if (previous.name.toLowerCase() === root.name?.toLowerCase()) {
          foundPrevious = false;
        } else {
          root = previous;
        }
      } else {
        foundPrevious = false;
      }
    }

    // Traverse down from the root to get the full chain (BFS)
    const chain: PokemonSummary[] = [];
    const rootName = root.name;

    if (rootName) {
      const queue = [rootName];
      const visited = new Set<string>();

      while (queue.length > 0) {
        const currentName = queue.shift();
        if (!currentName) continue;

        const normalizedName = currentName.toLowerCase();
        if (visited.has(normalizedName)) continue;
        visited.add(normalizedName);

        const current = findByName(currentName);
        if (current) {
          chain.push(current);
          if (current.evolutions) {
            for (const evo of current.evolutions) {
              if (evo?.name) {
                queue.push(evo.name);
              }
            }
          }
        }
      }
    }

    return chain;
  }, [pokemon, pokemons]);

  const pokemonClassification = pokemon?.classification ?? "Pokémon";
  const pokemonTypes = pokemon?.types ?? [];
  const pokemonResistant = pokemon?.resistant ?? [];
  const pokemonWeaknesses = pokemon?.weaknesses ?? [];
  const pokemonFastAttacks = pokemon?.attacks?.fast ?? [];
  const pokemonSpecialAttacks = pokemon?.attacks?.special ?? [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [name]);

  if (!pokemon) {
    return (
      <EmptyState
        title="Pokémon not found"
        description={`We couldn't find a Pokémon named ${name}. Try a different search or go back to the home page.`}
        actionLabel="Back to home"
        onAction={() => {
          router.push("/");
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => {
            router.push("/");
          }}
        >
          <ChevronLeft className="mr-2 size-4" />
          Back to home
        </Button>
      </div>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <Card className="overflow-hidden border-border/60 bg-background/70">
          <CardContent className="p-4 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-muted/80 via-muted/30 to-transparent">
              {pokemon.image ? (
                <Image
                  src={pokemon.image}
                  alt={pokemon.name ?? ""}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-contain p-4 drop-shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
                />
              ) : null}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/60 bg-background/70">
            <CardHeader className="space-y-4 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]"
                >
                  #{pokemon.number}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {pokemonClassification}
                </span>
              </div>
              <div className="space-y-3">
                <CardTitle className="text-4xl font-bold sm:text-5xl">
                  {pokemon.name}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  {pokemonTypes.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                A {pokemonClassification.toLowerCase()} Pokémon with{" "}
                {pokemon.maxHP} max HP and a max CP of {pokemon.maxCP}.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <StatPill
                  label="Height"
                  value={formatRange(pokemon.height)}
                  icon={<span>H</span>}
                />
                <StatPill
                  label="Weight"
                  value={formatRange(pokemon.weight)}
                  icon={<span>W</span>}
                />
                <StatPill
                  label="Max CP"
                  value={pokemon.maxCP}
                  icon={<Shield className="size-4" />}
                />
                <StatPill
                  label="Max HP"
                  value={pokemon.maxHP}
                  icon={<Swords className="size-4" />}
                />
                <StatPill
                  label="Flee rate"
                  value={pokemon.fleeRate}
                  icon={<HeartPulse className="size-4" />}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-border/60 bg-background/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resistant</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {pokemonResistant.length ? (
                  pokemonResistant.map((item) => (
                    <TypeBadge key={item} type={item} />
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    None listed
                  </span>
                )}
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-background/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Weaknesses</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {pokemonWeaknesses.length ? (
                  pokemonWeaknesses.map((item) => (
                    <TypeBadge key={item} type={item} />
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">
                    None listed
                  </span>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      <section className="grid gap-4 lg:grid-cols-2">
        <AttackList
          title="Fast attacks"
          icon={<Swords className="size-4" />}
          attacks={pokemonFastAttacks}
        />
        <AttackList
          title="Special attacks"
          icon={<Flame className="size-4" />}
          attacks={pokemonSpecialAttacks}
        />
      </section>

      <Separator />

      <section className="space-y-4">
        <EvolutionChain currentId={pokemon.id} stages={fullChain} />
      </section>
    </div>
  );
}
