"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuizOptionCardProps {
  id: number;
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isRevealed?: boolean;
  onClick: (id: number) => void;
  className?: string;
}

export default function QuizOptionCard({
  id,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
  className,
}: QuizOptionCardProps) {
  let stateClasses = "border-[#cbd5e1] hover:border-[#006a61]";

  if (isRevealed) {
    if (isCorrect) {
      stateClasses = "border-emerald-500 bg-emerald-50";
    } else if (isSelected) {
      stateClasses = "border-red-400 bg-red-50";
    } else {
      stateClasses = "border-[#e2e8f0] opacity-50";
    }
  } else if (isSelected) {
    stateClasses = "border-[#006a61] bg-[#eff4ff]";
  }

  return (
    <button
      onClick={() => onClick(id)}
      disabled={isRevealed}
      className={cn(
        "flex w-full items-center gap-3 rounded-[var(--radius)] border p-4 text-left transition-colors",
        stateClasses,
        className
      )}
    >
      <div
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-[var(--radius)] border text-xs font-bold",
          isSelected && !isRevealed
            ? "border-[#006a61] bg-[#006a61] text-white"
            : isRevealed && isCorrect
              ? "border-emerald-500 bg-emerald-500 text-white"
              : isRevealed && isSelected
                ? "border-red-400 bg-red-400 text-white"
                : "border-[#cbd5e1] text-muted-foreground"
        )}
      >
        {(isRevealed && isCorrect) || (isSelected && !isRevealed) ? (
          <Check className="size-3" />
        ) : (
          String.fromCharCode(64 + id)
        )}
      </div>
      <span className="text-sm font-medium text-foreground">{text}</span>
    </button>
  );
}
