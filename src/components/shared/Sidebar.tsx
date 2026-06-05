"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  BarChart3,
  Lightbulb,
  User,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/types";

const navItems = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/recommendations", label: "Recommendations", icon: Lightbulb },
  { href: "/profile", label: "Profile", icon: User },
];

interface SidebarProps {
  user: SessionUser | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 flex-col border-r border-border bg-white md:flex">
      {/* User info */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-4">
        <div className="flex size-9 items-center justify-center rounded-full bg-[#006a61] text-sm font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-medium text-foreground">
            {user?.name || "User"}
          </span>
          <span className="truncate text-xs capitalize text-muted-foreground">
            {user?.role || "student"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 p-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#eff4ff] text-[#006a61]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Brand footer */}
      <div className="mt-auto flex items-center gap-2 border-t border-border px-4 py-3">
        <GraduationCap className="size-4 text-[#006a61]" />
        <span className="text-xs text-muted-foreground">EduSmartX</span>
      </div>
    </aside>
  );
}
