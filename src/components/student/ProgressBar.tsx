import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  size = "md",
  showLabel = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex-1 overflow-hidden rounded-[var(--radius)] bg-[#e2e8f0]",
          size === "sm" ? "h-1.5" : "h-2"
        )}
      >
        <div
          className="h-full rounded-[var(--radius)] bg-[#006a61] transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
