import { Clock, Award, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: number;
  type: "quiz" | "enrollment" | "achievement" | "progress";
  title: string;
  description: string;
  timestamp: string;
}

const iconMap = {
  quiz: Award,
  enrollment: BookOpen,
  achievement: TrendingUp,
  progress: Clock,
};

const colorMap = {
  quiz: "text-amber-500 bg-amber-50",
  enrollment: "text-blue-500 bg-blue-50",
  achievement: "text-emerald-500 bg-emerald-50",
  progress: "text-violet-500 bg-violet-50",
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

export default function ActivityFeed({
  activities,
  className,
}: ActivityFeedProps) {
  if (activities.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No recent activity
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {activities.map((activity) => {
        const Icon = iconMap[activity.type];
        const color = colorMap[activity.type];
        return (
          <div
            key={activity.id}
            className="flex gap-3 border-b border-border px-3 py-3 last:border-b-0"
          >
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)]",
                color
              )}
            >
              <Icon className="size-4" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
              <div className="flex items-start justify-between gap-2">
                <span className="truncate text-sm font-medium text-foreground">
                  {activity.title}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
              <span className="truncate text-xs text-muted-foreground">
                {activity.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
