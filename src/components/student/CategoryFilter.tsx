"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  active,
  onChange,
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 scrollbar-none",
        className
      )}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "shrink-0 rounded-[var(--radius)] px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
            active === cat
              ? "bg-[#006a61] text-white"
              : "bg-[#f1f5f9] text-muted-foreground hover:bg-[#e2e8f0]"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
