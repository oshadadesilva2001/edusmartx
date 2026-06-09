import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getStudentRecommendations } from "@/lib/queries";
import {
  Lightbulb,
  TrendingUp,
  BookOpen,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/student/PageHeader";
import BentoGrid from "@/components/student/BentoGrid";
import SuggestionCard from "@/components/student/SuggestionCard";
import InsightCard from "@/components/student/InsightCard";
import TimelineCard from "@/components/student/TimelineCard";
import { Button } from "@/components/ui/button";

export default async function RecommendationsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const recommendations = await getStudentRecommendations(session.user_id);

  const timelineCourses = [
    { name: "Database Systems", progress: 65, nextMilestone: "Next: Final Exam" },
    { name: "Discrete Math", progress: 42, nextMilestone: "Next: Midterm" },
    { name: "Python for Humanities", progress: 88, nextMilestone: "Next: Project Due" },
  ];

  return (
    <div>
      <PageHeader
        title="Smart Recommendations"
        description="Personalized suggestions to accelerate your learning."
      />

      <div className="space-y-6 px-4 md:px-6">
        <BentoGrid>
          {/* Primary Suggestion */}
          <SuggestionCard
            title="Focus on Database Normalization"
            description="Your quiz scores indicate you'd benefit from reviewing Third Normal Form (3NF) and BCNF concepts. Spend 30 minutes on this topic to improve your next assessment by an estimated 15%."
            icon={Lightbulb}
            action="Start Review"
            className="md:col-span-2"
          />

          {/* Performance Insight */}
          <InsightCard
            title="Performance Trend"
            metric="85%"
            description="Your average score has improved 12% over the last month. Keep it up!"
            trend="up"
          />

          {/* Smaller grid items */}
          <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-border bg-white p-4">
            <BookOpen className="size-5 text-violet-500" />
            <h4 className="text-sm font-semibold text-foreground">
              Study Group Match
            </h4>
            <p className="text-xs text-muted-foreground">
              3 peers in your course are studying the same topics. Join a study session.
            </p>
            <Button variant="link" size="sm" className="h-auto p-0 text-[#006a61]">
              Join Group <ArrowRight className="ml-1 size-3" />
            </Button>
          </div>

          <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-border bg-white p-4">
            <Clock className="size-5 text-amber-500" />
            <h4 className="text-sm font-semibold text-foreground">
              Study Schedule
            </h4>
            <p className="text-xs text-muted-foreground">
              Your optimal study time is 7-9 PM based on your activity patterns.
            </p>
            <Button variant="link" size="sm" className="h-auto p-0 text-[#006a61]">
              View Schedule <ArrowRight className="ml-1 size-3" />
            </Button>
          </div>
        </BentoGrid>

        {/* Course Timeline */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Suggested Course Timeline
          </h3>
          <TimelineCard courses={timelineCourses} />
        </div>

        {/* Recommendations from DB */}
        {recommendations.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Your Recommendations
            </h3>
            <div className="space-y-2">
              {recommendations.map((rec) => (
                <div
                  key={rec.rec_id}
                  className="flex items-start gap-3 rounded-[var(--radius)] border border-border bg-white p-3"
                >
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#006a61]" />
                  <p className="text-sm text-foreground">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
