"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CornerBox } from "@/components/ui/corner-box";
import { BookOpenIcon, GitHubOutlineIcon } from "@/components/ui/icons";
import { StarCount } from "@/components/ui/star-count";
import { DOCS_URL, INSTALL_BASE_URL, REPO_URL } from "@/lib/links";
import { useCopied } from "@/lib/use-copied";

const installUrl = `${INSTALL_BASE_URL}/install.sh`;
const installCommand = `curl -fsSL ${installUrl} | bash`;

/*
 * The page's one ask: install it, read the source, read the docs. Three
 * actions, no figure and no heading — the headline above has already made the
 * claim, and anything else here is something between a reader and the command
 * they came for.
 *
 * A block, not a section: the hero owns the spacing around it.
 */
export function InstallCta() {
  const { copied, copy } = useCopied();
  const handleCopy = () => void copy(installCommand);

  return (
    <div className="flex w-full flex-col items-center">
      {/*
        The command is centred in the box, so the copy affordance has to leave
        the flow — as a flex sibling it would push the line off-centre by its
        own width. Icon only, for the same reason: the box is sized to the
        command, and a "copy" label would start crowding it.
      */}
      <CornerBox
        className="cmd-glow relative w-full max-w-xl bg-[var(--inset)]"
        role="button"
        tabIndex={0}
        onClick={handleCopy}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCopy();
          }
        }}
        aria-label="Copy install command"
      >
        <div className="cursor-pointer px-8 py-3.5">
          {/*
            Centred only once it fits: a centred line that overflows is clipped
            at BOTH ends, so on a phone the `$ curl` start would be the half
            you lose. Coloured from the page's own syntax register rather than
            a terminal theme: the command is part of the page, not a
            screenshot of one.
          */}
          <code className="block overflow-x-auto text-left font-terminal text-[13px] leading-relaxed whitespace-nowrap sm:text-center sm:text-[15px]">
            <span style={{ color: "var(--syntax-punct)" }}>$&nbsp;</span>
            <span style={{ color: "var(--text-1)" }}>curl</span>{" "}
            <span style={{ color: "var(--syntax-punct)" }}>-fsSL</span>{" "}
            <span style={{ color: "var(--syntax-var)" }}>{installUrl}</span>{" "}
            <span style={{ color: "var(--syntax-punct)" }}>|</span>{" "}
            <span style={{ color: "var(--text-1)" }}>bash</span>
          </code>

          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]">
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </span>
        </div>
      </CornerBox>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="w-full justify-center sm:w-[200px]">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            <GitHubOutlineIcon className="mr-1" />
            GitHub
            <StarCount className="ml-1" />
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full justify-center sm:w-[200px]"
        >
          <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
            <BookOpenIcon className="mr-1" />
            Documentation
          </a>
        </Button>
      </div>
    </div>
  );
}
