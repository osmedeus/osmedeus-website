import { readFileSync } from "node:fs";
import path from "node:path";
import { WorkflowTabs } from "@/components/sections/workflow-tabs";
import { Section } from "@/components/ui/section";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

/*
 * The demos are the files in static/demo-workflow, read at build time, so the
 * page and the copies shipped under /static cannot drift apart.
 */
const tabs = [
  { id: "flow", label: "Flow" },
  { id: "bash", label: "Bash" },
  { id: "docker", label: "Docker" },
  { id: "ssh", label: "SSH" },
  { id: "agent", label: "Agent" },
].map((tab) => ({
  ...tab,
  code: readFileSync(
    path.join(process.cwd(), "static/demo-workflow", `demo-${tab.id}.yaml`),
    "utf8"
  ).trimEnd(),
}));

export function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="Workflow"
      title="Powerful yet"
      muted="simple syntax"
      lede="Define complex security workflows in readable YAML"
    >
      <FadeInOnScroll delay={0.08} duration={0.6} className="mt-12">
        <WorkflowTabs tabs={tabs} />
      </FadeInOnScroll>
    </Section>
  );
}
