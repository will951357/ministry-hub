
import React from 'react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Event } from '@/types/event';

interface EventCalendarProps {
  events: Event[];
  onAddEvent: (date: Date) => void;
  onSelectDate: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
}

export function EventCalendar({ events, onAddEvent, onSelectDate, selectedDate }: EventCalendarProps) {
  const hasEvents = (date: Date) => {
    return events.some(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className={cn("rounded-md border w-full p-4")}
        components={{
          Day: ({ date, ...props }) => {
            const dateEvents = getEventsForDate(date);
            const hasDateEvents = dateEvents.length > 0;

            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative w-full">
                      <div
                        {...props}
                        className={cn(
                          props.className,
                          "relative hover:bg-muted/50 rounded-md transition-colors",
                          hasDateEvents && "font-bold text-primary",
                        )}
                      >
                        <span>{format(date, 'd')}</span>
                        {hasDateEvents && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="h-1 w-1 rounded-full bg-primary" />
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-4 w-4 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddEvent(date);
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {hasDateEvents && (
                    <TooltipContent>
                      <div className="space-y-1">
                        {dateEvents.map((event) => (
                          <div key={event.id}>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {event.time} • {event.location}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            );
          }
        }}
      />
    </div>
  );
}
