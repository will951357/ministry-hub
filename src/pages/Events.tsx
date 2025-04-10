import React, { useState } from 'react';
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";

type Event = {
  date: Date;
  title: string;
  description: string;
};

const Events = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleAddEvent = () => {
    if (date && title && description) {
      const newEvent: Event = {
        date: date,
        title: title,
        description: description,
      };
      setEvents([...events, newEvent]);
      setTitle('');
      setDescription('');
      setIsAddingEvent(false);
    }
  };

  const hasEvents = (dateToCheck: Date): boolean => {
    return events.some(event =>
      event.date.toDateString() === dateToCheck.toDateString()
    );
  };

  let day = date ? date.getDate() : '';
  let month = date ? date.toLocaleString('default', { month: 'long' }) : '';

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? day + ", " + month : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              {date && (
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button onClick={handleAddEvent}>Add Event</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Events on {date ? day + ", " + month : 'Selected date'}</CardTitle>
              <CardDescription>List of events for the selected date.</CardDescription>
            </CardHeader>
            <CardContent>
              {events.filter(event => event.date.toDateString() === date?.toDateString()).length > 0 ? (
                <ul>
                  {events.filter(event => event.date.toDateString() === date?.toDateString()).map((event, index) => (
                    <li key={index} className="mb-4">
                      <h3 className="font-semibold">{event.title}</h3>
                      <p>{event.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No events on this day.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
