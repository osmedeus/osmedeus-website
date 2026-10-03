import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A bordered box with 8px corner brackets, the page's one container idiom.
 *
 * The brackets are painted by four masks over a single pseudo-element (`.cx`
 * in globals.css), so a cell costs one node and takes its bracket colour from
 * `--cx-color`.
 */
export function CornerBox({
  className,
  hoverOnly = false,
  stripes = false,
  flush = false,
  bordered = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Brackets fade in on hover instead of sitting there permanently. */
  hoverOnly?: boolean;
  /** 2px diagonal hatch on hover. */
  stripes?: boolean;
  /** Brackets sit inside the box — for grid cells whose borders are shared. */
  flush?: boolean;
  bordered?: boolean;
}) {
  return (
    <div
      className={cn(
        "cx",
        flush && "cx-flush",
        hoverOnly && "cx-hover",
        stripes && "stripe-hover",
        bordered && "border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
