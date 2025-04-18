
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
        classNames={{
          months: "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "w-full space-y-4",
          caption: "relative flex items-center justify-center px-8 py-4",
          caption_label: "text-xl font-semibold text-center flex-1",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-muted"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex w-full",
          head_cell: "w-full font-medium text-muted-foreground p-3 text-center border-b",
          row: "flex w-full mt-0",
          cell: "relative w-full p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/50",
          day: cn(
            "h-32 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent/50 rounded-none border border-border"
          ),
        }}
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
                          <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
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
