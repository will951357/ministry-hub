
import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addHours, setHours, setMinutes, isBefore, isAfter, parseISO } from 'date-fns';
import { cn } from "@/lib/utils";
import { Event } from '@/types/event';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface WeekCalendarViewProps {
  events: Event[];
  selectedDate: Date;
  onSelectEvent: (event: Event) => void;
  onAddEvent: (date: Date, hour: number) => void;
}

export function WeekCalendarView({ events, selectedDate, onSelectEvent, onAddEvent }: WeekCalendarViewProps) {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 0 });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const weekdaysLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);
  
  const renderHourCell = (day: Date, hour: number) => {
    // Filter events that occur during this hour on this day
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      const eventStart = new Date(eventDate);
      const eventStartHour = parseInt(event.startTime.split(':')[0]);
      const eventEndHour = parseInt(event.endTime.split(':')[0]);
      
      eventStart.setHours(eventStartHour);
      
      const hourStart = setHours(new Date(day), hour);
      hourStart.setMinutes(0);
      const hourEnd = setHours(new Date(day), hour + 1);
      hourEnd.setMinutes(0);
      
      return isSameDay(eventDate, day) && 
             eventStartHour <= hour && 
             (eventEndHour > hour || (eventEndHour === hour && parseInt(event.endTime.split(':')[1]) > 0));
    });
    
    return (
      <div 
        className={cn(
          "border-t border-l p-1 min-h-[60px] relative group",
          hour % 2 === 0 ? "bg-background" : "bg-muted/10"
        )}
      >
        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onAddEvent(day, hour)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {dayEvents.map(event => {
          const eventStart = setHours(
            new Date(event.date), 
            parseInt(event.startTime.split(':')[0])
          );
          eventStart.setMinutes(parseInt(event.startTime.split(':')[1] || '0'));
          
          const eventEnd = setHours(
            new Date(event.date), 
            parseInt(event.endTime.split(':')[0])
          );
          eventEnd.setMinutes(parseInt(event.endTime.split(':')[1] || '0'));
          
          // Calculate if this event starts in this hour
          const startsThisHour = eventStart.getHours() === hour;
          
          if (startsThisHour) {
            return (
              <div 
                key={event.id}
                className={cn(
                  "text-xs p-1 rounded mb-1 cursor-pointer",
                  event.status === 'confirmed' ? "bg-primary text-primary-foreground" :
                  event.status === 'canceled' ? "bg-destructive/80 text-destructive-foreground" :
                  "bg-amber-500 text-white"
                )}
                onClick={() => onSelectEvent(event)}
              >
                {format(eventStart, 'h:mm a')} - {event.title}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-border">
      <div className="grid grid-cols-8 border-b">
        <div className="py-3 px-2 text-center text-sm font-medium">
          Time
        </div>
        {daysInWeek.map((day, index) => (
          <div 
            key={day.toString()} 
            className={cn(
              "py-3 px-2 text-center text-sm font-medium border-l",
              isSameDay(day, new Date()) && "bg-accent/20"
            )}
          >
            <div>{weekdaysLabels[index]}</div>
            <div className="text-xs text-muted-foreground">{format(day, 'MMM d')}</div>
          </div>
        ))}
      </div>
      
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-8">
          {hoursOfDay.map((hour) => (
            <React.Fragment key={hour}>
              <div 
                className={cn(
                  "border-t border-r p-1 text-xs text-muted-foreground text-center",
                  hour % 2 === 0 ? "bg-background" : "bg-muted/10"
                )}
              >
                {format(setHours(new Date(), hour), 'h a')}
              </div>
              
              {daysInWeek.map((day) => (
                <React.Fragment key={`${day}-${hour}`}>
                  {renderHourCell(day, hour)}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
