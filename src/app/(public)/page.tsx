import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap, BarChart3, Users, ArrowRight, Lightbulb } from "lucide-react";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect(
      session.role === "admin" || session.role === "instructor"
        ? "/console"
        : "/dashboard"
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="mb-6 flex items-center gap-2 rounded-[var(--radius)] border border-[#e2e8f0] bg-white px-4 py-1.5 text-sm text-muted-foreground">
          <GraduationCap className="size-4 text-[#006a61]" />
          Smart Learning Analytics Platform
        </div>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Unlock Your{" "}
          <span className="text-[#006a61]">Learning Potential</span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Track performance, receive personalized recommendations, and collaborate
          with peers — all in one intelligent platform.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/login"
            className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius)] bg-[#006a61] px-5 text-sm font-medium text-white transition-colors hover:bg-[#006a61]/80"
          >
            Get Started <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-9 items-center rounded-[var(--radius)] border border-border bg-white px-5 text-sm font-medium transition-colors hover:bg-muted"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 pb-24 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2 rounded-[var(--radius)] border border-[#e2e8f0] bg-white p-6 text-center">
          <BarChart3 className="size-8 text-[#006a61]" />
          <h3 className="font-semibold text-foreground">Performance Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Visualize your quiz scores and track improvement over time with rich charts.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-[var(--radius)] border border-[#e2e8f0] bg-white p-6 text-center">
          <Lightbulb className="size-8 text-[#006a61]" />
          <h3 className="font-semibold text-foreground">Smart Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            Get hyper-personalized study tips based on your performance patterns.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-[var(--radius)] border border-[#e2e8f0] bg-white p-6 text-center">
          <Users className="size-8 text-[#006a61]" />
          <h3 className="font-semibold text-foreground">Peer Study Groups</h3>
          <p className="text-sm text-muted-foreground">
            Connect with peers who share your learning goals and interests.
          </p>
        </div>
      </section>
    </div>
  );
}
