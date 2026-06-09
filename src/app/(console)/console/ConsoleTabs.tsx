"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsTable from "@/components/console/StudentsTable";
import PerformanceTable from "@/components/console/PerformanceTable";
import CoursesTable from "@/components/console/CoursesTable";
import AddRecommendationForm from "@/components/console/AddRecommendationForm";
import UpdateMarksForm from "@/components/console/UpdateMarksForm";
import RecommendationsTable from "@/components/console/RecommendationsTable";
import type {
  StudentPerformance,
  CourseWithInstructor,
  RecommendationWithStudent,
} from "@/types";

interface Props {
  students: { user_id: number; name: string; email: string }[];
  performances: StudentPerformance[];
  courses: CourseWithInstructor[];
  recommendations: RecommendationWithStudent[];
  attempts: {
    attempt_id: number;
    student_name: string;
    q_id: number;
    marks: number;
  }[];
}

export function ConsoleTabs({
  students,
  performances,
  courses,
  recommendations,
  attempts,
}: Props) {
  return (
    <Tabs defaultValue="students">
      <TabsList variant="line" className="mb-6 w-full justify-start overflow-x-auto">
        <TabsTrigger value="students">All Students</TabsTrigger>
        <TabsTrigger value="performance">Performance Levels</TabsTrigger>
        <TabsTrigger value="courses">Courses</TabsTrigger>
        <TabsTrigger value="add-rec">Add Recommendation</TabsTrigger>
        <TabsTrigger value="update-marks">Update Marks</TabsTrigger>
        <TabsTrigger value="view-rec">View Recommendations</TabsTrigger>
      </TabsList>

      <TabsContent value="students">
        <StudentsTable students={students} />
      </TabsContent>

      <TabsContent value="performance">
        <PerformanceTable performances={performances} />
      </TabsContent>

      <TabsContent value="courses">
        <CoursesTable courses={courses} />
      </TabsContent>

      <TabsContent value="add-rec">
        <AddRecommendationForm students={students} />
      </TabsContent>

      <TabsContent value="update-marks">
        <UpdateMarksForm attempts={attempts} />
      </TabsContent>

      <TabsContent value="view-rec">
        <RecommendationsTable recommendations={recommendations} />
      </TabsContent>
    </Tabs>
  );
}
