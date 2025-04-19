
import React, { useState, useMemo } from 'react';
import { format, isSameDay } from "date-fns";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type CalendarItemType = 'events' | 'birthdays' | 'appointments' | 'classes';

const typeColors: Record<CalendarItemType, { bg: string, text: string }> = {
  events: { bg: "bg-[#9b87f5]", text: "text-white" },
  birthdays: { bg: "bg-[#FEC6A1]", text: "text-gray-900" },
  appointments: { bg: "bg-[#0EA5E9]", text: "text-white" },
  classes: { bg: "bg-[#F2FCE2]", text: "text-gray-900" }
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedTypes, setSelectedTypes] = useState<CalendarItemType[]>(['events', 'birthdays', 'appointments', 'classes']);

  // Mock data for events - this will be replaced with real data fetching later
  const mockEvents = useMemo(() => [
    {
      id: 1,
      title: "Sunday Service",
      date: new Date(),
      startTime: "10:00",
      endTime: "12:00",
      time: "10:00 AM",
      location: "Main Hall",
      description: "Weekly Sunday service",
      attendees: 120,
      maxAttendees: 200,
      price: 0,
      visibility: "public" as const,
      status: "confirmed" as const,
      createdBy: "Pastor John",
      hasCheckin: true,
      registeredUsers: [],
      responsibleMembers: ["Pastor John", "Deacon Smith"]
    },
    {
      id: 2,
      title: "Youth Group",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      startTime: "18:00",
      endTime: "20:00",
      time: "6:00 PM",
      location: "Youth Room",
      description: "Weekly youth group meeting",
      attendees: 30,
      maxAttendees: 50,
      price: 0,
      visibility: "public" as const,
      status: "confirmed" as const,
      createdBy: "Youth Pastor",
      hasCheckin: true,
      registeredUsers: [],
      responsibleMembers: ["Youth Pastor", "Volunteer A"]
    },
    {
      id: 3,
      title: "Prayer Meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "19:00",
      endTime: "20:30",
      time: "7:00 PM",
      location: "Prayer Room",
      description: "Weekly prayer meeting",
      attendees: 15,
      maxAttendees: 30,
      price: 0,
      visibility: "public" as const,
      status: "confirmed" as const,
      createdBy: "Prayer Leader",
      hasCheckin: false,
      registeredUsers: [],
      responsibleMembers: ["Prayer Leader"]
    }
  ], []);

  // Filter events based on selected types
  const filteredEvents = useMemo(() => {
    // In a real implementation, you would categorize events and filter based on type
    // For now, we'll just return all mock events if 'events' is selected
    return selectedTypes.includes('events') ? mockEvents : [];
  }, [mockEvents, selectedTypes]);

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
                        {selectedTypes.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {selectedTypes.length}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {(Object.entries(typeColors) as [CalendarItemType, typeof typeColors[keyof typeof typeColors]][]).map(([type, colors]) => (
                        <DropdownMenuItem
                          key={type}
                          onClick={() => handleTypeToggle(type)}
                          className={cn(
                            "flex items-center gap-2 capitalize",
                            selectedTypes.includes(type) && colors.bg,
                            selectedTypes.includes(type) && colors.text
                          )}
                        >
                          <div className={cn("w-3 h-3 rounded-full", colors.bg)} />
                          {type}
                        </DropdownMenuItem>
                      ))}
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
