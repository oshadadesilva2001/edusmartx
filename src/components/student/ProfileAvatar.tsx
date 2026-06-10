import { Camera, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  name: string;
  email: string;
  badges?: string[];
  className?: string;
}

export default function ProfileAvatar({
  name,
  email,
  badges = [],
  className,
}: ProfileAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn("flex flex-col items-center gap-3 py-6 text-center", className)}
    >
      {/* Avatar */}
      <div className="relative">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#006a61] text-2xl font-bold text-white">
          {initials}
        </div>
        <button className="absolute bottom-0 right-0 flex size-6 items-center justify-center rounded-full border border-border bg-white text-[#006a61]">
          <Camera className="size-3" />
        </button>
      </div>

      {/* Name and email */}
      <div>
        <h2 className="text-xl font-bold text-foreground">{name}</h2>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {badges.map((badge) => (
            <Badge key={badge} variant="secondary">
              <Award className="mr-1 size-3" />
              {badge}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
