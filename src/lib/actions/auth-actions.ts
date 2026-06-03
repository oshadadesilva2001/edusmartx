"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, execute } from "@/lib/db";
import { login, logout } from "@/lib/auth";

export async function signIn(
  _prev: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const user = await login(email, password);
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  revalidatePath("/", "layout");
  redirect(user.role === "admin" || user.role === "instructor" ? "/console" : "/dashboard");
}

export async function signUp(
  _prev: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  if (!name || !email || !password || !role) {
    return { success: false, error: "All fields are required." };
  }

  if (role !== "student" && role !== "instructor") {
    return { success: false, error: "Role must be student or instructor." };
  }

  // Check for existing user
  const existing = await query<{ user_id: number }>(
    "SELECT user_id FROM Users WHERE email = ?",
    [email]
  );
  if (existing.length > 0) {
    return { success: false, error: "A user with this email already exists." };
  }

  const result = await execute(
    "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
  const userId = Number(result.insertId);

  if (role === "student") {
    const today = new Date().toISOString().split("T")[0];
    await execute("INSERT INTO Students (user_id, reg_date) VALUES (?, ?)", [
      userId,
      today,
    ]);
  } else {
    await execute(
      "INSERT INTO Instructors (user_id, specialization) VALUES (?, ?)",
      [userId, "General"]
    );
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function signOut(): Promise<void> {
  await logout();
  revalidatePath("/", "layout");
  redirect("/login");
}
