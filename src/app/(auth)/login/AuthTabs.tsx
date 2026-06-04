"use client";

import { useState } from "react";
import { GraduationCap, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signIn, signUp } from "@/lib/actions/auth-actions";

const loginInitialState = { success: false, error: undefined as string | undefined };
const signupInitialState = { success: false, error: undefined as string | undefined };

function LoginForm() {
  const [state, formAction, isPending] = useActionState(signIn, loginInitialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="login-email" className="text-xs font-semibold tracking-[0.6px] text-[#45464d] uppercase">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="login-email"
            name="email"
            type="email"
            placeholder="educator@institution.edu"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password" className="text-xs font-semibold tracking-[0.6px] text-[#45464d] uppercase">
            Password
          </Label>
          <span className="text-xs font-semibold text-[#006a61] cursor-pointer">
            Forgot Password?
          </span>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="login-password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            required
          />
        </div>
      </div>

      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" className="w-full gap-2" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Sign In
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, signupInitialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="signup-name" className="text-xs font-semibold tracking-[0.6px] text-[#45464d] uppercase">
          Full Name
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signup-name"
            name="name"
            placeholder="Jane Doe"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="signup-email" className="text-xs font-semibold tracking-[0.6px] text-[#45464d] uppercase">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signup-email"
            name="email"
            type="email"
            placeholder="you@institution.edu"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="signup-password" className="text-xs font-semibold tracking-[0.6px] text-[#45464d] uppercase">
          Password
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="signup-password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="signup-role" className="text-xs font-semibold tracking-[0.6px] text-[#45464d] uppercase">
          Role
        </Label>
        <Select name="role" defaultValue="student">
          <SelectTrigger id="signup-role" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="instructor">Instructor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" className="w-full gap-2" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Create Account
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

export function AuthTabs() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px] overflow-hidden rounded-[var(--radius)] border border-[#e2e8f0] bg-white">
        {/* Logo Section */}
        <div className="flex flex-col items-center pb-8 pt-12">
          <div className="flex items-center gap-2 pb-4">
            <GraduationCap className="size-10 text-[#006a61]" />
            <span className="text-[36px] font-bold leading-[44px] tracking-[-1.8px] text-[#0b1c30]">
              EduSmartX
            </span>
          </div>
          <p className="text-sm leading-5 text-[#76777d]">
            Empowering Education through Analytics
          </p>
        </div>

        {/* Tab System */}
        <div className="flex border-b border-[#e2e8f0]">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 pb-[18px] pt-4 text-center text-xs font-semibold tracking-[0.6px] transition-colors ${
              mode === "login"
                ? "border-b-2 border-[#006a61] bg-[#eff4ff] text-[#006a61]"
                : "text-[#76777d]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 pb-[17.5px] pt-4 text-center text-xs font-semibold tracking-[0.6px] transition-colors ${
              mode === "signup"
                ? "border-b-2 border-[#006a61] bg-[#eff4ff] text-[#006a61]"
                : "text-[#76777d]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {mode === "login" ? <LoginForm /> : <SignUpForm />}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e2e8f0]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[11px] font-bold tracking-[1.1px] text-[#76777d] uppercase">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-[var(--radius)] border border-[#cbd5e1] px-4 py-2.5 text-sm text-[#0b1c30] transition-colors hover:bg-muted">
              <svg className="size-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-[var(--radius)] border border-[#cbd5e1] px-4 py-2.5 text-sm text-[#0b1c30] transition-colors hover:bg-muted">
              <svg className="size-5" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="2" fill="#F25022"/>
                <path d="M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z" fill="#fff"/>
              </svg>
              Microsoft
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e2e8f0] bg-[#f8fafc] px-6 py-6 text-center">
          <p className="text-sm text-[#76777d]">
            {mode === "login" ? (
              <>
                New to EduSmartX?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-semibold text-[#006a61]"
                >
                  Request an Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-semibold text-[#006a61]"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
