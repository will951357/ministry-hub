
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Demo: static member list
const MEMBERS = [
  "Mary Johnson",
  "Samuel Green",
  "James Lee",
  "Sandra Brown",
  "William Smith",
];

interface ChooseMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChoose: (member: string) => void;
}

export default function ChooseMemberDialog({ open, onOpenChange, onChoose }: ChooseMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a Member</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2 mt-2">
          {MEMBERS.map(member => (
            <li key={member}>
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={() => onChoose(member)}
              >
                {member}
              </Button>
            </li>
          ))}
        </ul>
        <Button variant="outline" className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
