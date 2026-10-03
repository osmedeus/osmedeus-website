"use client";

import { useEffect } from "react";

/**
 * The page's one scroll watcher. Mount once, after the sections.
 *
 * Play: every <Figure> (`[data-play]`) gets `is-playing` while on screen, so
 * its animations pause rather than reset when it leaves.
 *
 * Reveal: every <FadeInOnScroll> (`[data-reveal]`) still below the viewport is
 * hidden, which is invisible by definition, and played in as it arrives.
 * Blocks already on screen (or scrolled past, e.g. after a `#hash` jump) are
 * left alone.
 */
export function ViewportObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const player = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-playing", entry.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    for (const el of document.querySelectorAll("[data-play]")) {
      player.observe(el);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => player.disconnect();
    }

    const revealer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal-state", "shown");
          revealer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );

    // Read every position before writing any state: arming applies a
    // transform, which would skew the rects of anything measured after it.
    // The state lives on its own attribute, one React never renders, so a
    // re-render of the section cannot reset it.
    const fold = window.innerHeight;
    const below = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    ).filter((el) => el.getBoundingClientRect().top > fold);

    for (const el of below) {
      el.setAttribute("data-reveal-state", "armed");
      revealer.observe(el);
    }

    return () => {
      player.disconnect();
      revealer.disconnect();
    };
  }, []);

  return null;
}
