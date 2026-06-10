"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PerformanceDataPoint } from "@/types";

interface Props {
  data: PerformanceDataPoint[];
}

export default function PerformanceChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
        <CardDescription>Quiz average scores over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.546 0.245 262.881)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.546 0.245 262.881)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="label" className="text-xs" />
              <YAxis domain={[0, 100]} className="text-xs" />
              <Tooltip
                contentStyle={{
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  background: "var(--popover)",
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="oklch(0.546 0.245 262.881)"
                fill="url(#scoreGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
