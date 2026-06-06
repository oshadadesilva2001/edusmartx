import Link from "next/link";
import { BookOpen, Users } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  id: number;
  name: string;
  instructor?: string;
  category?: string;
  progress?: number;
  lessonCount?: number;
  variant?: "grid" | "list";
  className?: string;
}

export default function CourseCard({
  id,
  name,
  instructor,
  category,
  progress,
  lessonCount,
  variant = "grid",
  className,
}: CourseCardProps) {
  const isGrid = variant === "grid";

  return (
    <Link
      href={`/courses/${id}`}
      className={cn(
        "flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-white transition-colors hover:border-[#006a61]/30",
        className
      )}
    >
      {/* Card top area with colored background */}
      <div className="flex aspect-[2/1] items-center justify-center bg-[#eff4ff]">
        <BookOpen className="size-8 text-[#006a61]/40" />
      </div>

      {/* Card content */}
      <div className="flex flex-col gap-1.5 p-3">
        {category && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#006a61]">
            {category}
          </span>
        )}
        <h3 className="text-sm font-semibold leading-snug text-foreground">
          {name}
        </h3>
        {instructor && (
          <p className="text-xs text-muted-foreground">{instructor}</p>
        )}
        <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
          {lessonCount !== undefined && (
            <span className="flex items-center gap-1">
              <BookOpen className="size-3" />
              {lessonCount} lessons
            </span>
          )}
        </div>
        {progress !== undefined && (
          <ProgressBar value={progress} size="sm" className="mt-1" />
        )}
      </div>
    </Link>
  );
}
