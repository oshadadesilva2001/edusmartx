import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SuggestionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: string;
  color?: string;
  className?: string;
}

export default function SuggestionCard({
  title,
  description,
  icon: Icon,
  action,
  color = "teal",
  className,
}: SuggestionCardProps) {
  const colorClasses: Record<string, string> = {
    teal: "border-l-[#006a61] bg-[#eff4ff]",
    violet: "border-l-violet-500 bg-violet-50",
    emerald: "border-l-emerald-500 bg-emerald-50",
    amber: "border-l-amber-500 bg-amber-50",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-white p-5 md:col-span-2",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[var(--radius)]",
            colorClasses[color] || "bg-[#eff4ff]"
          )}
        >
          <Icon className="size-5 text-[#006a61]" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {action && (
        <Button variant="default" size="sm" className="self-start">
          {action}
        </Button>
      )}
    </div>
  );
}
