"use client";

import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

const steps = [
  {
    title: "Define",
    description:
      "Declare targets and logic in clean, human-readable YAML.",
    illustration: YamlIllustration,
  },
  {
    title: "Execute",
    description:
      "Run scans via CLI, API, or events with parallel, smart, fully automated execution",
    illustration: ExecuteIllustration,
  },
  {
    title: "Visualize & Analyze",
    description:
      "Explore results in a beautiful UI. Export or plug into your stack.",
    illustration: VisualizeIllustration,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[var(--surface)] py-24 sm:py-32"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(800px circle at 20% 50%, rgba(255,255,255,0.03), transparent 50%),
              radial-gradient(600px circle at 80% 50%, rgba(255,255,255,0.02), transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple three-step
            <br />
            <span className="text-[var(--muted)]">workflow</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            From configuration to results in minutes.
            No complex setup required.
          </p>
        </FadeInOnScroll>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <FadeInOnScroll
              key={step.title}
              delay={index * 0.15}
              duration={0.5}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-full max-w-xs">
                  {index < steps.length - 1 && (
                    <div className="pointer-events-none absolute right-[-2.75rem] top-[110px] hidden items-center lg:flex">
                      <div className="mx-3 h-px w-16 bg-gradient-to-r from-[var(--border)] to-transparent" />
                    </div>
                  )}
                  <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow-glow)]">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(800px circle at 20% 20%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(700px circle at 80% 70%, rgba(255,255,255,0.04), transparent 55%)",
                      }}
                    />
                    <div className="relative p-3">
                      <step.illustration className="h-32 w-full" />
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function YamlIllustration({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 220"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="yaml_g" x1="60" y1="20" x2="360" y2="220">
          <stop offset="0" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.25" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      <rect x="70" y="24" width="280" height="172" rx="18" fill="url(#yaml_g)" />
      <rect
        x="70"
        y="24"
        width="280"
        height="172"
        rx="18"
        stroke="rgba(255,255,255,0.14)"
      />

      <path
        d="M304 24v46c0 10 8 18 18 18h28"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="2"
      />

      <g stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round">
        <path d="M110 82h120" opacity="0.85" />
        <path d="M110 108h190" opacity="0.72" />
        <path d="M110 134h170" opacity="0.6" />
        <path d="M110 160h140" opacity="0.52" />
      </g>

      <g fill="rgba(255,255,255,0.7)">
        <circle cx="98" cy="82" r="4" />
        <circle cx="98" cy="108" r="4" />
        <circle cx="98" cy="134" r="4" />
        <circle cx="98" cy="160" r="4" />
      </g>

      <g stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round">
        <path d="M258 96l-10 14 10 14" />
        <path d="M292 96l10 14-10 14" />
      </g>
    </svg>
  );
}

function ExecuteIllustration({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 220"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="exec_g" x1="40" y1="10" x2="380" y2="220">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#22c55e" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <rect x="46" y="38" width="328" height="156" rx="18" fill="url(#exec_g)" />
      <rect
        x="46"
        y="38"
        width="328"
        height="156"
        rx="18"
        stroke="rgba(255,255,255,0.14)"
      />

      <g fill="rgba(255,255,255,0.55)">
        <circle cx="74" cy="62" r="6" />
        <circle cx="98" cy="62" r="6" opacity="0.8" />
        <circle cx="122" cy="62" r="6" opacity="0.65" />
      </g>

      <g stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round">
        <path d="M76 98h110" opacity="0.8" />
        <path d="M76 122h160" opacity="0.7" />
        <path d="M76 146h132" opacity="0.6" />
        <path d="M76 170h92" opacity="0.55" />
      </g>

      <g>
        <circle cx="308" cy="132" r="40" fill="rgba(255,255,255,0.08)" />
        <circle
          cx="308"
          cy="132"
          r="40"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
        <path
          d="M296 114l32 18-32 18z"
          fill="rgba(255,255,255,0.75)"
        />
      </g>
    </svg>
  );
}

function VisualizeIllustration({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 220"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="viz_g" x1="50" y1="0" x2="380" y2="220">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.22" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <rect x="44" y="30" width="332" height="172" rx="18" fill="url(#viz_g)" />
      <rect
        x="44"
        y="30"
        width="332"
        height="172"
        rx="18"
        stroke="rgba(255,255,255,0.14)"
      />

      <rect
        x="66"
        y="54"
        width="120"
        height="52"
        rx="12"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
      />
      <rect
        x="206"
        y="54"
        width="148"
        height="52"
        rx="12"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
      />

      <rect
        x="66"
        y="118"
        width="288"
        height="64"
        rx="12"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.14)"
      />

      <g stroke="rgba(255,255,255,0.72)" strokeWidth="3" strokeLinecap="round">
        <path d="M90 162l52-28 40 18 54-34 52 24" />
      </g>

      <g fill="rgba(255,255,255,0.75)">
        <circle cx="90" cy="162" r="4" />
        <circle cx="142" cy="134" r="4" />
        <circle cx="182" cy="152" r="4" />
        <circle cx="236" cy="118" r="4" />
        <circle cx="288" cy="142" r="4" />
      </g>
    </svg>
  );
}
