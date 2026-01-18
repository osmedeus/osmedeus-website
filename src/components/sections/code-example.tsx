"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

const showcaseImages = [
  {
    src: "/static/demo-images/cli-run-progress.png",
    alt: "CLI run progress",
  },
  {
    src: "/static/demo-images/web-ui-workflow-1.png",
    alt: "Web UI workflow",
  },
  {
    src: "/static/demo-images/web-ui-assets.png",
    alt: "Web UI assets",
  },
] as const;

export function CodeExample() {
  const [activeImage, setActiveImage] = React.useState<
    (typeof showcaseImages)[number] | null
  >(null);

  return (
    <section id="showcases" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Showcases
            <br />
            <span className="text-[var(--muted)]">CLI + Web UI snapshots</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            A quick look at real runs, workflows, and assets.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2} className="mt-12">
          <div className="mx-auto max-w-5xl">
            <BentoGrid className="mx-auto max-w-5xl">
              {showcaseImages.map((image, i) => (
                <BentoGridItem
                  key={image.src}
                  title={image.alt}
                  description=""
                  header={
                    <ShowcaseImage
                      src={image.src}
                      alt={image.alt}
                      priority={i === 0}
                      onOpen={() => setActiveImage(image)}
                    />
                  }
                  className=""
                />
              ))}
            </BentoGrid>
          </div>
        </FadeInOnScroll>
      </div>

      <ImageModal image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}

function ShowcaseImage({
  src,
  alt,
  priority,
  onOpen,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative h-full w-full overflow-hidden rounded-xl bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      aria-label={`Open ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="object-contain p-6"
      />
    </button>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <div
        className="relative w-[92vw] max-w-6xl rounded-2xl border border-white/10 bg-black/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/80 ring-1 ring-white/10 transition hover:bg-black/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label="Close"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <div className="relative h-[80vh] w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="92vw"
            className="object-contain p-6"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between overflow-hidden rounded-xl border border-[color:var(--color-terminal-border)] bg-[color:var(--color-terminal-surface)] shadow-[0_0_60px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      <div className="flex h-56 items-center justify-center p-3 md:h-auto md:flex-1">
        {header}
      </div>
      {(title || description || icon) && (
        <div className="flex items-center gap-3 border-t border-[color:var(--color-terminal-border)] px-4 py-3">
          {icon}
          <div className="min-w-0">
            {title && (
              <div className="truncate text-sm font-medium text-[var(--foreground)]">
                {title}
              </div>
            )}
            {description && (
              <div className="truncate text-xs text-[var(--muted)]">
                {description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
