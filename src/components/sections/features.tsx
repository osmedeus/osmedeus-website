import { CornerBox } from "@/components/ui/corner-box";
import { RunPlate } from "@/components/diagrams/run-plate";
import {
  BlocksIcon,
  BotIcon,
  FileCodeIcon,
  MonitorIcon,
  NetworkIcon,
  PuzzleIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
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
    title: "Agent & LLM Integration",
    description:
      "Built-in AI agents and LLM-powered actions for intelligent automation and decision-making",
    icon: BotIcon,
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
    <Section
      id="features"
      eyebrow="Features"
      title="Everything you need for"
      muted="security automation"
      lede="A complete toolkit for security professionals. From reconnaissance to reporting, Osmedeus handles it all."
    >
      {/*
        One run, end to end — the claim above drawn out before it is broken
        into six. The figure comes first because a reader who has seen the
        machine move reads the list as parts of one thing.
      */}
      <FadeInOnScroll delay={0.08}>
        <div className="mt-12 border bg-[var(--inset)] px-2 py-4 sm:px-6 sm:py-6">
          <RunPlate className="aspect-[640/240] w-full" />
        </div>
      </FadeInOnScroll>

      {/*
        One hairline grid, not six cards: cells share their edges, so the
        section reads as a table of capabilities rather than a pile of boxes.
      */}
      <div className="mt-10 grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FadeInOnScroll
            key={feature.title}
            delay={(index % 3) * 0.08}
            duration={0.6}
            className="border-r border-b"
          >
            <CornerBox
              flush
              hoverOnly
              stripes
              bordered={false}
              className="group h-full p-6"
            >
              <feature.icon className="h-[18px] w-[18px] text-[var(--text-3)] transition-colors group-hover:text-[var(--accent-fg)]" />
              <h3 className="mt-5 text-[15px] font-medium text-[var(--text-1)]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[150%] text-[var(--text-2)]">
                {feature.description}
              </p>
            </CornerBox>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
