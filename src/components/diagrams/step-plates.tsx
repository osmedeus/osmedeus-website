import { Caption, Figure, Panel } from "@/components/ui/figure";

/*
 * THE THREE STEP FIGURES — define, execute, visualise.
 *
 * Each is one of the reference catalogue's flat plates redrawn with this
 * product's nouns: FIG 0.33 (a file read line by line), FIG 0.41 (a queue
 * dispatched onto free lanes) and FIG 0.11 (results landing as they come).
 * Same 320×220 frame, same 6s cycle, same register as the run figure above,
 * so read left to right they are one machine in three stages.
 */

/* ── 01 · Define ─────────────────────────────────────────────────────────── */

/** The declaration, as it is read: a key, then the value typed after it. */
const LINES: Array<{ key: number; value: number; accent?: boolean }> = [
  { key: 24, value: 70 },
  { key: 34, value: 0 },
  { key: 30, value: 56, accent: true },
  { key: 26, value: 84 },
  { key: 36, value: 70 },
  { key: 30, value: 0 },
  { key: 22, value: 60 },
  { key: 34, value: 48 },
];

export function DefinePlate({ className }: { className?: string }) {
  return (
    <Figure viewBox="0 0 320 220" className={className}>
      <Panel x={30} y={28} w={260} h={164} />
      <path d="M30 46 H290" style={{ stroke: "var(--og-border)" }} />
      <text
        x={42}
        y={40}
        style={{
          fontSize: "8px",
          fill: "var(--og-text-muted)",
        }}
      >
        workflow.yaml
      </text>

      {/* The reading head, running down the file. */}
      <rect
        x={31}
        y={51}
        width={258}
        height={14}
        style={{
          fill: "var(--og-accent-soft-bg)",
          animation: "og-caret calc(6s * var(--spd, 1)) steps(7, end) infinite",
        }}
      />

      <g
        textAnchor="end"
        style={{
          fontSize: "7.5px",
          fill: "var(--og-text-faint)",
        }}
      >
        {LINES.map((_, i) => (
          <text key={i} x={48} y={61 + i * 16}>
            {i + 1}
          </text>
        ))}
      </g>

      {/* Keys are read; values type themselves in behind the head. */}
      <g style={{ fill: "var(--og-text-faint)" }}>
        {LINES.map((line, i) => {
          const y = 55 + i * 16;
          const indent = i === 0 || i === 1 || i === 5 ? 58 : 70;
          return (
            <g key={i}>
              <rect
                x={indent}
                y={y}
                width={line.key}
                height={5}
                style={{
                  fill: line.accent ? "var(--og-accent)" : "var(--og-text-faint)",
                  opacity: line.accent ? 0.75 : 1,
                }}
              />
              {line.value > 0 && (
                <rect
                  className="tb"
                  x={indent + line.key + 6}
                  y={y}
                  width={line.value}
                  height={5}
                  style={{
                    animation: "og-type calc(6s * var(--spd, 1)) infinite",
                    animationDelay: `${(i * 0.12).toFixed(2)}s`,
                  }}
                />
              )}
            </g>
          );
        })}
      </g>

      {/* What the head found: the one line that is a parameter, not a literal. */}
      <g style={{ animation: "og-flagline calc(6s * var(--spd, 1)) infinite" }}>
        <rect
          x={106}
          y={87}
          width={56}
          height={5}
          style={{ fill: "var(--og-accent)" }}
        />
        <rect
          x={186}
          y={82}
          width={94}
          height={16}
          style={{ fill: "var(--og-surface)", stroke: "var(--og-accent)" }}
        />
        <text
          x={233}
          y={93}
          textAnchor="middle"
          style={{
            fontSize: "7.5px",
            fill: "var(--og-accent-fg)",
          }}
        >
          param · {"{{threads}}"}
        </text>
      </g>
    </Figure>
  );
}

/* ── 02 · Execute ────────────────────────────────────────────────────────── */

/*
 * The catalogue's `unified ingest` plate (FIG 0.30). It replaces an earlier
 * queue-and-workers drawing that used the same travelling-chip mechanic as the
 * run figure above: two drawings doing the same trick, one after the other,
 * read as one drawing stuttering.
 *
 * This one answers the copy directly — "via CLI, API, or events" — and its
 * motion is its own: everything falls into one neck and leaves as one stream.
 */

/** Every way a run can be started, and where each sits along the funnel's lip. */
const SOURCES = [
  { label: "cli", x: 106 },
  { label: "api", x: 142 },
  { label: "cron", x: 178 },
  { label: "event", x: 214 },
];

/** The funnel's neck — every source's fall converges on this x. */
const NECK = 160;

export function ExecutePlate({ className }: { className?: string }) {
  return (
    <Figure viewBox="0 0 320 220" className={className}>
      {/* The funnel: a wide lip, a neck, and one spout. */}
      <path
        d="M84 56 H236 L172 122 V160 H148 V122 Z"
        fillOpacity={0.5}
        style={{
          stroke: "var(--og-border-strong)",
          fill: "var(--og-surface)",
        }}
      />

      {/* What leaves it: one ordered stream. */}
      <path
        d="M160 160 V196"
        strokeDasharray="3 4"
        style={{
          stroke: "var(--og-accent)",
          animation: "og-dash calc(1.2s * var(--spd, 1)) linear infinite",
        }}
      />

      <g
        textAnchor="middle"
        style={{
          fontSize: "7.5px",
          fill: "var(--og-text-faint)",
        }}
      >
        {SOURCES.map((source) => (
          <text key={source.label} x={source.x} y={36}>
            {source.label}
          </text>
        ))}
      </g>

      {/* One run per source, falling in. The negative delays start the figure
          mid-stream rather than with an empty funnel. */}
      <g style={{ fill: "var(--og-accent)" }}>
        {SOURCES.map((source, i) => (
          <g key={source.label} transform={`translate(${source.x} 44)`}>
            <circle
              cx={0}
              cy={0}
              r={3}
              style={
                {
                  "--dx": `${NECK - source.x}px`,
                  animation: "og-funnel calc(6s * var(--spd, 1)) infinite",
                  animationDelay: `${(-i * 0.75).toFixed(2)}s`,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </g>

      <Caption x={160} y={212}>
        every trigger → one run queue
      </Caption>
    </Figure>
  );
}

/* ── 03 · Visualize & Analyze ────────────────────────────────────────────── */

const ROWS = [
  { host: "api.acme.com", tag: "200", bar: 54 },
  { host: "dev.acme.com", tag: "403", bar: 38 },
  { host: "git.acme.com", tag: "VULN", bar: 66, found: true },
  { host: "cdn.acme.com", tag: "200", bar: 30 },
  { host: "vpn.acme.com", tag: "301", bar: 44 },
];

export function VisualizePlate({ className }: { className?: string }) {
  return (
    <Figure viewBox="0 0 320 220" className={className}>
      <Panel x={30} y={28} w={260} h={164} />
      <path d="M30 48 H290" style={{ stroke: "var(--og-border)" }} />
      <text
        x={42}
        y={42}
        style={{
          fontSize: "8px",
          fill: "var(--og-text-muted)",
        }}
      >
        assets
      </text>
      <text
        x={278}
        y={42}
        textAnchor="end"
        style={{
          fontSize: "7px",
          fill: "var(--og-text-faint)",
        }}
      >
        5 of 128
      </text>

      {ROWS.map((row, i) => {
        const y = 62 + i * 26;
        return (
          <g
            key={row.host}
            style={{
              animation: "og-row calc(6s * var(--spd, 1)) infinite",
              animationDelay: `${(i * 0.4).toFixed(2)}s`,
            }}
          >
            <text
              x={42}
              y={y + 8}
              style={{
                fontSize: "7.5px",
                fill: "var(--og-text-body)",
              }}
            >
              {row.host}
            </text>
            <rect
              x={134}
              y={y}
              width={30}
              height={11}
              style={{
                fill: row.found
                  ? "var(--og-accent-soft-bg)"
                  : "var(--og-neutral-soft-bg)",
              }}
            />
            <text
              x={149}
              y={y + 8}
              textAnchor="middle"
              style={{
                fontSize: "6.5px",
                fill: row.found
                  ? "var(--og-accent-soft-fg)"
                  : "var(--og-neutral-soft-fg)",
              }}
            >
              {row.tag}
            </text>
            <rect
              x={176}
              y={y + 3}
              width={76}
              height={5}
              style={{ fill: "var(--og-track)" }}
            />
            <rect
              className="tb"
              x={176}
              y={y + 3}
              width={row.bar}
              height={5}
              style={{
                fill: row.found ? "var(--og-accent)" : "var(--og-border-strong)",
                animation: "og-progress calc(6s * var(--spd, 1)) infinite",
                animationDelay: `${(i * 0.4).toFixed(2)}s`,
              }}
            />
            {row.found && (
              <rect
                x={34}
                y={y - 3}
                width={252}
                height={17}
                style={{
                  stroke: "var(--og-accent)",
                  strokeDasharray: "3 2",
                  animation: "og-label calc(6s * var(--spd, 1)) infinite",
                }}
              />
            )}
          </g>
        );
      })}
    </Figure>
  );
}
