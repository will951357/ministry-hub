
import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, DollarSign, Eye, EyeOff, CircleCheck, CircleX, CircleSlash, Download, Bell, Search, Plus, Filter, QrCode, Edit, List } from "lucide-react";
import { format, isSameDay, startOfMonth, endOfMonth, addDays, startOfWeek, endOfWeek, setHours, setMinutes, addHours } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
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
import { EventStats } from '@/components/events/EventStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Event,
  EventVisibility,
  EventStatus,
} from '@/types/event';
import { MonthCalendarView } from '@/components/events/MonthCalendarView';
import { WeekCalendarView } from '@/components/events/WeekCalendarView';
import { DayCalendarView } from '@/components/events/DayCalendarView';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [selectedAddDate, setSelectedAddDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<EventVisibility | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<EventStatus | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<'free' | 'paid' | 'all'>('all');
  const [sendToAll, setSendToAll] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showCheckinQR, setShowCheckinQR] = useState(false);
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [listViewMode, setListViewMode] = useState<'month' | 'week' | 'year'>('month');

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
  }, [searchTerm, visibilityFilter, statusFilter, priceFilter]);

  const eventsByDate = useMemo(() => {
    return filteredEvents.filter(event => 
      selectedDate ? isSameDay(event.date, selectedDate) : true
    );
  }, [filteredEvents, selectedDate]);

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

  const totalUpcomingEvents = sampleEvents.length;
  const currentMonthEvents = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    return sampleEvents.filter(event => 
      event.date >= monthStart && event.date <= monthEnd
    ).length;
  }, []);
  
  const totalRegistrations = useMemo(() => {
    return sampleEvents.reduce((total, event) => total + event.attendees, 0);
  }, []);
  
  const totalRevenue = useMemo(() => {
    return sampleEvents.reduce((total, event) => total + (event.price * event.attendees), 0);
  }, []);

  const handleAddEvent = (date: Date) => {
    setSelectedAddDate(date);
    setShowAddEventModal(true);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Events</h1>
              <p className="text-muted-foreground mt-1">
                Manage your church events and calendar
              </p>
            </div>
            <Button onClick={() => setShowAddEventModal(true)} className="gap-2">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </div>

          <EventStats events={sampleEvents} />

          <Tabs defaultValue="calendar" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="mt-0">
              <Card className="border-border mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Calendar View</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <Tabs
                        value={calendarViewMode}
                        onValueChange={(value) => setCalendarViewMode(value as 'month' | 'week' | 'day')}
                        className="w-auto"
                      >
                        <TabsList>
                          <TabsTrigger value="month">Month</TabsTrigger>
                          <TabsTrigger value="week">Week</TabsTrigger>
                          <TabsTrigger value="day">Day</TabsTrigger>
                        </TabsList>
                      </Tabs>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newDate = new Date(selectedDate || new Date());
                          if (calendarViewMode === 'month') {
                            newDate.setMonth(newDate.getMonth() - 1);
                          } else if (calendarViewMode === 'week') {
                            newDate.setDate(newDate.getDate() - 7);
                          } else {
                            newDate.setDate(newDate.getDate() - 1);
                          }
                          setSelectedDate(newDate);
                        }}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedDate(new Date())}
                      >
                        Today
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newDate = new Date(selectedDate || new Date());
                          if (calendarViewMode === 'month') {
                            newDate.setMonth(newDate.getMonth() + 1);
                          } else if (calendarViewMode === 'week') {
                            newDate.setDate(newDate.getDate() + 7);
                          } else {
                            newDate.setDate(newDate.getDate() + 1);
                          }
                          setSelectedDate(newDate);
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                  
                  {calendarViewMode === 'month' && (
                    <MonthCalendarView 
                      events={sampleEvents} 
                      selectedDate={selectedDate || new Date()} 
                      onSelectDate={(date) => {
                        setSelectedDate(date);
                        setCalendarViewMode('day');
                      }}
                      onAddEvent={handleAddEvent}
                    />
                  )}
                  
                  {calendarViewMode === 'week' && (
                    <WeekCalendarView 
                      events={sampleEvents} 
                      selectedDate={selectedDate || new Date()} 
                      onSelectEvent={(event) => {
                        setSelectedEvent(event);
                        setShowEventDetails(true);
                      }}
                      onAddEvent={(date, hour) => {
                        const newDate = new Date(date);
                        newDate.setHours(hour);
                        setSelectedAddDate(newDate);
                        setShowAddEventModal(true);
                      }}
                    />
                  )}
                  
                  {calendarViewMode === 'day' && (
                    <DayCalendarView 
                      events={sampleEvents} 
                      selectedDate={selectedDate || new Date()} 
                      onSelectEvent={(event) => {
                        setSelectedEvent(event);
                        setShowEventDetails(true);
                      }}
                      onAddEvent={(date, hour) => {
                        const newDate = new Date(date);
                        newDate.setHours(hour);
                        setSelectedAddDate(newDate);
                        setShowAddEventModal(true);
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                  <div className="flex items-center gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>

                    <Tabs
                      value={listViewMode}
                      onValueChange={(value) => setListViewMode(value as 'month' | 'week' | 'year')}
                      className="w-auto"
                    >
                      <TabsList>
                        <TabsTrigger value="month">Month</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="year">Year</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="flex items-center gap-2">
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
                          <Filter className="h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          setVisibilityFilter('all');
                          setStatusFilter('all');
                          setPriceFilter('all');
                        }}>
                          All Events
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setVisibilityFilter(visibilityFilter === 'public' ? 'all' : 'public')}>
                          Public Events
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setVisibilityFilter(visibilityFilter === 'private' ? 'all' : 'private')}>
                          Private Events
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter(statusFilter === 'confirmed' ? 'all' : 'confirmed')}>
                          Confirmed Events
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPriceFilter(priceFilter === 'free' ? 'all' : 'free')}>
                          Free Events
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setPriceFilter(priceFilter === 'paid' ? 'all' : 'paid')}>
                          Paid Events
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-1">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
                      <DropdownMenuContent align="end">
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
                  {visibilityFilter !== 'all' || statusFilter !== 'all' || priceFilter !== 'all' ? (
                    <>
                      <Badge 
                        className="cursor-pointer bg-secondary hover:bg-secondary/80"
                        onClick={() => {
                          setVisibilityFilter('all');
                          setStatusFilter('all');
                          setPriceFilter('all');
                        }}
                      >
                        Clear All Filters
                      </Badge>
                      
                      {visibilityFilter !== 'all' && (
                        <Badge className="cursor-pointer bg-primary">
                          {visibilityFilter === 'public' ? (
                            <><Eye className="h-3 w-3 mr-1" /> Public</>
                          ) : (
                            <><EyeOff className="h-3 w-3 mr-1" /> Private</>
                          )}
                        </Badge>
                      )}
                      
                      {statusFilter !== 'all' && (
                        <Badge className="cursor-pointer bg-primary">
                          <CircleCheck className="h-3 w-3 mr-1" /> {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                        </Badge>
                      )}
                      
                      {priceFilter !== 'all' && (
                        <Badge className="cursor-pointer bg-primary">
                          {priceFilter === 'free' ? 'Free' : <><DollarSign className="h-3 w-3 mr-1" /> Paid</>}
                        </Badge>
                      )}
                    </>
                  ) : null}
                </div>

                <Card>
                  <CardHeader className="py-4">
                    <CardTitle>
                      {selectedDate ? (
                        <>Events on {format(selectedDate, "MMMM d, yyyy")}</>
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
                                <div className="flex justify-end gap-2">
                                  {event.hasCheckin && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => handleGenerateQRCode(event)}
                                      className="h-8"
                                    >
                                      <QrCode className="h-3.5 w-3.5" />
                                    </Button>
                                  )}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleEditEvent(event.id)}
                                    className="h-8"
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleViewDetails(event)}
                                    className="h-8"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </Button>
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
                            setSelectedDate(undefined);
                          }}
                        >
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddEventModal
        open={showAddEventModal}
        onOpenChange={setShowAddEventModal}
        defaultDate={selectedAddDate}
        onEventAdded={(event) => {
          toast({
            title: "Event Added",
            description: `${event.title} has been successfully added.`,
          });
          setSelectedAddDate(null);
        }}
      />

      <EventDetailsModal 
        open={showEventDetails} 
        onOpenChange={setShowEventDetails} 
        event={selectedEvent}
        onEditEvent={handleEditEvent}
        onCancelEvent={handleCancelEvent}
        onGenerateQRCode={handleGenerateQRCode}
        AlertDialogContent={
          selectedEvent ? (
            <CancelEventDialog 
              eventTitle={selectedEvent.title} 
              onConfirm={() => handleCancelEvent(selectedEvent.id)} 
            />
          ) : null
        }
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
