
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Search } from "lucide-react";

const MEMBERS = [
  {
    id: 1,
    name: "Mary Johnson",
    email: "mary.johnson@email.com",
    photo: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Samuel Green",
    email: "samuel.green@email.com",
    photo: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "James Lee",
    email: "james.lee@email.com",
    photo: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "Sandra Brown",
    email: "sandra.brown@email.com",
    photo: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "William Smith",
    email: "william.smith@email.com",
    photo: "https://randomuser.me/api/portraits/men/5.jpg"
  },
];

interface ChooseMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChoose: (member: { name: string; email: string; photo: string }) => void;
  alreadyChosenEmails?: string[];
  allowMultiple?: boolean;
}

export default function ChooseMemberDialog({
  open,
  onOpenChange,
  onChoose,
  alreadyChosenEmails = [],
  allowMultiple = false,
}: ChooseMemberDialogProps) {
  const [search, setSearch] = useState("");

  const filteredMembers = MEMBERS.filter(member =>
    (member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase())) &&
    !alreadyChosenEmails.includes(member.email)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a Member</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex items-center gap-2">
          <Search className="text-muted-foreground" size={18} />
          <Input
            placeholder="Search member..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full"
          />
        </div>
        <ul className="space-y-2 mt-4 max-h-64 overflow-y-auto">
          {filteredMembers.length === 0 && (
            <li className="text-sm text-muted-foreground text-center py-4">
              No members found.
            </li>
          )}
          {filteredMembers.map(member => (
            <li key={member.email}>
              <Button
                variant="secondary"
                className="w-full flex items-center gap-3 justify-start py-2 px-3"
                onClick={() => {
                  onChoose(member);
                  if (!allowMultiple) {
                    onOpenChange(false);
                  }
                }}
              >
                <Avatar>
                  <AvatarImage src={member.photo} alt={member.name} />
                  <AvatarFallback>
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.email}</div>
                </div>
              </Button>
            </li>
          ))}
        </ul>
        <Button variant="outline" className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
