
import React, { useState } from 'react';
import { Check, Edit, EyeOff, QrCode, Save, Trash2, X } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type EventUser = {
  id: number;
  name: string;
  email: string;
  checkedIn: boolean;
};

type EventDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: number;
    title: string;
    date: Date;
    time: string;
    location: string;
    attendees: number;
    maxAttendees: number;
    price: number;
    visibility: 'public' | 'private';
    status: string;
    hasCheckin: boolean;
    description: string;
    registeredUsers: EventUser[];
    responsibleMembers: string[];
  } | null;
  onEditEvent?: (id: number) => void;
  onCancelEvent?: (id: number) => void;
  onGenerateQRCode?: (event: EventDetailsModalProps['event']) => void;
  AlertDialogContent?: React.ReactNode;
};

export function EventDetailsModal({ 
  open, 
  onOpenChange, 
  event,
  onEditEvent,
  onCancelEvent,
  onGenerateQRCode,
  AlertDialogContent
}: EventDetailsModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("details");
  
  if (!event) return null;
  
  const handleEditSave = () => {
    toast({
      title: "Changes Saved",
      description: "Your changes to the event have been saved successfully.",
    });
  };

  const handleGenerateQR = () => {
    if (onGenerateQRCode && event) {
      onGenerateQRCode(event);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {event.title}
            {event.visibility === 'private' && (
              <EyeOff className="h-4 w-4 inline ml-1 text-muted-foreground" />
            )}
          </DialogTitle>
          <DialogDescription>
            Event details and management
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="edit">Edit Event</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Date & Time</h4>
                <p className="text-sm text-muted-foreground">
                  {format(event.date, "MMMM d, yyyy")} <br />
                  {event.time}
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Location</h4>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Attendees</h4>
                <p className="text-sm text-muted-foreground">
                  {event.attendees}/{event.maxAttendees}
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Price</h4>
                <p className="text-sm text-muted-foreground">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Check-in Required</h4>
                <p className="text-sm text-muted-foreground">
                  {event.hasCheckin ? 'Yes' : 'No'}
                </p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Visibility</h4>
                <p className="text-sm text-muted-foreground">
                  {event.visibility === 'public' ? 'Public' : 'Private'}
                </p>
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Responsible Members</h4>
              <p className="text-sm text-muted-foreground">
                {event.responsibleMembers.join(', ')}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Registered Attendees ({event.registeredUsers.length})</h4>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-xs font-medium text-left text-gray-500">Name</th>
                      <th className="px-4 py-2 text-xs font-medium text-left text-gray-500">Email</th>
                      <th className="px-4 py-2 text-xs font-medium text-center text-gray-500">Check-in Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {event.registeredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="px-4 py-2 text-sm">{user.name}</td>
                        <td className="px-4 py-2 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-4 py-2 text-sm text-center">
                          {user.checkedIn ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Check className="h-3 w-3 mr-1" /> Checked In
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Pending
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              {event.hasCheckin && (
                <Button 
                  variant="outline" 
                  onClick={handleGenerateQR}
                >
                  <QrCode className="h-4 w-4 mr-2" /> Check-in QR Code
                </Button>
              )}
              <Button 
                variant="default" 
                onClick={() => setActiveTab("edit")}
              >
                <Edit className="h-4 w-4 mr-2" /> Edit Event
              </Button>
            </DialogFooter>
          </TabsContent>
          
          <TabsContent value="edit" className="space-y-4">
            <div className="bg-muted/30 p-4 border rounded-md">
              <p className="text-sm text-muted-foreground text-center">
                [Event editing form would be implemented here]
              </p>
            </div>
            
            <DialogFooter className="flex justify-between">
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Cancel Event
                    </Button>
                  </AlertDialogTrigger>
                  {AlertDialogContent}
                </AlertDialog>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("details")}
                >
                  <X className="h-4 w-4 mr-2" /> Discard Changes
                </Button>
                <Button 
                  variant="default" 
                  onClick={handleEditSave}
                >
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </div>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
