"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signOut } from "@/lib/actions/auth-actions";
import type { SessionUser } from "@/types";

interface TopAppBarProps {
  user: SessionUser | null;
  rightAction?: React.ReactNode;
}

export default function TopAppBar({ user, rightAction }: TopAppBarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-4">
      {/* Left: Logo */}
      <Link
        href={user ? "/dashboard" : "/"}
        className="flex items-center gap-2 font-bold text-[#006a61] text-lg no-underline"
      >
        <GraduationCap className="size-6" />
        <span className="hidden sm:inline">EduSmartX</span>
      </Link>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {rightAction}
        {user ? (
          <>
            <Badge
              variant="secondary"
              className="hidden sm:inline-flex capitalize"
            >
              {user.role}
            </Badge>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              {user.name}
            </span>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="icon-sm" title="Sign out">
                <LogOut className="size-4" />
              </Button>
            </form>
          </>
        ) : (
          <Link
            href="/login"
            className="inline-flex h-7 items-center rounded-[var(--radius)] bg-[#006a61] px-2.5 text-sm font-medium text-white transition-colors hover:bg-[#006a61]/80"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
