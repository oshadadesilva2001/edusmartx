export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role: "student" | "instructor" | "admin";
}

export interface Student {
  user_id: number;
  reg_date: string;
}

export interface Instructor {
  user_id: number;
  specialization: string;
}

export interface Course {
  course_id: number;
  course_name: string;
  instructor_id: number;
}

export interface Lesson {
  les_id: number;
  les_name: string;
  course_id: number;
}

export interface Quiz {
  q_id: number;
  course_id: number;
}

export interface Enrollment {
  student_id: number;
  course_id: number;
  enr_date: string;
}

export interface Attempt {
  attempt_id: number;
  student_id: number;
  q_id: number;
  marks: number;
}

export interface Recommendation {
  rec_id: number;
  student_id: number;
  reason: string;
}

export interface SessionUser {
  user_id: number;
  name: string;
  role: "student" | "instructor" | "admin";
}

export interface StudentPerformance {
  user_id: number;
  name: string;
  avg_marks: number | null;
  performance_level: string;
}

export interface CourseWithInstructor {
  course_id: number;
  course_name: string;
  instructor_name: string;
}

export interface RecommendationWithStudent {
  rec_id: number;
  student_name: string;
  reason: string;
}

export interface PerformanceDataPoint {
  label: string;
  score: number;
}

export interface CourseWithProgress {
  course_id: number;
  course_name: string;
  instructor_name: string;
  progress: number;
  lesson_count: number;
  category?: string;
}

export interface EnrolledCourse {
  course_id: number;
  course_name: string;
  instructor_name: string;
}

export interface ActivityItem {
  id: number;
  type: "quiz" | "enrollment" | "achievement" | "progress";
  title: string;
  description: string;
  timestamp: string;
}

export interface SubjectBreakdown {
  subject: string;
  score: number;
}

export interface QuizQuestion {
  question_id: number;
  quiz_id: number;
  question_text: string;
  question_order: number;
  options: QuizOption[];
}

export interface QuizOption {
  option_id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  option_order: number;
}

export interface CourseCategory {
  id: number;
  name: string;
}
