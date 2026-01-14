"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { MovingBorder } from "@/components/ui/moving-border";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 hover:shadow-[var(--shadow-glow)]",
        destructive:
          "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90",
        outline:
          "border border-[var(--border)] bg-transparent hover:bg-[var(--surface)] hover:shadow-[var(--shadow-glow)]",
        secondary:
          "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80",
        ghost:
          "hover:bg-[var(--surface)] hover:text-[var(--accent)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
        glow: "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)]",
        movingBorder:
          "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)]",
        borderMagic: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "borderMagic") {
      const outerSizeClassName =
        size === "sm"
          ? "h-9"
          : size === "lg"
            ? "h-11"
            : size === "icon"
              ? "h-10 w-10"
              : "h-10";

      const innerPaddingClassName =
        size === "sm"
          ? "px-3"
          : size === "lg"
            ? "px-8"
            : size === "icon"
              ? "px-0"
              : "px-4";

      return (
        <Comp
          className={cn(
            "relative inline-flex overflow-hidden rounded-full p-[1px]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
            "disabled:pointer-events-none disabled:opacity-50",
            outerSizeClassName,
            className
          )}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span
            className={cn(
              "inline-flex h-full w-full items-center justify-center gap-2 rounded-full",
              "bg-[rgb(var(--brand-primary-rgb))] text-white",
              "text-sm font-medium",
              "backdrop-blur-3xl",
              innerPaddingClassName
            )}
          >
            {children}
          </span>
        </Comp>
      );
    }

    if (variant === "movingBorder") {
      return (
        <MovingBorder
          as="span"
          rx="12px"
          ry="12px"
          containerClassName="inline-flex"
          className="bg-transparent"
        >
          <Comp
            className={cn(
              buttonVariants({ variant, size }),
              "rounded-[11px]",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </Comp>
        </MovingBorder>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
