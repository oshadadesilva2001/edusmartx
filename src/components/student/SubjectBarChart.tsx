"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { cn } from "@/lib/utils";

interface SubjectData {
  subject: string;
  score: number;
}

interface SubjectBarChartProps {
  data: SubjectData[];
  className?: string;
}

export default function SubjectBarChart({
  data,
  className,
}: SubjectBarChartProps) {
  return (
    <div className={cn("h-[200px] w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 40, bottom: 5, left: 10 }}
        >
          <CartesianGrid
            horizontal={false}
            stroke="#e2e8f0"
            strokeDasharray="3 3"
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#76777d", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="subject"
            tick={{ fill: "#0b1c30", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Bar
            dataKey="score"
            fill="#006a61"
            radius={[0, 2, 2, 0]}
            barSize={20}
          >
            <LabelList
              dataKey="score"
              position="right"
              fill="#76777d"
              fontSize={11}
              formatter={(v) => `${v}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
