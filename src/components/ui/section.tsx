import * as React from "react";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

/**
 * A page band: hairline rule underneath, then eyebrow, a two-tone heading
 * (`muted` is its quiet second half) and a one-line lede. The vertical rhythm
 * between sections lives here and nowhere else.
 */
export function Section({
  id,
  eyebrow,
  title,
  muted,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  muted: string;
  lede: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative border-b pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="frame">
        <FadeInOnScroll className="prose-measure">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 text-3xl font-semibold sm:text-[40px] sm:leading-[1.1]">
            {title} <span className="text-[var(--text-3)]">{muted}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-[150%] text-[var(--text-2)]">
            {lede}
          </p>
        </FadeInOnScroll>
        {children}
      </div>
    </section>
  );
}
