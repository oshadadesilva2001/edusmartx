import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getAllStudents,
  getStudentsWithPerformanceLevel,
  getAllCoursesWithInstructors,
  getAllRecommendations,
  getAllAttempts,
} from "@/lib/queries";
import { ConsoleTabs } from "./ConsoleTabs";

export default async function ConsolePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "student") redirect("/dashboard");

  const [students, performances, courses, recommendations, attempts] =
    await Promise.all([
      getAllStudents(),
      getStudentsWithPerformanceLevel(),
      getAllCoursesWithInstructors(),
      getAllRecommendations(),
      getAllAttempts(),
    ]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground">
          Manage students, courses, and recommendations.
        </p>
      </div>

      <ConsoleTabs
        students={students}
        performances={performances}
        courses={courses}
        recommendations={recommendations}
        attempts={attempts}
      />
    </div>
  );
}
