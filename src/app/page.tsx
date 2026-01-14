import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CodeExample } from "@/components/sections/code-example";
import { Workflow } from "@/components/sections/workflow";
import { Footer } from "@/components/sections/footer";
import { headers } from "next/headers";

export default async function Home() {
  const isStaticExport = process.env.NEXT_STATIC_EXPORT === "true";

  let installBaseUrl: string | undefined;

  if (isStaticExport) {
    installBaseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://osmedeus.org";
  } else {
    const h = await headers();
    const proto = (h.get("x-forwarded-proto") ?? "http").split(",")[0]?.trim();
    const host = (h.get("x-forwarded-host") ?? h.get("host"))
      ?.split(",")[0]
      ?.trim();
    installBaseUrl = host ? `${proto}://${host}` : undefined;
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero installBaseUrl={installBaseUrl} />
      <Features />
      <HowItWorks />
      <CodeExample />
      <Workflow />
      <Footer />
    </main>
  );
}
