"use client";

import { SpotlightCard } from "@/components/ui/spotlight";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

const features = [
  {
    title: "Declarative Workflows",
    description:
      "Design readable, powerful reconnaissance pipelines using simple YAML definitions",
    icon: FileCodeIcon,
  },
  {
    title: "Flexible Execution",
    description:
      "Run workflows locally, in Docker, over SSH, or distributed via Redis workers",
    icon: NetworkIcon,
  },
  {
    title: "Smart Orchestration",
    description:
      "Control flow with conditions, events, scheduling, and parallel execution",
    icon: BlocksIcon,
  },
  {
    title: "Extensible Automation",
    description:
      "Templates, utilities, plugins, HTTP steps, and LLM-powered actions built in",
    icon: PuzzleIcon,
  },
  {
    title: "Integrated Platform",
    description:
      "REST API, databases, cloud storage, notifications, snapshots, and Nix tooling",
    icon: CloudIcon,
  },
  {
    title: "Beautiful Web UI",
    description:
      "Visualize workflows, assets, and execution state through a modern web interface",
    icon: MonitorIcon,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need for
            <br />
            <span className="text-[var(--muted)]">security automation</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            A complete toolkit for security professionals. From reconnaissance
            to reporting, Osmedeus handles it all.
          </p>
        </FadeInOnScroll>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FadeInOnScroll
              key={feature.title}
              delay={index * 0.1}
              duration={0.5}
            >
              <SpotlightCard className="h-full">
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--surface-2)]">
                    <feature.icon className="h-6 w-6 text-[var(--foreground)]" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {feature.description}
                  </p>
                </div>
              </SpotlightCard>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function FileCodeIcon({ className }: { className?: string }) {
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
      <path d="M10 12.5 8 15l2 2.5" />
      <path d="m14 12.5 2 2.5-2 2.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
    </svg>
  );
}

function NetworkIcon({ className }: { className?: string }) {
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
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  );
}

function PuzzleIcon({ className }: { className?: string }) {
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
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.247-.665-.89-1.166-1.653-1.166-.966 0-1.75.79-1.75 1.75 0 .422-.18.79-.483 1.064a1.478 1.478 0 0 1-1.064.436H12.05c-.79 0-1.426-.636-1.426-1.426 0-.874-.72-1.614-1.594-1.614-.966 0-1.75.784-1.75 1.75 0 .315-.107.604-.288.834-.18.229-.432.395-.721.474a1.425 1.425 0 0 1-1.022-.12l-1.611-1.611A2.41 2.41 0 0 1 2.93 12.93c0-.617.236-1.234.706-1.704L5.15 9.712c.23-.23.338-.556.29-.878-.07-.47-.48-.802-.925-.968a1.79 1.79 0 0 1-1.166-1.653c0-.966.79-1.75 1.75-1.75.422 0 .79-.18 1.064-.483A1.478 1.478 0 0 1 6.6 2.93h.93c.79 0 1.426.636 1.426 1.426 0 .874.72 1.614 1.594 1.614.966 0 1.75-.784 1.75-1.75 0-.315.107-.604.288-.834.18-.229.432-.395.721-.474a1.425 1.425 0 0 1 1.022.12l1.611 1.611c.939.939.939 2.47 0 3.408l-1.568 1.568c-.23.23-.338.556-.289.878.07.47.48.802.925.968a1.79 1.79 0 0 1 1.166 1.653c0 .966-.79 1.75-1.75 1.75-.422 0-.79.18-1.064.483a1.478 1.478 0 0 1-.436 1.064v.93c0 .79-.636 1.426-1.426 1.426-.874 0-1.614-.72-1.614-1.594 0-.966-.784-1.75-1.75-1.75-.315 0-.604.107-.834.288-.229.18-.395.432-.474.721a1.425 1.425 0 0 1-.12 1.022" />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
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
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function BlocksIcon({ className }: { className?: string }) {
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
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </svg>
  );
}
