import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getStudentAverageScore,
  getStudentActiveCourses,
  getStudentPerformanceOverTime,
} from "@/lib/queries";
import { TrendingUp, Award, BookOpen, Target } from "lucide-react";
import PageHeader from "@/components/student/PageHeader";
import StatCard from "@/components/student/StatCard";
import TrendChart from "@/components/student/TrendChart";
import SubjectBarChart from "@/components/student/SubjectBarChart";

export default async function AnalyticsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const [avgScore, activeCourses, performance] = await Promise.all([
    getStudentAverageScore(session.user_id),
    getStudentActiveCourses(session.user_id),
    getStudentPerformanceOverTime(session.user_id),
  ]);

  const subjectData = [
    { subject: "Database Systems", score: 85 },
    { subject: "Discrete Math", score: 72 },
    { subject: "Python", score: 90 },
    { subject: "Cybersecurity", score: 78 },
    { subject: "World History", score: 88 },
  ];

  const trendData = performance.map((p) => ({
    label: p.label,
    value: p.score,
  }));

  return (
    <div>
      <PageHeader
        title="Performance Analytics"
        description="Track your learning progress and identify areas for improvement."
      />

      <div className="space-y-6 px-4 md:px-6">
        {/* Student Profile */}
        <div className="flex flex-wrap items-center gap-4 rounded-[var(--radius)] border border-border bg-white p-4 sm:flex-nowrap">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#006a61] text-2xl font-bold text-white">
            {session.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{session.name}</h2>
            <p className="text-sm text-muted-foreground">Student</p>
          </div>
          <div className="flex gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">{activeCourses}</div>
              <div className="text-xs text-muted-foreground">Courses</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">B+</div>
              <div className="text-xs text-muted-foreground">Grade</div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Average Score"
            value={`${avgScore}%`}
            icon={TrendingUp}
            trend="up"
            trendValue="+5%"
          />
          <StatCard
            label="Current Grade"
            value="B+"
            icon={Award}
          />
          <StatCard
            label="Active Courses"
            value={activeCourses}
            icon={BookOpen}
          />
          <StatCard
            label="Completion"
            value="68%"
            icon={Target}
            trend="up"
            trendValue="+8%"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Trend Chart */}
          <div className="rounded-[var(--radius)] border border-border bg-white p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Performance Trend
            </h3>
            <TrendChart data={trendData} height={220} />
          </div>

          {/* Subject Breakdown */}
          <div className="rounded-[var(--radius)] border border-border bg-white p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Subject Breakdown
            </h3>
            <SubjectBarChart data={subjectData} />
          </div>
        </div>
      </div>
    </div>
  );
}
