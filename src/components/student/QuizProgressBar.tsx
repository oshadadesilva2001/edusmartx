import { cn } from "@/lib/utils";

interface QuizProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function QuizProgressBar({
  current,
  total,
  className,
}: QuizProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-xs font-medium text-muted-foreground">
        {current} of {total}
      </span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-[var(--radius)] bg-[#e2e8f0]">
        <div
          className="h-full rounded-[var(--radius)] bg-[#006a61] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
