"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  BarChart3,
  Lightbulb,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/recommendations", label: "Smart", icon: Lightbulb },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-white md:hidden">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors",
              isActive
                ? "text-[#006a61]"
                : "text-[#76777d] hover:text-foreground"
            )}
          >
            <Icon className="size-5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
