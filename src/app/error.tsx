"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DOCS_URL } from "@/lib/links";

/**
 * Route-level boundary. A section that throws while rendering degrades to a
 * readable message instead of taking the whole page down to an empty screen.
 * Styled like not-found.tsx: the root layout and globals.css are still alive.
 */
export default function RouteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[osmedeus] route error boundary", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)]">
        Error
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-[var(--text-1)] sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 text-[15px] text-[var(--text-2)]">
        This page failed to render. Retrying usually fixes it.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button size="lg" onClick={() => retry()}>
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </Button>
      </div>
      {error.digest ? (
        <p className="mt-6 font-mono text-[11px] text-[var(--text-4)]">
          ref: {error.digest}
        </p>
      ) : null}
    </main>
  );
}
