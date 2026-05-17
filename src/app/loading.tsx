import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCard";

export default function Loading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}
