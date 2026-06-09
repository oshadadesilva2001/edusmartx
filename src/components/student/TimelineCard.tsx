import { cn } from "@/lib/utils";
import ProgressBar from "./ProgressBar";

interface TimelineCourse {
  name: string;
  progress: number;
  nextMilestone: string;
}

interface TimelineCardProps {
  courses: TimelineCourse[];
  className?: string;
}

export default function TimelineCard({
  courses,
  className,
}: TimelineCardProps) {
  if (courses.length === 0) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">
        No course suggestions yet
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {courses.map((course, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-white p-3"
        >
          <div className="flex shrink-0 flex-col items-center">
            <div className="flex size-6 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-xs font-bold text-[#006a61]">
              {i + 1}
            </div>
            {i < courses.length - 1 && (
              <div className="mt-0.5 h-4 w-px bg-border" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="flex items-start justify-between gap-2">
              <h5 className="text-sm font-semibold text-foreground">
                {course.name}
              </h5>
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {course.nextMilestone}
              </span>
            </div>
            <ProgressBar value={course.progress} size="sm" showLabel />
          </div>
        </div>
      ))}
    </div>
  );
}
