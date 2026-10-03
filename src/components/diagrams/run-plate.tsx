import { Caption, Curve, Figure, Panel } from "@/components/ui/figure";

/*
 * THE RUN FIGURE — one target, four modules, one workspace.
 *
 * The catalogue's `fan-out, fan-in` plate (FIG 0.44) redrawn with Osmedeus's
 * nouns and widened for a full-width panel. A shard leaves the target for each
 * module, the module's bar fills while it holds it, and every shard comes back
 * into the same workspace — which is the whole claim the six cells below then
 * break into parts.
 *
 * Module names are the default web workflow's, so the drawing stays truthful
 * to what a run actually does.
 */

const MODULES = ["subdomain", "probing", "portscan", "vuln-scan"] as const;

/** Row geometry. One row per module, evenly spaced down the middle column. */
const ROW_H = 30;
const ROW_Y = [28, 70, 112, 154];
const ROW_X = 250;
const ROW_W = 180;

/** Where a shard starts (the target's edge) and ends (the workspace's). */
const SHARD = { x: 140, y: 113, w: 16, h: 12 };
const TARGET_MID = 120;
const MERGE_X = 506;

/**
 * A shard rests in a slot at its module's left edge, and the module's name
 * starts after that slot — so the chip arrives from the left and stops short
 * of the text instead of sliding across it. Parking it anywhere further in
 * means it crosses the label in flight, which is what made the earlier
 * version read as broken even though it came to rest in a clear gap.
 */
const SLOT_X = ROW_X + 6;
const LABEL_X = ROW_X + 30;

export function RunPlate({ className }: { className?: string }) {
  return (
    <Figure viewBox="0 0 640 240" className={className}>
      {/* Out to each module, and back into the workspace. */}
      {ROW_Y.map((y, i) => {
        const mid = y + ROW_H / 2;
        return (
          <g key={`lead-${i}`}>
            <Curve d={`M132 ${TARGET_MID} C190 ${TARGET_MID} 190 ${mid} ${ROW_X} ${mid}`} />
            <Curve d={`M${ROW_X + ROW_W} ${mid} C470 ${mid} 470 108 ${MERGE_X} 108`} />
          </g>
        );
      })}

      {/* The target. */}
      <Panel x={24} y={94} w={108} h={52}>
        <text
          x={36}
          y={116}
          style={{
            fontSize: "9px",
            fill: "var(--og-text)",
          }}
        >
          acme.com
        </text>
        <text
          x={36}
          y={132}
          style={{
            fontSize: "7px",
            fill: "var(--og-text-faint)",
          }}
        >
          one target
        </text>
      </Panel>

      {/* The modules. Each bar fills only once its shard has arrived. */}
      {MODULES.map((name, i) => {
        const y = ROW_Y[i];
        const delay = (i * 0.45).toFixed(2);
        return (
          <g key={name}>
            <Panel x={ROW_X} y={y} w={ROW_W} h={ROW_H} />
            <text
              x={LABEL_X}
              y={y + 19}
              style={{
                fontSize: "8px",
                fill: "var(--og-text-body)",
              }}
            >
              {name}
            </text>
            <rect
              x={ROW_X + 92}
              y={y + 13}
              width={60}
              height={4}
              style={{ fill: "var(--og-track)" }}
            />
            <rect
              className="tb"
              x={ROW_X + 92}
              y={y + 13}
              width={60}
              height={4}
              style={{
                fill: "var(--og-accent)",
                animation: `og-work calc(6s * var(--spd, 1)) infinite`,
                animationDelay: `${delay}s`,
              }}
            />
            <circle
              cx={ROW_X + 166}
              cy={y + 15}
              r={2.5}
              style={{
                fill: "var(--og-text-faint)",
                animation: `og-wdot calc(6s * var(--spd, 1)) infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          </g>
        );
      })}

      {/*
        The shards: out to a module, held while it works, then gone. The
        return leg is drawn by the marching curves on the right rather than by
        the chip, because a chip flying back across its own row crosses the
        bar it just filled.
      */}
      {ROW_Y.map((y, i) => (
        <rect
          key={`shard-${i}`}
          x={SHARD.x}
          y={SHARD.y}
          width={SHARD.w}
          height={SHARD.h}
          style={
            {
              fill: "var(--og-accent-soft-bg)",
              stroke: "var(--og-accent)",
              "--tx": `${SLOT_X - SHARD.x}px`,
              "--ty": `${y + (ROW_H - SHARD.h) / 2 - SHARD.y}px`,
              animation: `og-task calc(6s * var(--spd, 1)) infinite`,
              animationDelay: `${(i * 0.45).toFixed(2)}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* One workspace, and the finding it came back with. */}
      <Panel x={500} y={80} w={116} h={56}>
        <text
          x={512}
          y={102}
          style={{
            fontSize: "9px",
            fill: "var(--og-text)",
          }}
        >
          one workspace
        </text>
        <g style={{ animation: "og-result calc(6s * var(--spd, 1)) infinite" }}>
          <rect
            x={512}
            y={110}
            width={40}
            height={13}
            style={{ fill: "var(--og-accent-soft-bg)" }}
          />
          <text
            x={532}
            y={119.5}
            textAnchor="middle"
            style={{
              fontSize: "7px",
              fill: "var(--og-accent-soft-fg)",
            }}
          >
            FOUND
          </text>
          <rect
            x={558}
            y={114}
            width={46}
            height={5}
            style={{ fill: "var(--og-track)" }}
          />
        </g>
      </Panel>

      <Caption x={320} y={226}>
        one target → four modules → one workspace
      </Caption>
    </Figure>
  );
}
