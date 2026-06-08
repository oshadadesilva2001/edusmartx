import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import {
  getStudentAverageScore,
  getStudentActiveCourses,
  getStudentStudyHours,
  getStudentPerformanceOverTime,
  getStudentRecommendations,
  getAllCoursesWithInstructors,
} from "@/lib/queries";
import { TrendingUp, BookOpen, Clock } from "lucide-react";
import PageHeader from "@/components/student/PageHeader";
import StatCard from "@/components/student/StatCard";
import CourseCard from "@/components/student/CourseCard";
import ProgressBar from "@/components/student/ProgressBar";
import ActivityFeed from "@/components/student/ActivityFeed";
import type { ActivityItem } from "@/components/student/ActivityFeed";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "admin" || session.role === "instructor") {
    redirect("/console");
  }

  const [avgScore, activeCourses, studyHours, performance, recommendations, courses] =
    await Promise.all([
      getStudentAverageScore(session.user_id),
      getStudentActiveCourses(session.user_id),
      getStudentStudyHours(session.user_id),
      getStudentPerformanceOverTime(session.user_id),
      getStudentRecommendations(session.user_id),
      getAllCoursesWithInstructors(),
    ]);

  // Build enrolled courses from existing data
  const enrolledCourses = courses.slice(0, 3).map((c, i) => ({
    id: c.course_id,
    name: c.course_name,
    instructor: c.instructor_name,
    progress: [65, 42, 88][i] ?? 0,
    lessonCount: [8, 12, 6][i] ?? 0,
  }));

  // Mock activity data since DB lacks activity log table
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: "quiz",
      title: "Completed Database Quiz",
      description: "Scored 85% on Advanced SQL quiz",
      timestamp: "2h ago",
    },
    {
      id: 2,
      type: "enrollment",
      title: "Enrolled in New Course",
      description: "Joined Python for Humanities",
      timestamp: "1d ago",
    },
    {
      id: 3,
      type: "achievement",
      title: "Perfect Score!",
      description: "Got 100% on Discrete Mathematics quiz",
      timestamp: "3d ago",
    },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${session.name}`}
        description="Here's your learning overview."
      />

      <div className="space-y-6 px-4 md:px-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Average Score"
            value={`${avgScore}%`}
            icon={TrendingUp}
            trend="up"
            trendValue="+5%"
          />
          <StatCard
            label="Active Courses"
            value={activeCourses}
            icon={BookOpen}
          />
          <StatCard
            label="Study Hours / wk"
            value={studyHours}
            icon={Clock}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <div className="rounded-[var(--radius)] border border-border bg-white">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Enrolled Courses
                </h2>
                <a
                  href="/courses"
                  className="text-xs font-medium text-[#006a61] hover:underline"
                >
                  View All
                </a>
              </div>
              <div className="divide-y divide-border">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 px-4 py-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff]">
                      <BookOpen className="size-5 text-[#006a61]" />
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">
                            {course.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {course.instructor}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {course.lessonCount} lessons
                        </span>
                      </div>
                      <ProgressBar value={course.progress} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="rounded-[var(--radius)] border border-border bg-white">
              <div className="border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Recent Activity
                </h2>
              </div>
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
