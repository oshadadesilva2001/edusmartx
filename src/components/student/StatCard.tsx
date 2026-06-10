import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-[var(--radius)] border border-border bg-white p-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff]">
          <Icon className="size-4 text-[#006a61]" />
        </div>
        {trend && (
          <span
            className={cn(
              "ml-auto text-xs font-medium",
              trend === "up" && "text-emerald-600",
              trend === "down" && "text-red-500",
              trend === "neutral" && "text-muted-foreground"
            )}
          >
            {trendValue}
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
