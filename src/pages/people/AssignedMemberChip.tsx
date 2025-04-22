
import { X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AssignedMember {
  name: string;
  email: string;
  photo: string;
}

export default function AssignedMemberChip({
  member,
  onRemove
}: {
  member: AssignedMember;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center bg-accent rounded-full px-2 py-1 mr-1">
      <Avatar className="h-7 w-7">
        <AvatarImage src={member.photo} alt={member.name} />
        <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
      </Avatar>
      <div className="ml-2 mr-2">
        <div className="text-xs font-medium">{member.name}</div>
        <div className="text-xs text-muted-foreground">{member.email}</div>
      </div>
      <button
        type="button"
        className="ml-1 text-muted-foreground hover:text-destructive focus:outline-none"
        onClick={onRemove}
        aria-label="Remove member"
      >
        <X size={16} />
      </button>
    </div>
  );
}
