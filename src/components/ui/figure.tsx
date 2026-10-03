import * as React from "react";

/**
 * A diagram. Holds the motion contract: animations run only while the figure
 * is on screen, and PAUSE rather than reset when it leaves, so scrolling back
 * resumes the story instead of restarting it. <ViewportObserver /> toggles
 * `is-playing` on every `[data-play]`, so the drawing itself stays a server
 * component and ships as HTML, not JavaScript.
 */
export function Figure({
  viewBox,
  className,
  children,
}: {
  viewBox: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-play="" className={className}>
      <svg
        className="fig"
        viewBox={viewBox}
        fill="none"
        strokeWidth={1}
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

/** The catalogue's connector: a dashed bezier that marches toward its target. */
export function Curve({
  d,
  marching = true,
  stroke = "var(--og-border)",
}: {
  d: string;
  marching?: boolean;
  stroke?: string;
}) {
  return (
    <path
      d={d}
      strokeDasharray="2 4"
      style={{
        stroke,
        animation: marching
          ? "og-dash calc(1.2s * var(--spd, 1)) linear infinite"
          : undefined,
      }}
    />
  );
}

/** A labelled box — the one container every flat figure is built from. */
export function Panel({
  x,
  y,
  w,
  h,
  label,
  sunken = false,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  sunken?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        style={{
          fill: sunken ? "var(--og-surface-sunken)" : "var(--og-surface)",
          stroke: "var(--og-border-strong)",
        }}
      />
      {label && (
        <text
          x={x + 8}
          y={y + 13}
          style={{
            fontSize: "7.5px",
            fill: "var(--og-text-muted)",
          }}
        >
          {label}
        </text>
      )}
      {children}
    </g>
  );
}

/** The one-line gloss under a figure, in the catalogue's own register. */
export function Caption({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      style={{
        fontSize: "8px",
        fill: "var(--og-text-muted)",
      }}
    >
      {children}
    </text>
  );
}
