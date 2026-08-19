"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  color?: string;
}

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  color = "currentColor",
  style,
  ...props
}: SeparatorProps) {
  return (
    <div
      data-orientation={orientation}
      role={decorative ? "none" : "separator"}
      aria-orientation={
        !decorative
          ? orientation === "vertical"
            ? "vertical"
            : "horizontal"
          : undefined
      }
      className={cn(
        "shrink-0",
        orientation === "horizontal" && "h-0.5 w-full",
        orientation === "vertical" && "h-full w-0.5",
        className,
      )}
      style={{
        backgroundImage:
          orientation === "horizontal"
            ? `linear-gradient(90deg, ${color} 75%, transparent 75%)`
            : `linear-gradient(0deg, ${color} 75%, transparent 75%)`,
        backgroundSize:
          orientation === "horizontal" ? "16px 8px" : "2px 16px",
        ...style,
      }}
      {...props}
    />
  );
}
