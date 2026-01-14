"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeInOnScroll } from "@/components/ui/text-generate-effect";

export function WorkflowClient({
  tabs,
}: {
  tabs: Array<{ id: string; label: string; code: string }>;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="workflow" className="relative bg-[var(--surface)] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.04), transparent 50%)
            `,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Powerful yet
            <br />
            <span className="text-[var(--muted)]">simple syntax</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Define complex security workflows in readable YAML
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2} className="mt-12">
          <div className="mx-auto max-w-5xl">
            <Tabs defaultValue={tabs[0]?.id} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[var(--background)]">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-[var(--surface-2)]"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-4">
                  <div className="overflow-hidden rounded-xl border border-[color:var(--color-terminal-border)]">
                    <div className="flex items-center justify-between border-b border-[color:var(--color-terminal-border)] bg-[color:var(--color-terminal-surface)] px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                        </div>
                        <span className="ml-4 text-sm text-[color:var(--color-terminal-muted)]">
                          {tab.label}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(tab.code, tab.id)}
                        className="flex items-center justify-center rounded-md p-2 text-[color:var(--color-terminal-muted)] transition-all hover:bg-[color:var(--color-terminal-border)] hover:text-[color:var(--color-terminal-text)]"
                        aria-label={copied === tab.id ? "Copied" : "Copy"}
                      >
                        {copied === tab.id ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <CopyIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <div className="overflow-x-auto bg-[color:var(--color-terminal-bg)] p-4">
                      <pre className="text-sm leading-relaxed text-[color:var(--color-terminal-text)]">
                        <code className="font-mono">
                          {tab.code.split("\n").map((line, i) => (
                            <div key={i} className="whitespace-pre">
                              {highlightYaml(line)}
                            </div>
                          ))}
                        </code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

function highlightYaml(line: string): React.ReactNode {
  if (line.trimStart().startsWith("#")) {
    return <span style={{ color: "var(--color-terminal-muted)" }}>{line}</span>;
  }

  const match = line.match(/^(\s*-?\s*)([^:\s][^:]*?)(\s*:\s*)(.*)$/);
  if (!match) {
    return <span style={{ color: "var(--color-terminal-text)" }}>{line}</span>;
  }

  const [, prefix, rawKey, separator, rawValue] = match;
  const key = rawKey.trimEnd();
  const value = rawValue;

  return (
    <>
      <span style={{ color: "var(--color-terminal-text)" }}>{prefix}</span>
      <span style={{ color: "var(--color-terminal-cyan)" }}>{key}</span>
      <span style={{ color: "var(--color-terminal-muted)" }}>{separator}</span>
      {highlightYamlValue(value)}
    </>
  );
}

function highlightYamlValue(value: string): React.ReactNode {
  if (value === "") {
    return null;
  }

  const trimmed = value.trim();

  if (trimmed.startsWith("#")) {
    return <span style={{ color: "var(--color-terminal-muted)" }}>{value}</span>;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return <span style={{ color: "var(--color-terminal-green)" }}>{value}</span>;
  }

  if (/^(true|false|null)\b/i.test(trimmed)) {
    return <span style={{ color: "var(--color-terminal-purple)" }}>{value}</span>;
  }

  if (/^-?\d+(\.\d+)?\b/.test(trimmed)) {
    return <span style={{ color: "var(--color-terminal-orange)" }}>{value}</span>;
  }

  const parts = value.split(/(\{\{.*?\}\})/g);
  if (parts.length > 1) {
    return (
      <>
        {parts.map((p, i) => {
          if (p.startsWith("{{") && p.endsWith("}}")) {
            return (
              <span key={i} style={{ color: "var(--color-terminal-yellow)" }}>
                {p}
              </span>
            );
          }
          return (
            <span key={i} style={{ color: "var(--color-terminal-text)" }}>
              {p}
            </span>
          );
        })}
      </>
    );
  }

  return <span style={{ color: "var(--color-terminal-text)" }}>{value}</span>;
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
