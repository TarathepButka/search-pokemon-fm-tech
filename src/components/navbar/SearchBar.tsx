"use client";

import { Search, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PokemonCardSkeleton } from "@/components/pokemon/PokemonCard";
import { usePokemonCatalog } from "@/features/pokemon/hooks/usePokemonCatalog";
import { normalizePokemonName, pokemonMatchesQuery } from "@/lib/pokemon";
import type { PokemonSummary } from "@/lib/pokemon";
import { cn } from "@/lib/utils";

const RECENT_SEARCH_KEY = "search-pokemon-fm-tech:recent-searches";

function readRecentSearches() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const stored = window.localStorage.getItem(RECENT_SEARCH_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

function writeRecentSearches(searches: string[]) {
  try {
    window.localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(searches));
  } catch {
    // no-op
  }
}

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { pokemons, loading } = usePokemonCatalog(151);
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    return new URLSearchParams(window.location.search).get("q") ?? "";
  });
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>(() => readRecentSearches());
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset search bar value when pathname changes to home
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (pathname === "/") {
      setValue("");
    }
  }

  const suggestions = useMemo(() => {
    const trimmed = value.trim();

    if (!trimmed) {
      return pokemons.slice(0, 8);
    }

    return pokemons
      .filter((pokemon) => pokemonMatchesQuery(pokemon, trimmed))
      .slice(0, 8);
  }, [pokemons, value]);

  const recentPokemon = useMemo(() => {
    if (!recent.length) {
      return [] as PokemonSummary[];
    }

    const map = new Map(
      pokemons.map((pokemon) => [normalizePokemonName(pokemon.name), pokemon]),
    );

    return recent
      .map((name) => map.get(name))
      .filter(Boolean)
      .slice(0, 5) as PokemonSummary[];
  }, [pokemons, recent]);

  const displayedItems = useMemo(() => {
    const combined = value.trim()
      ? suggestions
      : [...recentPokemon, ...suggestions];
    const seen = new Set<string>();

    const deduped = combined.filter((pokemon) => {
      const normalized = normalizePokemonName(pokemon.name);

      if (seen.has(normalized)) {
        return false;
      }

      seen.add(normalized);
      return true;
    });

    return deduped;
  }, [recentPokemon, suggestions, value]);

  const persistSearch = useCallback(
    (pokemon: PokemonSummary) => {
      const normalized = normalizePokemonName(pokemon.name);
      const nextRecent = [
        normalized,
        ...recent.filter((item) => item !== normalized),
      ].slice(0, 8);
      setRecent(nextRecent);
      writeRecentSearches(nextRecent);
    },
    [recent],
  );

  // No URL sync: do not update home page while typing. Navigation only on selection.

  const handleSelect = useCallback(
    (pokemon: PokemonSummary) => {
      persistSearch(pokemon);
      setValue(pokemon.name);
      setOpen(false);
      router.push(`/pokemon/${normalizePokemonName(pokemon.name)}`);
    },
    [persistSearch, router],
  );

  const exactMatch = useMemo(
    () =>
      pokemons.find(
        (pokemon) =>
          normalizePokemonName(pokemon.name) === normalizePokemonName(value),
      ),
    [pokemons, value],
  );

  const handleSubmit = useCallback(() => {
    if (exactMatch) {
      handleSelect(exactMatch);
    }
  }, [exactMatch, handleSelect]);

  const handleChange = useCallback((nextValue: string) => {
    setValue(nextValue);
    setOpen(true);
    setActiveIndex(-1);
  }, []);

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={(event) => {
            if (!displayedItems.length) {
              if (event.key === "Enter") {
                handleSubmit();
              }
              return;
            }

            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((current) =>
                Math.min(current + 1, displayedItems.length - 1),
              );
            }

            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((current) => Math.max(current - 1, 0));
            }

            if (event.key === "Enter") {
              event.preventDefault();
              const selected =
                displayedItems[Math.max(activeIndex, 0)] ?? exactMatch;
              if (selected) {
                handleSelect(selected);
              } else {
                handleSubmit();
              }
            }

            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search Pokémon by name..."
          className="h-11 rounded-2xl border-border/60 bg-background/90 pl-10 pr-11 shadow-sm backdrop-blur"
        />

        {value ? (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute right-1.5 top-1/2 size-8 -translate-y-1/2 rounded-full"
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border/70 bg-background/95 shadow-2xl backdrop-blur">
          <div className="max-h-60 overflow-auto p-2">
            {loading ? (
              <div className="grid gap-3 p-2">
                <PokemonCardSkeleton compact />
                <PokemonCardSkeleton compact />
              </div>
            ) : displayedItems.length > 0 ? (
              <div className="space-y-1">
                {displayedItems.map((pokemon, index) => (
                  <button
                    key={pokemon.id}
                    type="button"
                    onClick={() => handleSelect(pokemon)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors hover:bg-muted h-12 cursor-pointer",
                      activeIndex === index && "bg-muted",
                    )}
                  >
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {pokemon.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {pokemon.classification}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-3 py-6 text-sm text-muted-foreground">
                No Pokémon matched “{value}”.
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
