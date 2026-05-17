"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Filter } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { EmptyState } from "@/components/base/EmptyState";
import { ErrorState } from "@/components/base/ErrorState";
import {
  PokemonCard,
  PokemonCardSkeleton,
} from "@/components/pokemon/PokemonCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePokemonCatalog } from "@/features/pokemon/hooks/usePokemonCatalog";
import { ALL_TYPES, pokemonMatchesQuery } from "@/lib/pokemon";

type HomeClientProps = {
  initialQuery: string;
  initialType: string;
};

export function HomeClient({ initialQuery, initialType }: HomeClientProps) {
  const router = useRouter();
  const { pokemons, loading, error, refetch } = usePokemonCatalog(151);

  const selectedType = initialType.trim();
  const searchQuery = initialQuery.trim();

  const filteredPokemons = useMemo(() => {
    let next = pokemons;

    if (selectedType) {
      next = next.filter((pokemon) => pokemon.types.includes(selectedType));
    }

    if (searchQuery) {
      next = next.filter((pokemon) =>
        pokemonMatchesQuery(pokemon, searchQuery),
      );
    }

    return next;
  }, [pokemons, searchQuery, selectedType]);

  const visibleTypes = useMemo(
    () =>
      ALL_TYPES.filter((type) =>
        pokemons.some((pokemon) => pokemon.types.includes(type)),
      ),
    [pokemons],
  );

  const updateFilter = (type?: string) => {
    const params = new URLSearchParams(window.location.search);

    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }

    const queryString = params.toString();
    router.replace(queryString ? `/?${queryString}` : "/");
  };

  if (error) {
    return <ErrorState description={error.message} onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-10">
      <section className="space-y-6 rounded-[2rem] border border-border/60 bg-background/60 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur md:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Search Pokémon by Name.
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm">
              <p className="font-medium text-foreground">
                {pokemons.length || 151}
              </p>
              <p>Pokémon</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm">
              <p className="font-medium text-foreground">
                {visibleTypes.length}
              </p>
              <p>Types</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="size-4" />
            Type filters
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedType ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => updateFilter(undefined)}
            >
              All types
            </Button>
            {visibleTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => updateFilter(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {searchQuery ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Search results</h3>
              <p className="text-sm text-muted-foreground">
                Showing matches for “{searchQuery}”
                {selectedType ? ` in ${selectedType}` : ""}.
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.replace("/")}>
              Clear filters
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <PokemonCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredPokemons.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No matches found"
              description="Try a different name or remove the active type filter."
              actionLabel="Reset filters"
              onAction={() => router.replace("/")}
            />
          )}
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Pokémon</h3>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-2 shadow-sm">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {filteredPokemons.length}
                </span>
                <span className="ml-2">Pokémon</span>
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <PokemonCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="relative">
              <Carousel
                opts={{ align: "start", loop: false }}
                plugins={[Autoplay({ delay: 3500, stopOnInteraction: true })]}
                className="mx-auto max-w-full"
              >
                <CarouselPrevious className="left-0 z-20" />
                <CarouselContent className="py-2 px-8 sm:px-10 lg:px-12 gap-6">
                  {filteredPokemons.map((pokemon) => (
                    <CarouselItem
                      key={pokemon.id}
                      className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6"
                    >
                      <PokemonCard pokemon={pokemon} compact />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className="right-0 z-20" />
              </Carousel>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
