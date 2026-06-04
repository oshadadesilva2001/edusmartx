import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AuthTabs } from "./AuthTabs";

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect(
      session.role === "admin" || session.role === "instructor"
        ? "/console"
        : "/dashboard"
    );
  }

  return <AuthTabs />;
}
