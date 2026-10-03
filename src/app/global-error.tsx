"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary: replaces the root layout when it, or hydration itself,
 * throws. Without it a client-side exception leaves a blank screen with
 * nothing to act on.
 *
 * Renders its own <html>/<body> and cannot rely on the layout's fonts or
 * globals.css, so everything is inline — which means the five hexes below are
 * the ONE place the dark ladder is duplicated rather than derived.
 *
 * In order of appearance they are the dark ladder's `--bg`, `--text-1`,
 * `--text-4`, `--accent` and `--line` — so two of them (`--bg` and `--line`)
 * are the de-greened ground, NOT the raw scheme literals they derive from.
 * Copy them from the `:root` block in globals.css rather than from the Ghostty
 * theme file. Re-theming means editing them here in lockstep; nothing enforces
 * it, so a swap that misses this file shows up only when the boundary renders.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[osmedeus] root error boundary", error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Osmedeus — something went wrong</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem 1.5rem",
          backgroundColor: "#131513",
          color: "#b0b5af",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <main style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "#636563",
            }}
          >
            CLIENT ERROR
          </p>
          <h1 style={{ margin: "0.75rem 0 0", fontSize: "1.75rem", fontWeight: 600 }}>
            This page failed to load
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.5, fontSize: "15px" }}>
            Something broke while rendering in your browser. Retrying usually
            fixes it — if not, your network may be blocking part of the site.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                cursor: "pointer",
                height: "2.75rem",
                padding: "0 1.5rem",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "2px",
                border: 0,
                color: "#131513",
                background: "#71d25b",
              }}
            >
              Try again
            </button>
            <a
              href="https://docs.osmedeus.org"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "2.75rem",
                padding: "0 1.5rem",
                fontSize: "14px",
                fontWeight: 500,
                borderRadius: "2px",
                color: "#b0b5af",
                textDecoration: "none",
                border: "1px solid #292f28",
              }}
            >
              Documentation
            </a>
          </div>
          {error.digest ? (
            <p
              style={{
                marginTop: "1.5rem",
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: "11px",
                color: "#636563",
              }}
            >
              ref: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
