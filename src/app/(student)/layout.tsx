import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import TopAppBar from "@/components/shared/TopAppBar";
import BottomNavBar from "@/components/shared/BottomNavBar";
import Sidebar from "@/components/shared/Sidebar";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role === "admin" || session.role === "instructor") {
    redirect("/console");
  }

  return (
    <>
      <TopAppBar user={session} />
      <Sidebar user={session} />
      <main className="flex-1 pb-16 md:pl-64">{children}</main>
      <BottomNavBar />
    </>
  );
}
