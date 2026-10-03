"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Three buttons and no glow. A control is marked by its edge and its fill —
 * `primary` is the one accent surface on the page, `outline` is a hairline
 * that hatches on hover, `ghost` is text that firms up.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] text-sm font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-fill)] text-[var(--accent-ink)] hover:bg-[color-mix(in_oklab,var(--accent-fill)_88%,var(--text-1))]",
        outline:
          "stripe-hover border bg-transparent text-[var(--text-1)] hover:border-[var(--line-2)]",
        ghost: "text-[var(--text-2)] hover:text-[var(--text-1)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-11 px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Style the single child (a link, usually) as the button instead. */
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
