import Image from "next/image";
import { SearchBar } from "@/components/navbar/SearchBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/70">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-3 px-6 py-3 sm:px-8 lg:px-10">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center">
            <Image
              src="/images/pokeball.png"
              alt="Poké Ball"
              width={40}
              height={40}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              search-pokemon-fm-tech
            </p>
            <h1 className="text-base font-semibold leading-tight sm:text-lg">
              Pokémon Search
            </h1>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="w-[min(420px,40vw)]">
            <SearchBar />
          </div>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
