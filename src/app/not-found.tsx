import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm text-[var(--muted)]">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-base text-[var(--muted)]">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button asChild variant="movingBorder" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a
            href="https://docs.osmedeus.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </Button>
      </div>
    </main>
  );
}
