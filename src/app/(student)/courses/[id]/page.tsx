import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getAllCoursesWithInstructors } from "@/lib/queries";
import { BookOpen, Clock, User, Play, FileText, PenLine, Lock } from "lucide-react";
import PageHeader from "@/components/student/PageHeader";
import ProgressBar from "@/components/student/ProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CourseOverviewPage({ params }: Props) {
  const { id } = await params;
  const session = await getSession();
  const courses = await getAllCoursesWithInstructors();

  const course = courses.find((c) => c.course_id === Number(id));
  if (!course) notFound();

  // Mock data for lessons, quizzes, assignments
  const lessons = [
    { id: 1, title: "Introduction & Course Overview", completed: true, duration: "45 min" },
    { id: 2, title: "Core Concepts & Foundations", completed: true, duration: "60 min" },
    { id: 3, title: "Advanced Topics & Applications", completed: false, locked: false, duration: "75 min" },
    { id: 4, title: "Final Project Workshop", completed: false, locked: true, duration: "90 min" },
  ];

  const quizzes = [
    { id: 1, title: "Module 1 Assessment", score: 85, total: 100 },
    { id: 2, title: "Module 2 Assessment", score: null, total: 100 },
  ];

  const assignments = [
    { id: 1, title: "Research Paper", dueDate: "Jun 15, 2026", status: "pending" },
    { id: 2, title: "Group Project", dueDate: "Jul 1, 2026", status: "submitted" },
  ];

  const completedLessons = lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedLessons / lessons.length) * 100);

  return (
    <div>
      <PageHeader title={course.course_name} />

      <div className="px-4 md:px-6">
        {/* Hero Section */}
        <div className="mb-6 rounded-[var(--radius)] border border-border bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">In Progress</Badge>
                <span className="text-xs text-muted-foreground">8 weeks</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{course.course_name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="size-4" />
                  {course.instructor_name}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="size-4" />
                  {lessons.length} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-4" />
                  4.5 hours
                </span>
              </div>
              <div className="mt-4 max-w-sm">
                <ProgressBar value={progress} />
              </div>
            </div>
            <Button className="gap-2">
              <Play className="size-4" />
              Continue Learning
            </Button>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          {/* Main Content */}
          <div className="min-w-0">
            <Tabs defaultValue="lessons">
              <TabsList variant="line" className="mb-4">
                <TabsTrigger value="lessons">
                  <BookOpen className="mr-1.5 size-4" />
                  Lessons
                </TabsTrigger>
                <TabsTrigger value="quizzes">
                  <PenLine className="mr-1.5 size-4" />
                  Quizzes
                </TabsTrigger>
                <TabsTrigger value="assignments">
                  <FileText className="mr-1.5 size-4" />
                  Assignments
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-0">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0"
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] text-sm font-bold ${
                        lesson.completed
                          ? "bg-emerald-100 text-emerald-600"
                          : lesson.locked
                            ? "bg-muted text-muted-foreground"
                            : "bg-[#eff4ff] text-[#006a61]"
                      }`}
                    >
                      {lesson.locked ? (
                        <Lock className="size-4" />
                      ) : (
                        lesson.id
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span
                        className={`text-sm font-medium ${
                          lesson.locked ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {lesson.duration}
                      </span>
                    </div>
                    <Button
                      variant={lesson.completed ? "ghost" : "default"}
                      size="sm"
                      disabled={lesson.locked}
                    >
                      {lesson.completed ? "Review" : "Start"}
                    </Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="quizzes" className="space-y-0">
                {quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-sm font-bold text-[#006a61]">
                      <PenLine className="size-4" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {quiz.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {quiz.score !== null
                          ? `Score: ${quiz.score}/${quiz.total}`
                          : `${quiz.total} points`}
                      </span>
                    </div>
                    <a
                      href={`/quiz/${quiz.id}`}
                      className={
                        quiz.score !== null
                          ? "inline-flex h-7 items-center rounded-[var(--radius)] px-2.5 text-sm font-medium transition-colors hover:bg-muted"
                          : "inline-flex h-7 items-center rounded-[var(--radius)] bg-[#006a61] px-2.5 text-sm font-medium text-white transition-colors hover:bg-[#006a61]/80"
                      }
                    >
                      {quiz.score !== null ? "Retake" : "Start"}
                    </a>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="assignments" className="space-y-0">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 border-b border-border px-3 py-3 last:border-b-0"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-sm font-bold text-[#006a61]">
                      <FileText className="size-4" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {assignment.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Due: {assignment.dueDate}
                      </span>
                    </div>
                    <Badge
                      variant={
                        assignment.status === "submitted" ? "default" : "secondary"
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Instructor Card */}
            <div className="rounded-[var(--radius)] border border-border bg-white p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#006a61]">
                Instructor
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#006a61] text-sm font-bold text-white">
                  {course.instructor_name?.charAt(0) || "I"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {course.instructor_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Senior Instructor
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="rounded-[var(--radius)] border border-border bg-white p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#006a61]">
                Course Resources
              </h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <FileText className="size-4" />
                  Syllabus
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <BookOpen className="size-4" />
                  Reading Materials
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
