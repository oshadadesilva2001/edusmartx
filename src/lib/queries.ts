import { query } from "./db";
import type {
  StudentPerformance,
  CourseWithInstructor,
  RecommendationWithStudent,
  PerformanceDataPoint,
  EnrolledCourse,
  CourseCategory,
} from "@/types";

export async function getStudentAverageScore(
  studentId: number
): Promise<number> {
  const rows = await query<{ avg: number | bigint }>(
    "SELECT AVG(marks) as avg FROM Attempts WHERE student_id = ?",
    [studentId]
  );
  return Number(rows[0]?.avg ?? 0);
}

export async function getStudentActiveCourses(
  studentId: number
): Promise<number> {
  const rows = await query<{ count: number | bigint }>(
    "SELECT COUNT(*) as count FROM Enrollment WHERE student_id = ?",
    [studentId]
  );
  return Number(rows[0]?.count ?? 0);
}

export async function getStudentStudyHours(
  _studentId: number
): Promise<number> {
  // Derived: assume 3h per active course per week
  const courses = await getStudentActiveCourses(_studentId);
  return courses * 3;
}

export async function getStudentPerformanceOverTime(
  studentId: number
): Promise<PerformanceDataPoint[]> {
  const rows = await query<{ label: string; score: number }>(
    `SELECT DATE(quizzes.q_id) as label, AVG(a.marks) as score
     FROM Attempts a
     JOIN Quizzes quizzes ON a.q_id = quizzes.q_id
     WHERE a.student_id = ?
     GROUP BY quizzes.q_id
     ORDER BY quizzes.q_id`,
    [studentId]
  );
  return rows;
}

export async function getStudentRecommendations(
  studentId: number
): Promise<RecommendationWithStudent[]> {
  return query<RecommendationWithStudent>(
    `SELECT r.rec_id, u.name as student_name, r.reason
     FROM Recommendations r
     JOIN Students s ON r.student_id = s.user_id
     JOIN Users u ON s.user_id = u.user_id
     WHERE r.student_id = ?`,
    [studentId]
  );
}

export async function getAllStudents(): Promise<
  { user_id: number; name: string; email: string }[]
> {
  return query(
    "SELECT u.user_id, u.name, u.email FROM Users u JOIN Students s ON u.user_id = s.user_id"
  );
}

export async function getStudentsWithPerformanceLevel(): Promise<
  StudentPerformance[]
> {
  return query<StudentPerformance>(
    `SELECT s.user_id, u.name, AVG(a.marks) as avg_marks,
       CASE
         WHEN AVG(a.marks) >= 80 THEN 'Excellent'
         WHEN AVG(a.marks) >= 60 THEN 'Good'
         WHEN AVG(a.marks) >= 40 THEN 'Average'
         ELSE 'Needs Improvement'
       END as performance_level
     FROM Students s
     JOIN Users u ON s.user_id = u.user_id
     LEFT JOIN Attempts a ON s.user_id = a.student_id
     GROUP BY s.user_id, u.name`
  );
}

export async function getAllCoursesWithInstructors(): Promise<
  CourseWithInstructor[]
> {
  return query<CourseWithInstructor>(
    `SELECT c.course_id, c.course_name, u.name as instructor_name
     FROM Courses c
     JOIN Instructors i ON c.instructor_id = i.user_id
     JOIN Users u ON i.user_id = u.user_id`
  );
}

export async function getAllRecommendations(): Promise<
  RecommendationWithStudent[]
> {
  return query<RecommendationWithStudent>(
    `SELECT r.rec_id, u.name as student_name, r.reason
     FROM Recommendations r
     JOIN Students s ON r.student_id = s.user_id
     JOIN Users u ON s.user_id = u.user_id`
  );
}

export async function getAllAttempts(): Promise<
  {
    attempt_id: number;
    student_name: string;
    q_id: number;
    marks: number;
  }[]
> {
  return query(
    `SELECT a.attempt_id, u.name as student_name, a.q_id, a.marks
     FROM Attempts a
     JOIN Students s ON a.student_id = s.user_id
     JOIN Users u ON s.user_id = u.user_id`
  );
}

export async function getStudentEnrolledCourses(
  studentId: number
): Promise<EnrolledCourse[]> {
  return query<EnrolledCourse>(
    `SELECT c.course_id, c.course_name, u.name as instructor_name
     FROM Enrollment e
     JOIN Courses c ON e.course_id = c.course_id
     JOIN Instructors i ON c.instructor_id = i.user_id
     JOIN Users u ON i.user_id = u.user_id
     WHERE e.student_id = ?`,
    [studentId]
  );
}

export async function getStudentSubjectBreakdown(
  studentId: number
): Promise<{ subject: string; score: number }[]> {
  return query<{ subject: string; score: number }>(
    `SELECT c.course_name as subject, AVG(a.marks) as score
     FROM Attempts a
     JOIN Quizzes q ON a.q_id = q.q_id
     JOIN Courses c ON q.course_id = c.course_id
     WHERE a.student_id = ?
     GROUP BY c.course_id, c.course_name
     ORDER BY score DESC`,
    [studentId]
  );
}

export async function getCourseCategories(): Promise<CourseCategory[]> {
  return query<CourseCategory>("SELECT id, name FROM course_categories ORDER BY name");
}

export async function getQuizQuestions(
  quizId: number
): Promise<
  {
    question_id: number;
    quiz_id: number;
    question_text: string;
    question_order: number;
  }[]
> {
  return query(
    `SELECT question_id, quiz_id, question_text, question_order
     FROM quiz_questions
     WHERE quiz_id = ?
     ORDER BY question_order`,
    [quizId]
  );
}

export async function getQuestionOptions(
  questionId: number
): Promise<
  {
    option_id: number;
    question_id: number;
    option_text: string;
    is_correct: boolean;
    option_order: number;
  }[]
> {
  return query(
    `SELECT option_id, question_id, option_text, is_correct, option_order
     FROM quiz_options
     WHERE question_id = ?
     ORDER BY option_order`,
    [questionId]
  );
}
