
import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Event } from '@/types/event';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MonthCalendarViewProps {
  events: Event[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onAddEvent: (date: Date) => void;
}

export function MonthCalendarView({ events, selectedDate, onSelectDate, onAddEvent }: MonthCalendarViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add days from the previous and next months to fill a complete grid
  const weekdaysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="grid grid-cols-7 border-b">
        {weekdaysLabels.map((day, index) => (
          <div 
            key={day} 
            className={cn(
              "py-3 text-center text-sm font-medium",
              index === 0 || index === 6 ? "text-muted-foreground" : ""
            )}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 auto-rows-fr">
        {daysInMonth.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-24 p-1 border border-border relative group",
                !isCurrentMonth && "bg-muted/20 text-muted-foreground",
                isToday(day) && "bg-accent/20",
                isSameDay(day, selectedDate) && "bg-primary/10"
              )}
              onClick={() => onSelectDate(day)}
            >
              <div className="flex justify-between items-start">
                <span className={cn(
                  "text-sm font-medium h-7 w-7 flex items-center justify-center",
                  isToday(day) && "text-primary rounded-full bg-accent"
                )}>
                  {format(day, 'd')}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddEvent(day);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                {dayEvents.map((event) => (
                  <TooltipProvider key={event.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "text-xs p-1 rounded truncate",
                            event.status === 'confirmed' ? "bg-primary/10 text-primary" :
                            event.status === 'canceled' ? "bg-destructive/10 text-destructive" :
                            "bg-amber-500/10 text-amber-700"
                          )}
                        >
                          {format(new Date(event.date), 'HH:mm')} {event.title}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-xs">{format(new Date(event.date), 'h:mm a')} • {event.location}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground text-center">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
