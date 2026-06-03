import { cookies } from "next/headers";
import { query } from "./db";
import type { User, SessionUser } from "@/types";

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  const rows = await query<User>(
    "SELECT * FROM Users WHERE email = ? AND password = ?",
    [email, password]
  );
  if (rows.length === 0) return null;

  const user = rows[0];
  const session: SessionUser = {
    user_id: user.user_id,
    name: user.name,
    role: user.role,
  };

  (await cookies()).set("session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return user;
}

export async function logout(): Promise<void> {
  (await cookies()).delete("session");
}

export async function getSession(): Promise<SessionUser | null> {
  const raw = (await cookies()).get("session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}
