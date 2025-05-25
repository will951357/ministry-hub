
import React from 'react';
import { User, Mail, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Participant {
  id: number;
  name: string;
  email: string;
  checkedIn: boolean;
  avatar?: string;
}

interface ParticipantsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  participants: Participant[];
}

export function ParticipantsModal({ 
  open, 
  onOpenChange, 
  eventTitle, 
  participants 
}: ParticipantsModalProps) {
  const checkedInCount = participants.filter(p => p.checkedIn).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Event Participants
          </DialogTitle>
          <DialogDescription>
            {participants.length} registered participants for "{eventTitle}"
            {participants.length > 0 && (
              <span className="ml-2">
                • {checkedInCount} checked in
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px] pr-4">
          {participants.length > 0 ? (
            <div className="space-y-3">
              {participants.map((participant) => (
                <div 
                  key={participant.id} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback className="text-xs">
                        {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{participant.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{participant.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={participant.checkedIn ? "default" : "secondary"}
                    className={participant.checkedIn ? "bg-green-100 text-green-800 border-green-200" : ""}
                  >
                    {participant.checkedIn ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Checked In
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No participants registered yet</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
