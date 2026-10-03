"use client";

import { useEffect, useState } from "react";

/**
 * Copies text to the clipboard and remembers what was copied for two seconds,
 * long enough to show a check mark. The timer is cleared on unmount.
 */
export function useCopied() {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (copied === null) return;
    const id = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(text);
  }

  return { copied, copy };
}
