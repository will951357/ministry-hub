
import { Calendar, MapPin, Clock, Users, DollarSign, EyeOff, Check, Eye, Edit, Trash2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Example events data with more realistic information
const events = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2025, 3, 21), // April 21, 2025
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    attendees: 120,
    maxAttendees: 200,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    hasCheckin: true,
    description: 'Weekly worship service with praise and sermon. All are welcome to join us for a time of worship and fellowship.',
    registeredUsers: [
      { id: 1, name: 'John Smith', email: 'john@example.com', checkedIn: true },
      { id: 2, name: 'Mary Johnson', email: 'mary@example.com', checkedIn: false },
      { id: 3, name: 'Robert Williams', email: 'robert@example.com', checkedIn: true },
      { id: 4, name: 'Sarah Brown', email: 'sarah@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Pastor John', 'Worship Leader']
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: new Date(2025, 3, 22), // April 22, 2025
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
    attendees: 35,
    maxAttendees: 50,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    hasCheckin: false,
    description: 'Weekly youth group meeting with games, worship, and Bible study for teenagers.',
    registeredUsers: [
      { id: 5, name: 'Mike Thomas', email: 'mike@example.com', checkedIn: false },
      { id: 6, name: 'Jessica Wilson', email: 'jessica@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Youth Pastor']
  },
  {
    id: 3,
    title: 'Prayer Meeting',
    date: new Date(2025, 3, 18), // April 18, 2025
    time: '7:00 PM - 8:30 PM',
    location: 'Chapel',
    attendees: 45,
    maxAttendees: 60,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    hasCheckin: true,
    description: 'Weekly prayer meeting for church members and guests. Join us as we pray for our church, community, and world.',
    registeredUsers: [
      { id: 7, name: 'David Clark', email: 'david@example.com', checkedIn: true },
      { id: 8, name: 'Lisa Adams', email: 'lisa@example.com', checkedIn: true },
      { id: 9, name: 'James Miller', email: 'james@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Prayer Team Leader']
  },
  {
    id: 4,
    title: 'Leadership Retreat (Private)',
    date: new Date(2025, 3, 25), // April 25, 2025
    time: '9:00 AM - 5:00 PM',
    location: 'Mountain Retreat Center',
    attendees: 15,
    maxAttendees: 20,
    price: 75,
    visibility: 'private',
    status: 'confirmed',
    hasCheckin: true,
    description: 'Annual leadership retreat for church leaders and staff. This is a private event for leadership development and planning.',
    registeredUsers: [
      { id: 10, name: 'Pastor John', email: 'pastorjohn@example.com', checkedIn: false },
      { id: 11, name: 'Elder Smith', email: 'elder@example.com', checkedIn: false },
      { id: 12, name: 'Deacon Brown', email: 'deacon@example.com', checkedIn: false }
    ],
    responsibleMembers: ['Senior Pastor', 'Church Administrator']
  },
];

export function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCheckinQR, setShowCheckinQR] = useState(false);
  const { toast } = useToast();

  const handleCancelEvent = (eventId: number) => {
    toast({
      title: "Event Canceled",
      description: "The event has been successfully canceled.",
    });
  };

  const handleGenerateQRCode = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setShowCheckinQR(true);
  };

  const handleViewDetails = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleEditEvent = (eventId: number) => {
    toast({
      title: "Edit Event",
      description: `Editing event with ID: ${eventId}`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Upcoming Events</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 rounded-md border p-3 transition-all hover:bg-muted/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-church-accent/10 text-church-accent">
                  <Calendar />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium leading-none">
                      {event.title}
                      {event.visibility === 'private' && (
                        <EyeOff className="h-3 w-3 inline ml-1 text-muted-foreground" />
                      )}
                      {event.hasCheckin && (
                        <Check className="h-3 w-3 inline ml-1 text-green-600" />
                      )}
                    </p>
                    <div className="flex gap-1">
                      {event.price === 0 ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Free
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          ${event.price}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex text-sm text-muted-foreground items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    <span>{format(event.date, "MMMM d, yyyy")}</span>
                  </div>
                  
                  <div className="flex text-sm text-muted-foreground items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex text-sm text-muted-foreground items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex text-sm text-muted-foreground items-center">
                    <Users className="mr-1 h-3.5 w-3.5" />
                    <span>{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>

                  <div className="flex mt-2 pt-2 border-t justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8" 
                      onClick={() => handleViewDetails(event)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> Details
                    </Button>
                    
                    {event.hasCheckin && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8" 
                        onClick={() => handleGenerateQRCode(event)}
                      >
                        <QrCode className="h-3.5 w-3.5 mr-1" /> Check-in
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8" 
                      onClick={() => handleEditEvent(event.id)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Cancel
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel the event "{event.title}" and notify all registered attendees. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>No, keep event</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleCancelEvent(event.id)}
                            className="bg-red-500 hover:bg-red-700"
                          >
                            Yes, cancel event
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.title}
              {selectedEvent?.visibility === 'private' && (
                <EyeOff className="h-4 w-4 inline ml-1 text-muted-foreground" />
              )}
            </DialogTitle>
            <DialogDescription>
              Event details and registered attendees
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Date & Time</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(selectedEvent.date, "MMMM d, yyyy")} <br />
                    {selectedEvent.time}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Attendees</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Price</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.price === 0 ? 'Free' : `$${selectedEvent.price}`}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Check-in Required</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.hasCheckin ? 'Yes' : 'No'}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.visibility === 'public' ? 'Public' : 'Private'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Responsible Members</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent.responsibleMembers.join(', ')}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Registered Attendees ({selectedEvent.registeredUsers.length})</h4>
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
                      {selectedEvent.registeredUsers.map(user => (
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
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDetails(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check-in QR Code Dialog */}
      <Dialog open={showCheckinQR} onOpenChange={setShowCheckinQR}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Event Check-in</DialogTitle>
            <DialogDescription>
              Scan this QR code to check in to {selectedEvent?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-6">
            {/* Placeholder for QR code */}
            <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border border-gray-300 rounded-md">
              <QrCode size={120} className="text-church-accent" />
            </div>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Event ID: {selectedEvent?.id}<br />
              Attendees can scan this code using their mobile device to check in.
            </p>
          </div>
          
          <DialogFooter>
            <Button
              onClick={() => {
                toast({
                  title: "QR Code Generated",
                  description: "Check-in QR code has been generated and can be downloaded or shared.",
                });
              }}
            >
              Download QR Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
