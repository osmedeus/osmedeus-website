import { ShowcaseGallery } from "@/components/sections/showcase-gallery";
import { Section } from "@/components/ui/section";

export function CodeExample() {
  return (
    <Section
      id="showcases"
      eyebrow="Showcases"
      title="Showcases"
      muted="CLI + Web UI snapshots"
      lede="A quick look at real runs, workflows, and assets."
    >
      <ShowcaseGallery />
    </Section>
  );
}
