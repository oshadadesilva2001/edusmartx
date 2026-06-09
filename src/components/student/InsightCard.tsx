import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  metric: string | number;
  description: string;
  trend?: "up" | "down";
  className?: string;
}

export default function InsightCard({
  title,
  metric,
  description,
  trend,
  className,
}: InsightCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-[var(--radius)] border border-border bg-white p-4",
        className
      )}
    >
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#006a61]">
        {title}
      </h4>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-foreground">{metric}</span>
        {trend && (
          <>
            {trend === "up" ? (
              <TrendingUp className="size-4 text-emerald-500" />
            ) : (
              <TrendingDown className="size-4 text-red-500" />
            )}
          </>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
