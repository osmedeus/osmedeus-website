"use client";

import { useEffect, useState } from "react";
import { REPO_API } from "@/lib/links";

type Json = Record<string, unknown> | null;

/*
 * Each endpoint is fetched once per page load however many components ask.
 * A failed request is forgotten, so the next mount retries, and the caller
 * keeps its prerendered fallback in the meantime.
 */
const requests = new Map<string, Promise<Json>>();

function fetchJson(url: string): Promise<Json> {
  let request = requests.get(url);
  if (!request) {
    request = fetch(url)
      .then((res) => res.json())
      .catch(() => {
        requests.delete(url);
        return null;
      });
    requests.set(url, request);
  }
  return request;
}

function useGithubValue(
  path: string,
  pick: (data: Json) => string | undefined,
  fallback: string
): string {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    let active = true;
    fetchJson(REPO_API + path).then((data) => {
      const picked = pick(data);
      if (active && picked) setValue(picked);
    });
    return () => {
      active = false;
    };
  }, [path, pick]);

  return value;
}

function formatStars(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}k`;
  return String(count);
}

function pickStars(data: Json) {
  const n = data?.stargazers_count;
  return typeof n === "number" ? formatStars(n) : undefined;
}

function pickTag(data: Json) {
  const tag = data?.tag_name;
  return typeof tag === "string" ? tag : undefined;
}

export function useGithubStars(): string {
  return useGithubValue("", pickStars, "6.2k");
}

export function useLatestRelease(): string {
  return useGithubValue("/releases/latest", pickTag, "v5.0");
}
