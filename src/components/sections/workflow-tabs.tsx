"use client";

import { Check, Copy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopied } from "@/lib/use-copied";

/** The interactive half of the Workflow section: tab switching and copy. */
export function WorkflowTabs({
  tabs,
}: {
  tabs: Array<{ id: string; label: string; code: string }>;
}) {
  const { copied, copy } = useCopied();

  return (
    <Tabs defaultValue={tabs[0]?.id} className="w-full">
      <TabsList className="w-full overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <div className="border-x border-b bg-[var(--inset)]">
            {/* A filename, not a window: this is a file in a repo, and
                three coloured dots would claim it is a screenshot. */}
            <div className="flex items-center justify-between border-b px-4 py-2.5">
              <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--text-3)]">
                demo-{tab.id}.yaml
              </span>
              <button
                onClick={() => copy(tab.code)}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text-3)] transition-colors hover:text-[var(--text-1)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
                aria-label={copied === tab.code ? "Copied" : "Copy"}
              >
                {copied === tab.code ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    copy
                  </>
                )}
              </button>
            </div>

            <div className="overflow-x-auto p-4">
              <pre className="text-[13px] leading-[1.65] text-[var(--syntax-plain)]">
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
  );
}

function highlightYaml(line: string): React.ReactNode {
  if (line.trimStart().startsWith("#")) {
    return <span style={{ color: "var(--syntax-comment)" }}>{line}</span>;
  }

  const match = line.match(/^(\s*-?\s*)([^:\s][^:]*?)(\s*:\s*)(.*)$/);
  if (!match) {
    return <span style={{ color: "var(--syntax-plain)" }}>{line}</span>;
  }

  const [, prefix, rawKey, separator, rawValue] = match;
  const key = rawKey.trimEnd();
  const value = rawValue;

  return (
    <>
      <span style={{ color: "var(--syntax-punct)" }}>{prefix}</span>
      <span style={{ color: "var(--syntax-key)" }}>{key}</span>
      <span style={{ color: "var(--syntax-punct)" }}>{separator}</span>
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
    return <span style={{ color: "var(--syntax-comment)" }}>{value}</span>;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return <span style={{ color: "var(--syntax-str)" }}>{value}</span>;
  }

  if (/^(true|false|null)\b/i.test(trimmed)) {
    return <span style={{ color: "var(--syntax-bool)" }}>{value}</span>;
  }

  if (/^-?\d+(\.\d+)?\b/.test(trimmed)) {
    return <span style={{ color: "var(--syntax-num)" }}>{value}</span>;
  }

  const parts = value.split(/(\{\{.*?\}\})/g);
  if (parts.length > 1) {
    return (
      <>
        {parts.map((p, i) => {
          if (p.startsWith("{{") && p.endsWith("}}")) {
            return (
              <span key={i} style={{ color: "var(--syntax-var)" }}>
                {p}
              </span>
            );
          }
          return (
            <span key={i} style={{ color: "var(--syntax-plain)" }}>
              {p}
            </span>
          );
        })}
      </>
    );
  }

  return <span style={{ color: "var(--syntax-plain)" }}>{value}</span>;
}
