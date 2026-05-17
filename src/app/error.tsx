"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/base/ErrorState";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Application error"
      description="The app hit an unexpected problem. Try again or reload the page."
      onRetry={reset}
    />
  );
}
