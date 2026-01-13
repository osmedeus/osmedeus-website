"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--background)] transition-colors",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-40 blur-[100px] [--aurora:repeating-linear-gradient(100deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.1)_10%,transparent_20%,transparent_30%,rgba(255,255,255,0.05)_40%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--color-background)_0%,var(--color-background)_7%,transparent_10%,transparent_12%,var(--color-background)_16%)] [background-image:var(--dark-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,200%] motion-safe:animate-aurora`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        />
      </div>
      {children}
    </div>
  );
}

export function GradientBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(1200px 600px at 20% 0%, rgba(255,255,255,0.08), transparent 60%),
              radial-gradient(1000px 500px at 80% 20%, rgba(255,255,255,0.05), transparent 55%)
            `,
          }}
        />
      </div>
      {children}
    </div>
  );
}

export function GridBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {children}
    </div>
  );
}
