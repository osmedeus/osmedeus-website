"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MovingBorder } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/spotlight";
import { FadeIn } from "@/components/ui/text-generate-effect";
import { GradientBackground } from "@/components/ui/aurora-background";

const defaultInstallBaseUrl = "https://osmedeus-website.vercel.app";

const trustedCompanies = [
  {
    name: "U.S. Dept Of Defense",
    href: "https://www.defense.gov/",
    logo: "/brands/us-dod.svg",
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

export function Hero({
  installBaseUrl = defaultInstallBaseUrl,
}: {
  installBaseUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const installCommand = useMemo(() => {
    return `curl -fsSL ${installBaseUrl}/install.sh | bash`;
  }, [installBaseUrl]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      void handleCopy();
    }
  };

  return (
    <GradientBackground className="relative min-h-screen overflow-hidden bg-[var(--background)]">
      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="rgba(255, 255, 255, 0.5)"
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pt-2 sm:px-6 lg:px-8">
        {/* Badge */}
        <FadeIn delay={0} duration={0.5}>
          <div className="mb-6 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-[var(--muted)]">
              <span className="block sm:hidden">
                v5.0 - with Next-Level Performance &amp; Power
              </span>
              <span className="hidden sm:inline">
                v5.0 Released – Cleaner, More Flexible Architecture and Next Level
                Power
              </span>
            </span>
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1} duration={0.5}>
          <h1 className="max-w-4xl text-center text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-[var(--foreground)]">Modern Orchestration</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--foreground)] via-[var(--muted)] to-[var(--foreground)] bg-clip-text text-transparent">
              Engine for Security
            </span>
          </h1>
        </FadeIn>

        {/* Tagline */}
        <FadeIn delay={0.2} duration={0.5}>
          <div className="mt-6 flex w-full flex-col items-center">
            <p className="max-w-2xl text-center text-lg text-[var(--muted)] sm:text-xl">
              Automate your security workflows with declarative YAML.
              <br className="hidden sm:block" />
              From reconnaissance to vulnerability scanning, all in one place.
            </p>

			<div className="mt-6 hidden w-full max-w-3xl px-2 sm:block lg:max-w-4xl">
              <MovingBorder
                as="div"
                rx="16px"
                ry="16px"
                containerClassName="w-full"
                className="bg-[color:var(--color-terminal-bg)] backdrop-blur-md"
                borderClassName="stroke-[rgba(255,255,255,0.35)]"
              >
                <div className="overflow-hidden rounded-[15px]">
                  <div
                    className="flex cursor-pointer flex-wrap items-center gap-3 px-4 py-3"
                    role="button"
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={handleCopyKeyDown}
                    aria-label="Copy install command"
                  >
                    <code
                      className="min-w-0 flex-1 break-words text-center font-mono text-xs leading-relaxed text-[color:var(--color-terminal-text)] sm:text-sm"
                      suppressHydrationWarning
                    >
                      <span style={{ color: "var(--color-terminal-muted)" }}>
                        $&nbsp;
                      </span>
                      {highlightBashCommand(installCommand)}
                    </code>

                    <span className="ml-auto shrink-0">
                      {copied ? (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs text-[color:var(--color-terminal-text)] sm:text-sm">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs text-[color:var(--color-terminal-muted)] transition-all hover:bg-[color:var(--color-terminal-border)] hover:text-[color:var(--color-terminal-text)] hover:shadow-[0_0_12px_rgba(255,255,255,0.05)] sm:text-sm">
                          <CopyIcon className="h-4 w-4" />
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </MovingBorder>
            </div>
          </div>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.3} duration={0.5}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://github.com/j3ssie/osmedeus"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="movingBorder"
                size="lg"
                className="w-[200px] justify-center"
              >
                <GithubIcon className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
            <a
              href="https://docs.osmedeus.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-[200px] justify-center border-blue-400/40 bg-blue-500/15 text-blue-100 hover:border-blue-400/60 hover:bg-blue-500/25 hover:text-white"
              >
                <BookOpenIcon className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </a>
          </div>
        </FadeIn>

        {/* Trusted By */}
        <FadeIn delay={0.4} duration={0.5}>
          <div className="mt-[55px] flex flex-col items-center gap-6">
            <p className="max-w-[38ch] px-4 text-center text-sm leading-snug tracking-normal text-[var(--muted)] sm:max-w-none sm:px-0 sm:tracking-wider">
              <span>Proven to identify real security vulnerabilities for Fortune 500</span>
              <br className="block sm:hidden" />
              <span>
                <span className="hidden sm:inline"> </span>
                companies and many more
              </span>
            </p>
            <div className="group relative w-full max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max items-center gap-x-12 py-2 pr-12 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
                {[...trustedCompanies, ...trustedCompanies].map((company, index) => {
                  const theme = mounted ? resolvedTheme : "dark";
                  const logoSrc =
                    typeof company.logo === "string"
                      ? company.logo
                      : theme === "light"
                        ? company.logo.light
                        : company.logo.dark;

                  return (
                    <a
                      key={`${company.name}-${index}`}
                      href={company.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-44 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
                      aria-label={company.name}
                    >
                      <Image
                        src={logoSrc}
                        alt={company.name}
                        width={140}
                        height={32}
                        className="h-7 w-auto"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <FadeIn delay={0.5} duration={0.5} className="absolute bottom-8">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--muted)]">Scroll to explore</span>
            <ChevronDownIcon className="h-4 w-4 text-[var(--muted)]" />
          </motion.div>
        </FadeIn>
      </div>
    </GradientBackground>
  );
}

function GithubIcon({ className }: { className?: string }) {
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
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function BookOpenIcon({ className }: { className?: string }) {
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
      <path d="M12 7v14" />
      <path d="M3 18a2 2 0 0 0 2 2h7" />
      <path d="M21 18a2 2 0 0 1-2 2h-7" />
      <path d="M5 4h6a2 2 0 0 1 2 2v1H5a2 2 0 0 0-2 2v9" />
      <path d="M19 4h-6a2 2 0 0 0-2 2v1h8a2 2 0 0 1 2 2v9" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function highlightBashCommand(command: string) {
  const urlMatch = command.match(/https?:\/\/\S+/);
  const url = urlMatch?.[0] ?? "";

  const [beforeUrl, afterUrl = ""] = url
    ? command.split(url)
    : [command, ""];

  const beforeTokens = beforeUrl.trim().split(/\s+/).filter(Boolean);
  const afterTokens = afterUrl.trim().split(/\s+/).filter(Boolean);

  return (
    <>
      {beforeTokens.map((t, i) => {
        const isFirst = i === 0;
        const color = isFirst
          ? "var(--color-terminal-cyan)"
          : t.startsWith("-")
            ? "var(--color-terminal-orange)"
            : "var(--color-terminal-text)";
        return (
          <span key={`b-${i}`}>
            {i > 0 ? " " : ""}
            <span style={{ color }}>{t}</span>
          </span>
        );
      })}
      {url && (
        <>
          {beforeTokens.length > 0 ? " " : ""}
          <span style={{ color: "var(--color-terminal-green)" }}>{url}</span>
        </>
      )}
      {afterTokens.map((t, i) => {
        const isPipe = t === "|";
        const color = isPipe
          ? "var(--color-terminal-pink)"
          : t === "bash"
            ? "var(--color-terminal-cyan)"
            : "var(--color-terminal-text)";
        return (
          <span key={`a-${i}`}>
            {" "}
            <span style={{ color }}>{t}</span>
          </span>
        );
      })}
    </>
  );
}

function CopyIcon({ className }: { className?: string }) {
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
