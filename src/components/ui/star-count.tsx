"use client";

import { Star } from "lucide-react";
import { useGithubStars } from "@/lib/use-github";
import { cn } from "@/lib/utils";

/** The repo's live star count, for the GitHub buttons. */
export function StarCount({ className }: { className?: string }) {
  const stars = useGithubStars();

  return (
    <span className={cn("inline-flex items-center gap-1 font-mono", className)}>
      <span>{stars}</span>
      <Star className="size-3 fill-current" />
    </span>
  );
}
