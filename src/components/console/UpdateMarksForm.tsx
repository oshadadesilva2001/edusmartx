"use client";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { updateQuizMarks } from "@/lib/actions/console-actions";

const initialState = { success: false, error: undefined as string | undefined };

interface Props {
  attempts: { attempt_id: number; student_name: string; q_id: number; marks: number }[];
}

export default function UpdateMarksForm({ attempts }: Props) {
  const [state, formAction, isPending] = useActionState(updateQuizMarks, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Quiz Marks</CardTitle>
        <CardDescription>Modify a student&apos;s quiz marks. Negative values are rejected.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="attempt_id">Attempt</Label>
            <Select name="attempt_id" defaultValue="">
              <SelectTrigger id="attempt_id" className="w-full">
                <SelectValue placeholder="Select an attempt" />
              </SelectTrigger>
              <SelectContent>
                {attempts.map((a) => (
                  <SelectItem key={a.attempt_id} value={String(a.attempt_id)}>
                    #{a.attempt_id} — {a.student_name} (Quiz {a.q_id}, {a.marks}%)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="marks">New Marks (0–100)</Label>
            <Input
              id="marks"
              name="marks"
              type="number"
              min={0}
              max={100}
              step="0.01"
              placeholder="85.5"
              required
            />
          </div>
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-emerald-500">Marks updated successfully.</p>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Update Marks
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
