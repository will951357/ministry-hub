import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { cn } from "@/lib/utils";
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

export function MonthCalendarView({ events, selectedDate, onSelectDate }: MonthCalendarViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const weekdaysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
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
              "py-2 md:py-3 text-center text-xs md:text-sm font-medium",
              index === 0 || index === 6 ? "text-muted-foreground" : ""
            )}
          >
            <span className="hidden md:inline">{day}</span>
            <span className="md:hidden">{day[0]}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 auto-rows-fr">
        {daysInMonth.map((day) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, selectedDate);
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-[80px] md:min-h-[120px] p-1 border border-border cursor-pointer",
                !isCurrentMonth && "bg-muted/20 text-muted-foreground",
                isToday(day) && "bg-accent/20",
                isSameDay(day, selectedDate) && "bg-primary/10"
              )}
              onClick={() => onSelectDate(day)}
            >
              <div className="flex justify-between items-start">
                <span className={cn(
                  "text-xs md:text-sm font-medium h-6 w-6 md:h-7 md:w-7 flex items-center justify-center",
                  isToday(day) && "text-primary rounded-full bg-accent"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, isMobile ? 1 : 2).map((event) => (
                  <TooltipProvider key={event.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "text-[10px] md:text-xs p-1 rounded truncate",
                            event.status === 'confirmed' ? "bg-primary/10 text-primary" :
                            event.status === 'canceled' ? "bg-destructive/10 text-destructive" :
                            "bg-amber-500/10 text-amber-700"
                          )}
                        >
                          <span className="hidden md:inline">{format(new Date(event.date), 'HH:mm')} </span>
                          {event.title}
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
                
                {dayEvents.length > (isMobile ? 1 : 2) && (
                  <div 
                    className="text-[10px] md:text-xs text-primary font-medium cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDate(day);
                    }}
                  >
                    +{dayEvents.length - (isMobile ? 1 : 2)} more
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
