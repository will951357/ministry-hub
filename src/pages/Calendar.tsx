
import React, { useState, useMemo } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthCalendarView } from '@/components/events/MonthCalendarView';
import { WeekCalendarView } from '@/components/events/WeekCalendarView';
import { DayCalendarView } from '@/components/events/DayCalendarView';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Event } from '@/types/event';

type CalendarItemType = 'events' | 'birthdays' | 'appointments' | 'classes';

// Create a bridge interface that extends the Event type
interface CalendarEvent extends Event {
  type: CalendarItemType;
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedTypes, setSelectedTypes] = useState<CalendarItemType[]>(['events', 'birthdays', 'appointments', 'classes']);

  // Mock events data - in a real app, this would come from an API
  const allEvents: CalendarEvent[] = [
    { 
      id: 1, 
      title: "Sunday Service", 
      date: new Date(), 
      type: "events",
      startTime: "09:00",
      endTime: "11:00",
      time: "9:00 AM - 11:00 AM",
      location: "Main Sanctuary",
      description: "Weekly Sunday worship service",
      attendees: 120,
      maxAttendees: 200,
      price: 0,
      visibility: "public",
      status: "confirmed",
      createdBy: "Pastor Johnson",
      hasCheckin: true,
      registeredUsers: [],
      responsibleMembers: ["Pastor Johnson", "Worship Team"]
    },
    { 
      id: 2, 
      title: "John's Birthday", 
      date: new Date(), 
      type: "birthdays",
      startTime: "15:00",
      endTime: "17:00",
      time: "3:00 PM - 5:00 PM",
      location: "Fellowship Hall",
      description: "Birthday celebration for John",
      attendees: 25,
      maxAttendees: 50,
      price: 0,
      visibility: "private",
      status: "confirmed",
      createdBy: "Mary Smith",
      hasCheckin: false,
      registeredUsers: [],
      responsibleMembers: ["Mary Smith"]
    },
    { 
      id: 3, 
      title: "Pastoral Meeting", 
      date: new Date(), 
      type: "appointments",
      startTime: "13:00",
      endTime: "14:00",
      time: "1:00 PM - 2:00 PM",
      location: "Pastor's Office",
      description: "Weekly pastoral team meeting",
      attendees: 5,
      maxAttendees: 10,
      price: 0,
      visibility: "private",
      status: "confirmed",
      createdBy: "Pastor Johnson",
      hasCheckin: false,
      registeredUsers: [],
      responsibleMembers: ["Pastor Johnson", "Associate Pastors"]
    },
    { 
      id: 4, 
      title: "Bible Study", 
      date: new Date(), 
      type: "classes",
      startTime: "18:30",
      endTime: "20:00",
      time: "6:30 PM - 8:00 PM",
      location: "Classroom 3",
      description: "Weekly Bible study on the Book of Romans",
      attendees: 15,
      maxAttendees: 30,
      price: 0,
      visibility: "public",
      status: "confirmed",
      createdBy: "Elder Smith",
      hasCheckin: true,
      registeredUsers: [],
      responsibleMembers: ["Elder Smith"]
    },
  ];

  // Filter events based on selected types
  const filteredEvents = useMemo(() => 
    allEvents.filter(event => selectedTypes.includes(event.type)),
    [selectedTypes]
  );
  
  const getTypeColor = (type: CalendarItemType) => {
    switch(type) {
      case 'events':
        return "bg-church-accent text-white"; // Bright sky blue
      case 'birthdays':
        return "bg-[#D946EF] text-white"; // Magenta pink
      case 'appointments':
        return "bg-[#F97316] text-white"; // Bright orange
      case 'classes':
        return "bg-[#0EA5E9] text-white"; // Ocean blue
      default:
        return "bg-muted";
    }
  };

  const handleTypeToggle = (type: CalendarItemType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground mt-1">
                View and manage all church activities
              </p>
            </div>
          </div>

          <Card className="border-border">
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
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter Items
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleTypeToggle('events')}
                        className={cn(
                          "flex items-center gap-2",
                          selectedTypes.includes('events') && "bg-accent"
                        )}
                      >
                        <Badge variant="secondary" className={getTypeColor('events')}>
                          Events
                        </Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTypeToggle('birthdays')}
                        className={cn(
                          "flex items-center gap-2",
                          selectedTypes.includes('birthdays') && "bg-accent"
                        )}
                      >
                        <Badge variant="secondary" className={getTypeColor('birthdays')}>
                          Birthdays
                        </Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTypeToggle('appointments')}
                        className={cn(
                          "flex items-center gap-2",
                          selectedTypes.includes('appointments') && "bg-accent"
                        )}
                      >
                        <Badge variant="secondary" className={getTypeColor('appointments')}>
                          Appointments
                        </Badge>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleTypeToggle('classes')}
                        className={cn(
                          "flex items-center gap-2",
                          selectedTypes.includes('classes') && "bg-accent"
                        )}
                      >
                        <Badge variant="secondary" className={getTypeColor('classes')}>
                          Classes
                        </Badge>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                  events={filteredEvents}
                  selectedDate={selectedDate || new Date()} 
                  onSelectDate={setSelectedDate}
                  onAddEvent={() => {}}
                />
              )}
              
              {calendarViewMode === 'week' && (
                <WeekCalendarView 
                  events={filteredEvents}
                  selectedDate={selectedDate || new Date()}
                  onSelectEvent={() => {}}
                  onAddEvent={() => {}}
                />
              )}
              
              {calendarViewMode === 'day' && (
                <DayCalendarView 
                  events={filteredEvents}
                  selectedDate={selectedDate || new Date()}
                  onSelectEvent={() => {}}
                  onAddEvent={() => {}}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Calendar;
