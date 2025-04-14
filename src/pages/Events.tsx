import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, DollarSign, Eye, EyeOff, CircleCheck, CircleX, CircleSlash, Download, Bell, Search, Plus, Clock, Edit, Trash2, QrCode } from "lucide-react";
import { format, isSameDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { EventListItem } from "@/components/events/EventListItem";
import { AddEventModal } from "@/components/events/AddEventModal";
import { EventDetailsModal } from "@/components/events/EventDetailsModal";
import { CheckinQRModal } from "@/components/events/CheckinQRModal";
import { CancelEventDialog } from "@/components/events/CancelEventDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type EventStatus = 'confirmed' | 'canceled' | 'sold-out';
type EventVisibility = 'public' | 'private';

type EventUser = {
  id: number;
  name: string;
  email: string;
  checkedIn: boolean;
};

type Event = {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  price: number;
  visibility: EventVisibility;
  status: EventStatus;
  createdBy: string;
  hasCheckin?: boolean;
  registeredUsers?: EventUser[];
  responsibleMembers: string[];
};

const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2025, 3, 21),
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    description: 'Weekly worship service with praise and sermon',
    attendees: 120,
    maxAttendees: 200,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Pastor John',
    responsibleMembers: ['Pastor John', 'Worship Leader'],
    hasCheckin: true,
    registeredUsers: []
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: new Date(2025, 3, 22),
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
    description: 'Weekly youth group meeting with games and Bible study',
    attendees: 35,
    maxAttendees: 50,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Youth Pastor',
    responsibleMembers: ['Youth Pastor'],
    hasCheckin: false,
    registeredUsers: []
  },
  {
    id: 3,
    title: 'Leadership Retreat',
    date: new Date(2025, 3, 25),
    startTime: '9:00 AM',
    endTime: '5:00 PM',
    time: '9:00 AM - 5:00 PM',
    location: 'Mountain Retreat Center',
    description: 'Annual leadership retreat for church leaders',
    attendees: 15,
    maxAttendees: 20,
    price: 75,
    visibility: 'private',
    status: 'confirmed',
    createdBy: 'Admin',
    responsibleMembers: ['Senior Pastor', 'Church Administrator'],
    hasCheckin: true,
    registeredUsers: []
  },
  {
    id: 4,
    title: 'Easter Concert',
    date: new Date(2025, 3, 18),
    startTime: '7:00 PM',
    endTime: '9:00 PM',
    time: '7:00 PM - 9:00 PM',
    location: 'Main Sanctuary',
    description: 'Special Easter concert featuring the church choir',
    attendees: 200,
    maxAttendees: 200,
    price: 15,
    visibility: 'public',
    status: 'sold-out',
    createdBy: 'Music Director',
    responsibleMembers: ['Music Director', 'Choir Leader'],
    hasCheckin: true,
    registeredUsers: []
  },
  {
    id: 5,
    title: 'Men\'s Prayer Breakfast',
    date: new Date(2025, 3, 20),
    startTime: '8:00 AM',
    endTime: '10:00 AM',
    time: '8:00 AM - 10:00 AM',
    location: 'Fellowship Hall',
    description: 'Monthly men\'s prayer breakfast and fellowship',
    attendees: 28,
    maxAttendees: 40,
    price: 10,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Men\'s Ministry Leader',
    responsibleMembers: ['Men\'s Ministry Leader'],
    hasCheckin: false,
    registeredUsers: []
  },
  {
    id: 6,
    title: 'Children\'s Easter Egg Hunt',
    date: new Date(2025, 3, 20),
    startTime: '3:00 PM',
    endTime: '5:00 PM',
    time: '3:00 PM - 5:00 PM',
    location: 'Church Grounds',
    description: 'Annual Easter egg hunt for children',
    attendees: 45,
    maxAttendees: 60,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Children\'s Ministry',
    responsibleMembers: ['Children\'s Ministry Director', 'Volunteers'],
    hasCheckin: true,
    registeredUsers: []
  },
  {
    id: 7,
    title: 'Sound Team Training',
    date: new Date(2025, 3, 27),
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    time: '1:00 PM - 3:00 PM',
    location: 'Tech Booth',
    description: 'Training session for sound team volunteers',
    attendees: 5,
    maxAttendees: 8,
    price: 0,
    visibility: 'private',
    status: 'confirmed',
    createdBy: 'Technical Director',
    responsibleMembers: ['Technical Director'],
    hasCheckin: false,
    registeredUsers: []
  },
  {
    id: 8,
    title: 'Missions Trip Fundraiser',
    date: new Date(2025, 3, 23),
    startTime: '6:30 PM',
    endTime: '8:30 PM',
    time: '6:30 PM - 8:30 PM',
    location: 'Fellowship Hall',
    description: 'Fundraiser dinner for upcoming missions trip',
    attendees: 0,
    maxAttendees: 100,
    price: 25,
    visibility: 'public',
    status: 'canceled',
    createdBy: 'Missions Director',
    responsibleMembers: ['Missions Director', 'Missions Team'],
    hasCheckin: false,
    registeredUsers: []
  }
];

const Events = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<EventVisibility | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'free' | 'paid' | 'all'>('all');
  const [sendToAll, setSendToAll] = useState(true);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCheckinQR, setShowCheckinQR] = useState(false);

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(event => {
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesVisibility = visibilityFilter === 'all' || event.visibility === visibilityFilter;
      
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      
      const matchesPrice = 
        priceFilter === 'all' || 
        (priceFilter === 'free' && event.price === 0) ||
        (priceFilter === 'paid' && event.price > 0);
        
      return matchesSearch && matchesVisibility && matchesStatus && matchesPrice;
    });
  }, [searchTerm, visibilityFilter, statusFilter, priceFilter, sampleEvents]);

  const eventsByDate = useMemo(() => {
    return filteredEvents.filter(event => 
      date ? isSameDay(event.date, date) : true
    );
  }, [filteredEvents, date]);

  const hasEvents = (dateToCheck: Date): boolean => {
    return sampleEvents.some(event => isSameDay(event.date, dateToCheck));
  };

  const handleExport = (format: 'csv' | 'pdf' | 'ical') => {
    toast({
      title: "Export Initiated",
      description: `Exporting ${filteredEvents.length} events as ${format.toUpperCase()}`
    });
  };

  const handleSendNotification = () => {
    toast({
      title: "Notifications Sent",
      description: `Notifications sent to ${sendToAll ? 'all attendees' : 'event organizers only'}`
    });
  };

  const getStatusBadge = (status: EventStatus) => {
    switch(status) {
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CircleCheck className="h-3 w-3 mr-1" /> Confirmed</Badge>;
      case 'canceled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><CircleX className="h-3 w-3 mr-1" /> Canceled</Badge>;
      case 'sold-out':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200"><CircleSlash className="h-3 w-3 mr-1" /> Sold Out</Badge>;
    }
  };

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleGenerateQRCode = (event: Event) => {
    setSelectedEvent(event);
    setShowCheckinQR(true);
  };

  const handleEditEvent = (eventId: number) => {
    toast({
      title: "Edit Event",
      description: `Editing event with ID: ${eventId}`,
    });
  };

  const handleCancelEvent = (eventId: number) => {
    toast({
      title: "Event Canceled",
      description: "The event has been successfully canceled.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Events</h1>
                  <p className="text-muted-foreground">
                    {filteredEvents.length} Upcoming Events
                  </p>
                </div>
                <Button 
                  onClick={() => setShowAddEventModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Event
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-grow">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleExport('csv')}>CSV</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('pdf')}>PDF</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExport('ical')}>iCal</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="gap-1">
                        <Bell className="h-4 w-4" />
                        Notify
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => { setSendToAll(true); handleSendNotification(); }}>
                        All Attendees
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setSendToAll(false); handleSendNotification(); }}>
                        Organizers Only
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge 
                  className={cn(
                    "cursor-pointer",
                    visibilityFilter === 'all' && statusFilter === 'all' && priceFilter === 'all' 
                      ? "bg-primary" 
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => {
                    setVisibilityFilter('all');
                    setStatusFilter('all');
                    setPriceFilter('all');
                  }}
                >
                  All Events
                </Badge>
                
                <Badge 
                  className={cn(
                    "cursor-pointer",
                    visibilityFilter === 'public' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setVisibilityFilter(visibilityFilter === 'public' ? 'all' : 'public')}
                >
                  <Eye className="h-3 w-3 mr-1" /> Public
                </Badge>
                
                <Badge 
                  className={cn(
                    "cursor-pointer",
                    visibilityFilter === 'private' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setVisibilityFilter(visibilityFilter === 'private' ? 'all' : 'private')}
                >
                  <EyeOff className="h-3 w-3 mr-1" /> Private
                </Badge>
                
                <Badge 
                  className={cn(
                    "cursor-pointer",
                    statusFilter === 'confirmed' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setStatusFilter(statusFilter === 'confirmed' ? 'all' : 'confirmed')}
                >
                  <CircleCheck className="h-3 w-3 mr-1" /> Confirmed
                </Badge>
                
                <Badge 
                  className={cn(
                    "cursor-pointer",
                    priceFilter === 'free' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setPriceFilter(priceFilter === 'free' ? 'all' : 'free')}
                >
                  Free
                </Badge>
                
                <Badge 
                  className={cn(
                    "cursor-pointer",
                    priceFilter === 'paid' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                  )}
                  onClick={() => setPriceFilter(priceFilter === 'paid' ? 'all' : 'paid')}
                >
                  <DollarSign className="h-3 w-3 mr-1" /> Paid
                </Badge>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className={cn("rounded-md border", "p-3 pointer-events-auto")}
                    modifiers={{
                      hasEvent: (date) => hasEvents(date),
                    }}
                    modifiersStyles={{
                      hasEvent: { 
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '0%',
                        color: 'rgb(109, 40, 217)'
                      }
                    }}
                  />
                </TooltipProvider>
                <div className="mt-2 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setDate(new Date())} 
                  >
                    Today
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setDate(undefined)} 
                  >
                    Show All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {date ? (
                <>Events on {format(date, "MMMM d, yyyy")}</>
              ) : (
                <>All Events</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {eventsByDate.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventsByDate.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="font-medium hover:text-church-accent cursor-pointer" onClick={() => handleViewDetails(event)}>
                          {event.title}
                          {event.visibility === 'private' && (
                            <EyeOff className="h-3 w-3 inline ml-1 text-muted-foreground" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{event.description.slice(0, 50)}...</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{format(event.date, "MMM d, yyyy")}</span>
                          <span className="text-muted-foreground text-xs">
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span>{event.attendees}</span>
                          {event.maxAttendees && (
                            <span className="text-xs text-muted-foreground ml-1">
                              /{event.maxAttendees}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.price === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>${event.price.toFixed(2)}</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(event.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewDetails(event)}
                            className="h-7 w-7"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          
                          {event.hasCheckin && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleGenerateQRCode(event)}
                              className="h-7 w-7"
                            >
                              <QrCode className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditEvent(event.id)}
                            className="h-7 w-7"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <CancelEventDialog 
                                eventTitle={event.title} 
                                onConfirm={() => handleCancelEvent(event.id)} 
                              />
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No events found for the selected filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setVisibilityFilter('all');
                    setStatusFilter('all');
                    setPriceFilter('all');
                    setDate(undefined);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <AddEventModal 
        open={showAddEventModal} 
        onOpenChange={setShowAddEventModal}
        onEventAdded={(event) => {
          toast({
            title: "Event Added",
            description: `${event.title} has been successfully added.`,
          });
        }}
      />

      <EventDetailsModal 
        open={showEventDetails} 
        onOpenChange={setShowEventDetails} 
        event={selectedEvent}
      />

      <CheckinQRModal
        open={showCheckinQR}
        onOpenChange={setShowCheckinQR}
        event={selectedEvent}
      />
    </MainLayout>
  );
};

export default Events;
