
import React from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CancelEventDialogProps = {
  eventTitle: string;
  onConfirm: () => void;
};

export function CancelEventDialog({ eventTitle, onConfirm }: CancelEventDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This will cancel the event "{eventTitle}" and notify all registered attendees. This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>No, keep event</AlertDialogCancel>
        <AlertDialogAction 
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-700"
        >
          Yes, cancel event
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
