"use client";

import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 4000,
  rx = "16px",
  ry = "16px",
  className,
  containerClassName,
  borderClassName,
  as: Component = "div",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "relative h-fit w-fit overflow-hidden bg-transparent p-[1px]",
        containerClassName
      )}
      style={{
        borderRadius: rx,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${rx} * 0.96)` }}
      >
        <MovingBorderSvg duration={duration} rx={rx} ry={ry}>
          <rect
            width="100%"
            height="100%"
            fill="none"
            rx={rx}
            ry={ry}
            strokeWidth="2"
            className={cn("stroke-[var(--accent)]", borderClassName)}
          />
        </MovingBorderSvg>
      </div>

      <div
        className={cn(
          "relative z-10 border border-transparent bg-[var(--surface)]",
          className
        )}
        style={{
          borderRadius: `calc(${rx} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

function MovingBorderSvg({
  children,
  duration = 4000,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute h-full w-full"
      width="100%"
      height="100%"
    >
      <rect
        fill="none"
        width="100%"
        height="100%"
        rx={rx}
        ry={ry}
        ref={pathRef}
      />
      <motion.rect
        width="100%"
        height="100%"
        fill="none"
        rx={rx}
        ry={ry}
        strokeWidth="2"
        stroke="url(#gradient)"
        strokeLinecap="round"
        style={{
          pathLength: 0.05,
          pathOffset: useTransform(progress, (val) => {
            const length = pathRef.current?.getTotalLength();
            return length ? val / length : 0;
          }),
        }}
      />
      <motion.circle
        cx="0"
        cy="0"
        r="12"
        fill="url(#gradient)"
        style={{
          transform,
          opacity: 0.8,
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.8)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.5)" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  );
}

export function GlowingBorder({
  children,
  className,
  containerClassName,
  glowColor = "rgba(255, 255, 255, 0.1)",
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowColor?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl p-[1px]",
        containerClassName
      )}
      style={{
        background: `linear-gradient(135deg, ${glowColor}, transparent 50%, ${glowColor})`,
      }}
    >
      <div
        className={cn(
          "rounded-xl bg-[var(--surface)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
