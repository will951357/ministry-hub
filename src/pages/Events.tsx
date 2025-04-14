
import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, DollarSign, Eye, EyeOff, CircleCheck, CircleX, CircleSlash, Download, Bell, Search, Filter, ToggleLeft, ToggleRight } from "lucide-react";
import { format, isSameDay } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EventStatus = 'confirmed' | 'canceled' | 'sold-out';
type EventVisibility = 'public' | 'private';

type Event = {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  attendees: number;
  maxAttendees?: number;
  price: number;
  visibility: EventVisibility;
  status: EventStatus;
  createdBy: string;
};

// Sample data
const sampleEvents: Event[] = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2024, 3, 21), // April 21, 2024
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Main Sanctuary',
    description: 'Weekly worship service with praise and sermon',
    attendees: 120,
    maxAttendees: 200,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Pastor John'
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: new Date(2024, 3, 22), // April 22, 2024
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    location: 'Youth Center',
    description: 'Weekly youth group meeting with games and Bible study',
    attendees: 35,
    maxAttendees: 50,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Youth Pastor'
  },
  {
    id: 3,
    title: 'Leadership Retreat',
    date: new Date(2024, 3, 25), // April 25, 2024
    startTime: '9:00 AM',
    endTime: '5:00 PM',
    location: 'Mountain Retreat Center',
    description: 'Annual leadership retreat for church leaders',
    attendees: 15,
    maxAttendees: 20,
    price: 75,
    visibility: 'private',
    status: 'confirmed',
    createdBy: 'Admin'
  },
  {
    id: 4,
    title: 'Easter Concert',
    date: new Date(2024, 3, 18), // April 18, 2024
    startTime: '7:00 PM',
    endTime: '9:00 PM',
    location: 'Main Sanctuary',
    description: 'Special Easter concert featuring the church choir',
    attendees: 200,
    maxAttendees: 200,
    price: 15,
    visibility: 'public',
    status: 'sold-out',
    createdBy: 'Music Director'
  },
  {
    id: 5,
    title: 'Men\'s Prayer Breakfast',
    date: new Date(2024, 3, 20), // April 20, 2024
    startTime: '8:00 AM',
    endTime: '10:00 AM',
    location: 'Fellowship Hall',
    description: 'Monthly men\'s prayer breakfast and fellowship',
    attendees: 28,
    maxAttendees: 40,
    price: 10,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Men\'s Ministry Leader'
  },
  {
    id: 6,
    title: 'Children\'s Easter Egg Hunt',
    date: new Date(2024, 3, 20), // April 20, 2024
    startTime: '3:00 PM',
    endTime: '5:00 PM',
    location: 'Church Grounds',
    description: 'Annual Easter egg hunt for children',
    attendees: 45,
    maxAttendees: 60,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
    createdBy: 'Children\'s Ministry'
  },
  {
    id: 7,
    title: 'Sound Team Training',
    date: new Date(2024, 3, 27), // April 27, 2024
    startTime: '1:00 PM',
    endTime: '3:00 PM',
    location: 'Tech Booth',
    description: 'Training session for sound team volunteers',
    attendees: 5,
    maxAttendees: 8,
    price: 0,
    visibility: 'private',
    status: 'confirmed',
    createdBy: 'Technical Director'
  },
  {
    id: 8,
    title: 'Missions Trip Fundraiser',
    date: new Date(2024, 3, 23), // April 23, 2024
    startTime: '6:30 PM',
    endTime: '8:30 PM',
    location: 'Fellowship Hall',
    description: 'Fundraiser dinner for upcoming missions trip',
    attendees: 0,
    maxAttendees: 100,
    price: 25,
    visibility: 'public',
    status: 'canceled',
    createdBy: 'Missions Director'
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

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(event => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      // Visibility filter
      const matchesVisibility = visibilityFilter === 'all' || event.visibility === visibilityFilter;
      
      // Status filter
      const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
      
      // Price filter
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

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Events</h1>
            <p className="text-muted-foreground">
              {filteredEvents.length} Upcoming Events
            </p>
          </div>
          
          <div className="flex mt-4 md:mt-0 gap-2">
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
                  Send Notifications
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="px-2 py-1.5 text-sm">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span>Send to all attendees</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSendToAll(!sendToAll)}
                      className="h-6 w-6"
                    >
                      {sendToAll ? 
                        <ToggleRight className="h-5 w-5 text-green-500" /> : 
                        <ToggleLeft className="h-5 w-5" />
                      }
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full" 
                    onClick={handleSendNotification}
                  >
                    Send
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar with filters and calendar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Narrow down your event list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search events..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Visibility</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        visibilityFilter === 'all' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setVisibilityFilter('all')}
                    >
                      All
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        visibilityFilter === 'public' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setVisibilityFilter('public')}
                    >
                      <Eye className="h-3 w-3 mr-1" /> Public
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        visibilityFilter === 'private' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setVisibilityFilter('private')}
                    >
                      <EyeOff className="h-3 w-3 mr-1" /> Private
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        statusFilter === 'all' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setStatusFilter('all')}
                    >
                      All
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        statusFilter === 'confirmed' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setStatusFilter('confirmed')}
                    >
                      <CircleCheck className="h-3 w-3 mr-1" /> Confirmed
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        statusFilter === 'canceled' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setStatusFilter('canceled')}
                    >
                      <CircleX className="h-3 w-3 mr-1" /> Canceled
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        statusFilter === 'sold-out' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setStatusFilter('sold-out')}
                    >
                      <CircleSlash className="h-3 w-3 mr-1" /> Sold Out
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Price</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        priceFilter === 'all' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setPriceFilter('all')}
                    >
                      All
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        priceFilter === 'free' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setPriceFilter('free')}
                    >
                      Free
                    </Badge>
                    <Badge 
                      className={cn(
                        "cursor-pointer",
                        priceFilter === 'paid' ? "bg-primary" : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setPriceFilter('paid')}
                    >
                      <DollarSign className="h-3 w-3 mr-1" /> Paid
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => {
                    setSearchTerm('');
                    setVisibilityFilter('all');
                    setStatusFilter('all');
                    setPriceFilter('all');
                  }}
                >
                  Reset Filters
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Browse events by date</CardDescription>
              </CardHeader>
              <CardContent>
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
                  components={{
                    DayContent: ({ date, activeModifiers }) => {
                      const hasEvent = activeModifiers.hasEvent;
                      return (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={cn(
                                "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                                "flex items-center justify-center",
                                hasEvent && "relative"
                              )}>
                                {date.getDate()}
                                {hasEvent && (
                                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-church-accent"></span>
                                )}
                              </div>
                            </TooltipTrigger>
                            {hasEvent && (
                              <TooltipContent>
                                {sampleEvents
                                  .filter(event => isSameDay(event.date, date))
                                  .map(event => (
                                    <div key={event.id} className="text-xs py-0.5">
                                      <span className="font-semibold">{event.title}</span>
                                      <span className="text-muted-foreground ml-1">({event.startTime})</span>
                                    </div>
                                  ))
                                }
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      );
                    }
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setDate(new Date())} 
                  size="sm" 
                  className="w-full"
                >
                  Today
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Events list */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {date ? (
                    <>Events on {format(date, "MMMM d, yyyy")}</>
                  ) : (
                    <>All Events</>
                  )}
                </CardTitle>
                <CardDescription>
                  {eventsByDate.length} {eventsByDate.length === 1 ? "event" : "events"} found
                </CardDescription>
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {eventsByDate.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="font-medium cursor-pointer hover:text-church-accent">
                                  {event.title}
                                  {event.visibility === 'private' && (
                                    <EyeOff className="h-3 w-3 inline ml-1 text-muted-foreground" />
                                  )}
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80">
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">{event.title}</h4>
                                  <p className="text-xs">{event.description}</p>
                                  <div className="text-xs text-muted-foreground">
                                    Created by: {event.createdBy}
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
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
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
