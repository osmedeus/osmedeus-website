"use client";

import * as React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

/*
 * The masters in /static/demo-images are 3–4k px PNGs at 1.1–1.5 MB each, and
 * the static export serves images exactly as they are on disk. So each shot
 * ships twice, pre-sized as WebP: `thumb` for the card (1200w, ~40–85 KB) and
 * `full` for the lightbox (2400w, ~160–260 KB).
 */
const showcaseImages = [
  {
    thumb: "/static/demo-images/cli-run-progress-1200.webp",
    full: "/static/demo-images/cli-run-progress-2400.webp",
    alt: "CLI run progress",
  },
  {
    thumb: "/static/demo-images/web-ui-workflow-1-1200.webp",
    full: "/static/demo-images/web-ui-workflow-1-2400.webp",
    alt: "Web UI workflow",
  },
  {
    thumb: "/static/demo-images/web-ui-assets-1200.webp",
    full: "/static/demo-images/web-ui-assets-2400.webp",
    alt: "Web UI assets",
  },
] as const;

/** Warm the lightbox file while the pointer is still on its way to click. */
function prefetchFull(src: string) {
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

/** The interactive half of the Showcases section: the shots and their lightbox. */
export function ShowcaseGallery() {
  const [activeImage, setActiveImage] = React.useState<
    (typeof showcaseImages)[number] | null
  >(null);

  return (
    <>
      {/* Framed, not floated: each shot sits in a bordered panel with its own
          caption bar, the way a screenshot in a manual does. */}
      <div className="mt-12 grid border-t border-l md:grid-cols-3">
        {showcaseImages.map((image, i) => (
          <FadeInOnScroll
            key={image.full}
            delay={i * 0.08}
            duration={0.6}
            className="border-r border-b"
          >
            <figure className="flex h-full flex-col">
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                onPointerEnter={() => prefetchFull(image.full)}
                onFocus={() => prefetchFull(image.full)}
                className="stripe-hover group relative h-56 w-full overflow-hidden bg-[var(--inset)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] md:h-64"
                aria-label={`Open ${image.alt}`}
              >
                {/* Not preloaded: this section is well below the fold, and a
                    high-priority image here would queue ahead of the JS and
                    fonts the first screen actually needs. */}
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-contain p-5 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>

              <figcaption className="flex items-center gap-2 border-t px-4 py-3 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-3)]">
                <span className="h-[5px] w-[5px] shrink-0 bg-[var(--text-4)]" />
                <span className="truncate">{image.alt}</span>
              </figcaption>
            </figure>
          </FadeInOnScroll>
        ))}
      </div>

      <ImageModal image={activeImage} onClose={() => setActiveImage(null)} />
    </>
  );
}

function ImageModal({
  image,
  onClose,
}: {
  image: (typeof showcaseImages)[number] | null;
  onClose: () => void;
}) {
  const isOpen = Boolean(image);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] p-4"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <div
        className="relative w-[92vw] max-w-6xl border bg-[var(--inset)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-3)]">
            {image.alt}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center text-[var(--text-3)] transition-colors hover:text-[var(--text-1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* The card's thumb is already in cache, so it paints instantly and
            the full-size file sharpens it in place when it lands. */}
        <div className="relative h-[78vh] w-full">
          <Image
            src={image.thumb}
            alt=""
            aria-hidden
            fill
            unoptimized
            sizes="92vw"
            className="object-contain p-5"
          />
          <Image
            src={image.full}
            alt={image.alt}
            fill
            unoptimized
            sizes="92vw"
            className="object-contain p-5"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
