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
import { cn } from "@/lib/utils";

interface TrendData {
  label: string;
  value: number;
}

interface TrendChartProps {
  data: TrendData[];
  height?: number;
  className?: string;
}

export default function TrendChart({
  data,
  height = 200,
  className,
}: TrendChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#006a61" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#006a61" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#76777d", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#76777d", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "2px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#006a61"
            strokeWidth={2}
            fill="url(#tealGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
