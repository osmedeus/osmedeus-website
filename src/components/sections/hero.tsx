import { FadeIn } from "@/components/ui/text-generate-effect";
import { InstallCta } from "@/components/sections/install-cta";
import { ReleaseChipText } from "@/components/sections/release-chip";
import { cn } from "@/lib/utils";

const trustedCompanies = [
  {
    name: "U.S. Dept Of Defense",
    href: "https://www.defense.gov/",
    logo: "/brands/us-dod.webp", // 11 KB raster of a 340 KB vector seal
  },
  {
    name: "Dell",
    href: "https://www.dell.com/",
    logo: "/brands/dell.svg",
  },
  {
    name: "Google",
    logo: "/brands/google-wordmark.svg",
  },
  {
    name: "Microsoft",
    href: "https://www.microsoft.com/",
    logo: "/brands/microsoft.svg",
  },
  {
    name: "Apple",
    href: "https://www.apple.com/",
    logo: {
      dark: "/brands/apple_dark.svg",
      light: "/brands/apple_light.svg",
    },
  },
  {
    name: "Netflix",
    href: "https://www.netflix.com/",
    logo: "/brands/netflix-wordmark.svg",
  },
  {
    name: "Alibaba",
    href: "https://www.alibaba.com/",
    logo: "/brands/alibaba.svg",
  },
  {
    name: "AT&T",
    href: "https://www.att.com/",
    logo: "/brands/att.svg",
  },
  {
    name: "Dyson",
    href: "https://www.dyson.com/",
    logo: "/brands/dyson.svg",
  },
  {
    name: "F-Secure",
    href: "https://www.f-secure.com/",
    logo: "/brands/f-secure.svg",
  },
  {
    name: "FireEye",
    href: "https://www.fireeye.com/",
    logo: "/brands/fireeye.svg",
  },
  {
    name: "Firefox",
    href: "https://www.firefox.com/",
    logo: "/brands/firefox.svg",
  },
  {
    name: "Grab",
    href: "https://www.grab.com/",
    logo: "/brands/grab.svg",
  },
  {
    name: "lululemon",
    href: "https://shop.lululemon.com/",
    logo: "/brands/lululemon.svg",
  },
  {
    name: "Snapchat",
    href: "https://www.snapchat.com/",
    logo: "/brands/snapchat.svg",
  },
  {
    name: "Square",
    href: "https://squareup.com/",
    logo: "/brands/square.svg",
  },
  {
    name: "Starbucks",
    href: "https://www.starbucks.com/",
    logo: "/brands/starbucks.svg",
  },
  {
    name: "Tencent",
    href: "https://www.tencent.com/",
    logo: "/brands/tencent.svg",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-[var(--bg)]">
      <div className="frame flex flex-col items-center pt-32 pb-16 sm:pt-36">
        {/* Release chip. A square mono tag, not a pill: the page has no pills. */}
        <FadeIn delay={0} duration={0.5}>
          <div className="mb-8 flex items-center gap-2.5 border bg-[var(--surface)] px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping bg-[var(--accent-fg)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-[var(--accent-fg)]" />
            </span>
            <ReleaseChipText />
          </div>
        </FadeIn>

        {/* Headline. Rises but never fades: it is the LCP element. */}
        <FadeIn delay={0.08} duration={0.5} fade={false}>
          <h1 className="max-w-4xl text-center text-4xl font-semibold sm:text-5xl md:text-6xl">
            <span className="text-[var(--text-1)]">Modern Orchestration</span>
            <br />
            <span className="text-[var(--text-1)]">
              Engine for{" "}
              <span className="hl">
                <span>Security</span>
              </span>
            </span>
          </h1>
        </FadeIn>

        {/* Tagline */}
        <FadeIn delay={0.16} duration={0.5}>
          <p className="prose-measure mt-6 text-center text-[15px] leading-[150%] text-[var(--text-2)] sm:text-base">
            Automate your security workflows with declarative YAML.{" "}
            <br className="hidden sm:block" />
            From reconnaissance to vulnerability scanning, all in one place.
          </p>
        </FadeIn>

        {/* The ask, in the first screen: install, source, docs. */}
        <FadeIn delay={0.24} duration={0.5} className="w-full">
          <div className="mt-8 flex w-full justify-center">
            <InstallCta />
          </div>
        </FadeIn>

        {/* Trusted by */}
        <FadeIn delay={0.32} duration={0.5} className="w-full">
          <div className="mt-14 flex flex-col items-center gap-6">
            <p className="px-4 text-center font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-3)]">
              Finding real vulnerabilities at Fortune 500 companies
            </p>
            <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max items-center gap-x-16 py-2 pr-16 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
                {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
                  <a
                    key={`${company.name}-${index}`}
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-44 items-center justify-center opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
                    aria-label={company.name}
                  >
                    {typeof company.logo === "string" ? (
                      <BrandLogo src={company.logo} alt={company.name} />
                    ) : (
                      // Both variants ship; CSS shows the one for the theme, so
                      // there is no post-hydration swap of the whole marquee.
                      <>
                        <BrandLogo
                          src={company.logo.dark}
                          alt={company.name}
                          className="only-dark"
                        />
                        <BrandLogo
                          src={company.logo.light}
                          alt={company.name}
                          className="only-light"
                        />
                      </>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/*
 * A plain <img>, not next/image: images ship unoptimized (next.config.ts), so
 * <Image> would render this same tag but as a client component, and the
 * marquee would hydrate 38 of them for nothing.
 */
function BrandLogo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see above
    <img
      src={src}
      alt={alt}
      width={180}
      height={44}
      loading="lazy"
      decoding="async"
      className={cn("h-9 w-auto", className)}
    />
  );
}
