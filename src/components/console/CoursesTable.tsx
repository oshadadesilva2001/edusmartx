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
import type { CourseWithInstructor } from "@/types";

interface Props {
  courses: CourseWithInstructor[];
}

export default function CoursesTable({ courses }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Courses & Instructors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Instructor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((c) => (
                <TableRow key={c.course_id}>
                  <TableCell>{c.course_id}</TableCell>
                  <TableCell className="font-medium">{c.course_name}</TableCell>
                  <TableCell>{c.instructor_name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
