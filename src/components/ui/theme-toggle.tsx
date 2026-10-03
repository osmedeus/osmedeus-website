"use client";

import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MoonIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * The one theme switch, used by the nav and the footer.
 *
 * Both icons and both labels are in the HTML and CSS shows the pair for the
 * current theme (`.only-dark` / `.only-light`), so the server render is right
 * for every visitor and there is nothing to swap after hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className={cn(
        "stripe-hover inline-flex h-8 w-8 items-center justify-center border text-[var(--text-3)] transition-colors hover:border-[var(--line-2)] hover:text-[var(--text-1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]",
        className
      )}
    >
      <span className="only-dark">
        <Sun className="h-[15px] w-[15px]" />
        <span className="sr-only">Switch to light theme</span>
      </span>
      <span className="only-light">
        <MoonIcon className="h-[15px] w-[15px]" />
        <span className="sr-only">Switch to dark theme</span>
      </span>
    </button>
  );
}
