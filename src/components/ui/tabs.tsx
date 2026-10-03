"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/*
 * A tab strip, not a segmented control: the list is a hairline rule and the
 * active tab is the one with an accent edge sitting on it.
 */
export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("flex items-stretch border-b text-[var(--text-3)]", className)}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "stripe-hover relative -mb-px inline-flex h-10 items-center justify-center whitespace-nowrap border-b border-transparent px-4 font-mono text-[12px] tracking-[0.04em] uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 hover:text-[var(--text-2)] data-[state=active]:border-[var(--accent-fg)] data-[state=active]:text-[var(--text-1)]",
        className
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]",
        className
      )}
      {...props}
    />
  );
}
