"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/student/PageHeader";
import ProfileAvatar from "@/components/student/ProfileAvatar";
import EditableField from "@/components/student/EditableField";

// Note: We don't have a server action for profile updates yet, so we use local state.
// This can be wired up to a real action later.

export default function ProfilePage() {
  const [name, setName] = useState("Julian Vance");
  const [email, setEmail] = useState("julian.vance@university.edu");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div>
      <PageHeader
        title="Settings & Profile"
        description="Manage your account and preferences."
      />

      <div className="mx-auto max-w-2xl space-y-6 px-4 pb-8 md:px-6">
        {/* Profile Header */}
        <div className="rounded-[var(--radius)] border border-border bg-white">
          <ProfileAvatar
            name={name}
            email={email}
            badges={["Top Performer", "5 Courses"]}
          />
        </div>

        {/* Account Section */}
        <div className="rounded-[var(--radius)] border border-border bg-white p-4">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#006a61]">
            <span className="flex size-5 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-xs">
              A
            </span>
            Account
          </h3>
          <div className="space-y-4">
            <EditableField
              label="Full Name"
              value={name}
              onChange={setName}
            />
            <EditableField
              label="Email Address"
              value={email}
              type="email"
              onChange={setEmail}
            />
            <EditableField
              label="Password"
              value="••••••••"
              type="password"
              readOnly
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="rounded-[var(--radius)] border border-border bg-white p-4">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#006a61]">
            <span className="flex size-5 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-xs">
              P
            </span>
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Email Notifications
                </p>
                <p className="text-xs text-muted-foreground">
                  Receive updates about your courses
                </p>
              </div>
              <div className="h-5 w-9 rounded-[var(--radius)] bg-[#006a61] p-0.5">
                <div className="ml-auto size-4 rounded-[var(--radius)] bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  Switch to dark theme
                </p>
              </div>
              <div className="h-5 w-9 rounded-[var(--radius)] bg-[#e2e8f0] p-0.5">
                <div className="size-4 rounded-[var(--radius)] bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Settings */}
        <div className="rounded-[var(--radius)] border border-border bg-white p-4">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#006a61]">
            <span className="flex size-5 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-xs">
              A
            </span>
            Academic Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-[var(--radius)] border border-border p-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-sm font-bold text-[#006a61]">
                DB
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Database Systems
                </p>
                <p className="text-xs text-muted-foreground">Enrolled</p>
              </div>
              <span className="text-xs text-muted-foreground">65%</span>
            </div>
            <div className="flex items-center gap-3 rounded-[var(--radius)] border border-border p-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius)] bg-[#eff4ff] text-sm font-bold text-[#006a61]">
                DM
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Discrete Mathematics
                </p>
                <p className="text-xs text-muted-foreground">Enrolled</p>
              </div>
              <span className="text-xs text-muted-foreground">42%</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full gap-2"
          size="lg"
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
