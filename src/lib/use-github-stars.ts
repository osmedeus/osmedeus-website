"use client";

import { useEffect, useState } from "react";

const FALLBACK = "6.2k";
const ENDPOINT = "https://api.github.com/repos/j3ssie/osmedeus";

let cached: Promise<string> | null = null;

function formatStars(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
  return String(count);
}

function fetchStars(): Promise<string> {
  if (cached) return cached;
  cached = fetch(ENDPOINT)
    .then((res) => res.json())
    .then((data) => {
      const n = data?.stargazers_count;
      return typeof n === "number" ? formatStars(n) : FALLBACK;
    })
    .catch(() => {
      cached = null;
      return FALLBACK;
    });
  return cached;
}

export function useGithubStars(): string {
  const [stars, setStars] = useState<string>(FALLBACK);

  useEffect(() => {
    let active = true;
    fetchStars().then((value) => {
      if (active) setStars(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return stars;
}
