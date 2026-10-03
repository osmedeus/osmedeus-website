import { cn } from "@/lib/utils";

/*
 * THE REVEAL, and it is the page's only entrance.
 *
 * 16px and 0.7s on a quarter-ease: far enough to register as arriving, short
 * enough that a reader scrolling at speed never waits for it. Every section
 * calls one of these two, so the whole page moves on one clock — change it
 * here (and in the `reveal` block of globals.css), not at a call site.
 *
 * Both are plain CSS and need no client JavaScript of their own. The first
 * screen used to sit at `opacity:0` until React and the animation library had
 * downloaded and hydrated, so a slow phone saw an empty hero for seconds; a
 * CSS keyframe starts on first paint instead.
 */
const DURATION = 0.7;

function revealStyle(delay: number, duration: number) {
  return {
    "--reveal-delay": `${delay}s`,
    "--reveal-dur": `${duration}s`,
  } as React.CSSProperties;
}

/** Above the fold: plays on first paint, needs no JavaScript at all. */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = DURATION,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  /** `false` keeps the rise but paints visible from frame one — use it on
   *  the block that should be the page's Largest Contentful Paint. */
  fade?: boolean;
}) {
  return (
    <div
      data-fade={fade ? undefined : "false"}
      className={cn("reveal-in", className)}
      style={revealStyle(delay, duration)}
    >
      {children}
    </div>
  );
}

/**
 * Below the fold. Prerendered VISIBLE — nothing is hidden until
 * <ViewportObserver /> (ui/viewport-observer.tsx) has hydrated and armed the blocks still under the fold,
 * so a failed or slow script can never leave a section blank.
 */
export function FadeInOnScroll({
  children,
  className,
  delay = 0,
  duration = DURATION,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <div
      data-reveal=""
      className={className}
      style={revealStyle(delay, duration)}
    >
      {children}
    </div>
  );
}
