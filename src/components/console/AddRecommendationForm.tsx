"use client";

import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addRecommendation } from "@/lib/actions/console-actions";

const initialState = { success: false, error: undefined as string | undefined };

interface Props {
  students: { user_id: number; name: string }[];
}

export default function AddRecommendationForm({ students }: Props) {
  const [state, formAction, isPending] = useActionState(addRecommendation, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Recommendation</CardTitle>
        <CardDescription>Create a personalized recommendation for a student.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student_id">Student</Label>
            <Select name="student_id" defaultValue="">
              <SelectTrigger id="student_id" className="w-full">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((s) => (
                  <SelectItem key={s.user_id} value={String(s.user_id)}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Recommendation</Label>
            <Textarea
              id="reason"
              name="reason"
              placeholder="e.g. Focus on linear algebra basics for better ML understanding."
              rows={3}
              required
            />
          </div>
          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="text-sm text-emerald-500">Recommendation added successfully.</p>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            Add Recommendation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
