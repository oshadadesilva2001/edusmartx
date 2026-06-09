"use server";

import { revalidatePath } from "next/cache";
import { execute } from "@/lib/db";

export async function addRecommendation(
  _prev: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const studentId = Number(formData.get("student_id"));
  const reason = formData.get("reason") as string;

  if (!studentId || !reason) {
    return { success: false, error: "Student and reason are required." };
  }

  if (reason.length > 500) {
    return { success: false, error: "Reason must be 500 characters or fewer." };
  }

  await execute(
    "INSERT INTO Recommendations (student_id, reason) VALUES (?, ?)",
    [studentId, reason]
  );

  revalidatePath("/console");
  return { success: true };
}

export async function updateQuizMarks(
  _prev: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const attemptId = Number(formData.get("attempt_id"));
  const marks = Number(formData.get("marks"));

  if (!attemptId || isNaN(marks)) {
    return { success: false, error: "Attempt and marks are required." };
  }

  if (marks < 0) {
    return { success: false, error: "Marks cannot be negative." };
  }

  if (marks > 100) {
    return { success: false, error: "Marks cannot exceed 100." };
  }

  await execute("UPDATE Attempts SET marks = ? WHERE attempt_id = ?", [
    marks,
    attemptId,
  ]);

  revalidatePath("/console");
  return { success: true };
}
