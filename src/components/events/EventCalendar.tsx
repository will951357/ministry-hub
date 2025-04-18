
import React from 'react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { DayPicker } from "react-day-picker";
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
    <div className="w-full p-4 bg-background rounded-lg border">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className={cn("w-full")}
        classNames={{
          months: "w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "w-full space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-colors rounded-md hover:bg-accent"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full",
          head_cell: "w-9 font-normal text-muted-foreground rounded-md",
          row: "flex w-full mt-2",
          cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent rounded-md",
          day: cn(
            "h-9 w-9 p-0 font-normal rounded-md hover:bg-accent transition-colors",
          ),
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
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
                          "relative hover:bg-muted/50 rounded-md transition-colors w-9 h-9 p-0 font-normal aria-selected:opacity-100",
                          hasDateEvents && "font-bold text-primary",
                        )}
                      >
                        <span className="flex items-center justify-center h-full">
                          {format(date, 'd')}
                        </span>
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
