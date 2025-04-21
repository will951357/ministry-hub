import React, { useState, useMemo, useEffect } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthCalendarView } from '@/components/events/MonthCalendarView';
import { WeekCalendarView } from '@/components/events/WeekCalendarView';
import { DayCalendarView } from '@/components/events/DayCalendarView';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { useIsMobile } from "@/lib/hooks";

type CalendarItemType = 'events' | 'birthdays' | 'appointments' | 'classes';

interface CalendarEvent extends Event {
  type: CalendarItemType;
}

const sampleEvents: CalendarEvent[] = [
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
    title: "Youth Bible Study",
    date: new Date(),
    type: "classes",
    startTime: "18:30",
    endTime: "20:00",
    time: "6:30 PM - 8:00 PM",
    location: "Youth Room",
    description: "Weekly youth Bible study",
    attendees: 25,
    maxAttendees: 40,
    price: 0,
    visibility: "public",
    status: "confirmed",
    createdBy: "Youth Pastor",
    hasCheckin: true,
    registeredUsers: [],
    responsibleMembers: ["Youth Pastor", "Youth Leaders"]
  },
  {
    id: 3,
    title: "John's Birthday",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    type: "birthdays",
    startTime: "00:00",
    endTime: "23:59",
    time: "All Day",
    location: "N/A",
    description: "John's Birthday Celebration",
    attendees: 0,
    maxAttendees: 0,
    price: 0,
    visibility: "public",
    status: "confirmed",
    createdBy: "System",
    hasCheckin: false,
    registeredUsers: [],
    responsibleMembers: []
  },
  {
    id: 4,
    title: "Pastoral Visit",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    type: "appointments",
    startTime: "14:00",
    endTime: "15:00",
    time: "2:00 PM - 3:00 PM",
    location: "Smith Family Home",
    description: "Pastoral visit to Smith family",
    attendees: 1,
    maxAttendees: 1,
    price: 0,
    visibility: "private",
    status: "confirmed",
    createdBy: "Pastor Johnson",
    hasCheckin: false,
    registeredUsers: [],
    responsibleMembers: ["Pastor Johnson"]
  }
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedTypes, setSelectedTypes] = useState<CalendarItemType[]>(['events', 'birthdays', 'appointments', 'classes']);
  const [defaultView, setDefaultView] = useState<'month' | 'week' | 'day'>(useIsMobile() ? 'day' : 'month');

  const filteredEvents = useMemo(() => 
    sampleEvents.filter(event => selectedTypes.includes(event.type)),
    [selectedTypes]
  );

  const getTypeColor = (type: CalendarItemType) => {
    switch(type) {
      case 'events':
        return "bg-church-accent text-white";
      case 'birthdays':
        return "bg-[#D946EF] text-white";
      case 'appointments':
        return "bg-[#F97316] text-white";
      case 'classes':
        return "bg-[#0EA5E9] text-white";
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

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setCalendarViewMode('day');
  };

  useEffect(() => {
    setCalendarViewMode(isMobile ? 'day' : defaultView);
  }, [isMobile, defaultView]);

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="border-border">
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
                <p className="text-muted-foreground mt-1">
                  View and manage all church activities
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['events', 'birthdays', 'appointments', 'classes'] as CalendarItemType[]).map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className={cn(
                    "cursor-pointer text-xs md:text-sm",
                    getTypeColor(type),
                    !selectedTypes.includes(type) && "opacity-50"
                  )}
                  onClick={() => handleTypeToggle(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 md:px-6 py-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <Tabs
              value={calendarViewMode}
              onValueChange={(value) => setCalendarViewMode(value as 'month' | 'week' | 'day')}
              className="w-full md:w-auto"
            >
              <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1 md:flex-none justify-center"
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
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button 
                variant="outline"
                className="flex-1 md:flex-none justify-center"
                onClick={() => setSelectedDate(new Date())}
              >
                Today
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="flex-1 md:flex-none justify-center"
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
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto gap-2 justify-center"
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="hidden md:inline">{selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}</span>
                  <span className="md:hidden">{selectedDate ? format(selectedDate, 'MMM d') : 'Date'}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
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

          <div className="p-4 md:p-6">
            {calendarViewMode === 'month' && (
              <MonthCalendarView 
                events={filteredEvents as Event[]}
                selectedDate={selectedDate || new Date()} 
                onSelectDate={handleDayClick}
                onAddEvent={() => {}}
              />
            )}
            
            {calendarViewMode === 'week' && (
              <WeekCalendarView 
                events={filteredEvents as Event[]}
                selectedDate={selectedDate || new Date()}
                onSelectEvent={() => {}}
                onAddEvent={() => {}}
              />
            )}
            
            {calendarViewMode === 'day' && (
              <DayCalendarView 
                events={filteredEvents as Event[]}
                selectedDate={selectedDate || new Date()}
                onSelectEvent={() => {}}
                onAddEvent={() => {}}
              />
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Calendar;
