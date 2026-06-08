"use client";

import { TrendingUp, BookOpen, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  avgScore: number;
  activeCourses: number;
  studyHours: number;
}

export default function MetricsCards({ avgScore, activeCourses, studyHours }: Props) {
  const metrics = [
    {
      label: "Average Score",
      value: `${avgScore.toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Courses",
      value: activeCourses,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Study Hours / wk",
      value: studyHours,
      icon: Clock,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((m) => (
        <Card key={m.label}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-lg p-2.5 ${m.bg}`}>
              <m.icon className={`size-5 ${m.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
