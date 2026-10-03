import { Section } from "@/components/ui/section";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";
import {
  DefinePlate,
  ExecutePlate,
  VisualizePlate,
} from "@/components/diagrams/step-plates";

const steps = [
  {
    title: "Define",
    description:
      "Declare targets and logic in clean, human-readable YAML.",
    plate: DefinePlate,
  },
  {
    title: "Execute",
    description:
      "Run scans via CLI, API, or events with parallel, smart, fully automated execution",
    plate: ExecutePlate,
  },
  {
    title: "Visualize & Analyze",
    description:
      "Explore results in a beautiful UI. Export or plug into your stack.",
    plate: VisualizePlate,
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Simple three-step"
      muted="workflow"
      lede="From configuration to results in minutes. No complex setup required."
    >
      {/*
        Each step draws its own mechanism. The figures share a projection and
        a tempo, so read left to right they are one machine in three stages
        rather than three unrelated pictures.
      */}
      <div className="mt-12 grid border-t border-l md:grid-cols-3">
        {steps.map((step, index) => (
          <FadeInOnScroll
            key={step.title}
            delay={index * 0.08}
            duration={0.6}
            className="border-r border-b"
          >
            <div className="flex h-full flex-col">
              <div className="border-b bg-[var(--inset)] px-2 py-2">
                <step.plate className="aspect-[320/220] w-full" />
              </div>

              <div className="p-6">
                <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-4)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[17px] font-medium text-[var(--text-1)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[150%] text-[var(--text-2)]">
                  {step.description}
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
