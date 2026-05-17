import Link from "next/link";

import { EmptyState } from "@/components/base/EmptyState";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      <EmptyState
        title="Page not found"
        description="The Pokémon or page you were looking for does not exist."
      />

      <Button
        type="button"
        variant="outline"
        className="self-start rounded-full"
      >
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
