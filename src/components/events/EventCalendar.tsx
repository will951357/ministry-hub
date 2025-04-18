
import React from 'react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
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
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="w-full bg-background rounded-lg border">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className={cn("w-full")}
        components={{
          Day: ({ date, ...props }) => {
            const dateEvents = getEventsForDate(date);
            const hasEvents = dateEvents.length > 0;

            return (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative w-full h-full group">
                      <div
                        {...props}
                        className={cn(
                          "w-full h-full p-2 hover:bg-accent/50 transition-colors",
                          hasEvents && "font-medium",
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-sm">{format(date, 'd')}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddEvent(date);
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {hasEvents && (
                          <div className="mt-1 space-y-1">
                            {dateEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                className="text-xs p-1 rounded bg-primary/10 truncate"
                              >
                                {event.title}
                              </div>
                            ))}
                            {dateEvents.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{dateEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  {hasEvents && (
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
          },
        }}
      />
    </div>
  );
}
