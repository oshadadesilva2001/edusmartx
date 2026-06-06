import { getSession } from "@/lib/auth";
import { getAllCoursesWithInstructors } from "@/lib/queries";
import PageHeader from "@/components/student/PageHeader";
import CourseCard from "@/components/student/CourseCard";
import SearchCourses from "./SearchCourses";

export default async function CoursesPage() {
  const session = await getSession();
  const courses = await getAllCoursesWithInstructors();

  const categories = ["All", "Data Science", "Mathematics", "Science", "Humanities", "Business"];

  const coursesWithExtras = courses.map((c, i) => ({
    ...c,
    category: categories[1 + (i % (categories.length - 1))],
    lessonCount: [8, 12, 6, 10, 14, 7, 9, 11][i % 8],
  }));

  return (
    <div>
      <PageHeader
        title="Course Catalog"
        description="Explore and enroll in courses."
      />

      <div className="space-y-6 px-4 md:px-6">
        <SearchCourses categories={categories} />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {coursesWithExtras.map((course) => (
            <CourseCard
              key={course.course_id}
              id={course.course_id}
              name={course.course_name}
              instructor={course.instructor_name}
              category={course.category}
              lessonCount={course.lessonCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
