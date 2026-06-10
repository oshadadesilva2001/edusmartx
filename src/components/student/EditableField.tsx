"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  label: string;
  value: string;
  type?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}

export default function EditableField({
  label,
  value,
  type = "text",
  onChange,
  readOnly = false,
  className,
}: EditableFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        className={cn(readOnly && "bg-muted")}
      />
    </div>
  );
}
