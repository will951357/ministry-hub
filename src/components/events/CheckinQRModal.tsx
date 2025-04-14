
import React from 'react';
import { QrCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type CheckinQRModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: number;
    title: string;
  } | null;
};

export function CheckinQRModal({ open, onOpenChange, event }: CheckinQRModalProps) {
  const { toast } = useToast();

  if (!event) return null;
  
  const handleDownload = () => {
    toast({
      title: "QR Code Generated",
      description: "Check-in QR code has been generated and can be downloaded or shared.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Event Check-in</DialogTitle>
          <DialogDescription>
            Scan this QR code to check in to {event.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-6">
          {/* Placeholder for QR code */}
          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-md">
            <QrCode size={120} className="text-church-accent" />
          </div>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            Event ID: {event.id}<br />
            Attendees can scan this code using their mobile device to check in.
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={handleDownload}>
            Download QR Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
