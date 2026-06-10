import { Lightbulb, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RecommendationWithStudent } from "@/types";

interface Props {
  recommendations: RecommendationWithStudent[];
}

export default function RecommendationsList({ recommendations }: Props) {
  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suggested For You</CardTitle>
          <CardDescription>No recommendations yet. Keep up the good work!</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested For You</CardTitle>
        <CardDescription>
          Personalized study recommendations and peer suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {recommendations.map((rec) => {
            const isGroup = rec.reason.toLowerCase().includes("group");
            return (
              <li
                key={rec.rec_id}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                {isGroup ? (
                  <Users className="mt-0.5 size-4 shrink-0 text-blue-500" />
                ) : (
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
                )}
                <p className="text-sm">{rec.reason}</p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
