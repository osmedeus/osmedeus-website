import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CodeExample } from "@/components/sections/code-example";
import { Workflow } from "@/components/sections/workflow";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CodeExample />
      <Workflow />
      <Footer />
    </main>
  );
}
