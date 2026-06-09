"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecommendationWithStudent } from "@/types";

interface Props {
  recommendations: RecommendationWithStudent[];
}

export default function RecommendationsTable({ recommendations }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No recommendations found.
                </TableCell>
              </TableRow>
            ) : (
              recommendations.map((r) => (
                <TableRow key={r.rec_id}>
                  <TableCell>{r.rec_id}</TableCell>
                  <TableCell className="font-medium">{r.student_name}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
