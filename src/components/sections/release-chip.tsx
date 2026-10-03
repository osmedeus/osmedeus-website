"use client";

import { useLatestRelease } from "@/lib/use-github";

/**
 * The release chip's text — the only live part of the hero, so the only part
 * of it that ships as client JavaScript. Prerenders with the fallback tag and
 * swaps in the latest GitHub release once it arrives.
 */
export function ReleaseChipText() {
  const version = useLatestRelease();

  return (
    <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--text-3)]">
      <span className="block sm:hidden">
        {version} - with Next-Level Performance &amp; Power
      </span>
      <span className="hidden sm:inline">
        {version} Released – Cleaner, More Flexible Architecture and Next Level
        Power
      </span>
    </span>
  );
}
