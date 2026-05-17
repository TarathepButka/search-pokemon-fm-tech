import { Filter } from "lucide-react";
import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      {/* Header section */}
      <section className="space-y-6 rounded-[2rem] border border-border/60 bg-background/60 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur md:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Search Pokémon by Name.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm">
              <Skeleton className="mb-1 h-5 w-8" />
              <p>Pokémon</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm">
              <Skeleton className="mb-1 h-5 w-6" />
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
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Grid section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold">Pokémon</h3>
          <Skeleton className="h-8 w-24 rounded-2xl" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
