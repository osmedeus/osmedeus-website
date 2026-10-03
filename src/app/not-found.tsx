import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DOCS_URL } from "@/lib/links";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)]">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-[var(--text-1)] sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 text-[15px] text-[var(--text-2)]">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            Documentation
          </a>
        </Button>
      </div>
    </main>
  );
}
