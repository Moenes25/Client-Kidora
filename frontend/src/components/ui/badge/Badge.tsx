// ui/badge/Badge.tsx
import React from "react";

type BadgeColor = "success" | "warning" | "error" | "info" | "dark";
type BadgeSize = "sm" | "md";

const colorMap: Record<BadgeColor, string> = {
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  error:   "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  dark:    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const sizeMap: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
};

export default function Badge({
  color = "dark",
  size = "sm",
  className = "",
  children,
}: React.PropsWithChildren<{ color?: BadgeColor; size?: BadgeSize; className?: string }>) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colorMap[color]} ${sizeMap[size]} ${className}`}>
      {children}
    </span>
  );
}
