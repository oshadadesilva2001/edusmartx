import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import TopAppBar from "@/components/shared/TopAppBar";

export default async function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role === "student") {
    redirect("/dashboard");
  }

  return (
    <>
      <TopAppBar user={session} />
      <main className="flex-1">{children}</main>
    </>
  );
}
