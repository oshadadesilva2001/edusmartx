"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudentPerformance } from "@/types";

const levelVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Excellent: "default",
  Good: "secondary",
  Average: "outline",
  "Needs Improvement": "destructive",
};

interface Props {
  performances: StudentPerformance[];
}

export default function PerformanceTable({ performances }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Avg Marks</TableHead>
              <TableHead>Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No performance data available.
                </TableCell>
              </TableRow>
            ) : (
              performances.map((p) => (
                <TableRow key={p.user_id}>
                  <TableCell>{p.user_id}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>
                    {p.avg_marks != null ? `${Number(p.avg_marks).toFixed(1)}%` : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={levelVariant[p.performance_level] ?? "outline"}>
                      {p.performance_level}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
