import React from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Event } from '@/types/event';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DayCalendarViewProps {
  events: Event[];
  selectedDate: Date;
  onSelectEvent: (event: Event) => void;
  onAddEvent: (date: Date, hour: number) => void;
}

export function DayCalendarView({ events, selectedDate, onSelectEvent }: DayCalendarViewProps) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState<number | null>(null);
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  const handleAddClick = (hour: number) => {
    setSelectedHour(hour);
    setIsDialogOpen(true);
  };

  const handleCreateOption = (type: 'event' | 'appointment') => {
    if (selectedHour === null) return;
    
    const dateWithHour = new Date(selectedDate);
    dateWithHour.setHours(selectedHour, 0, 0, 0);
    
    if (type === 'event') {
      navigate('/events/create', { 
        state: { 
          date: dateWithHour,
          startTime: `${String(selectedHour).padStart(2, '0')}:00`
        } 
      });
    } else {
      navigate('/people/appointments/create', { 
        state: { 
          date: dateWithHour,
          time: `${String(selectedHour).padStart(2, '0')}:00`
        } 
      });
    }
    setIsDialogOpen(false);
  };
  
  // Filter events for the selected day
  const dayEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() && 
           eventDate.getMonth() === selectedDate.getMonth() && 
           eventDate.getFullYear() === selectedDate.getFullYear();
  });
  
  return (
    <>
      <div className="rounded-lg border border-border">
        <div className="py-3 px-4 border-b text-center">
          <h3 className="text-lg font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
        </div>
        
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            {hoursOfDay.map((hour) => {
              // Filter events that occur during this hour
              const hourEvents = dayEvents.filter(event => {
                const eventStartHour = parseInt(event.startTime.split(':')[0]);
                const eventEndHour = parseInt(event.endTime.split(':')[0]);
                
                return eventStartHour <= hour && 
                       (eventEndHour > hour || (eventEndHour === hour && parseInt(event.endTime.split(':')[1]) > 0));
              });
              
              return (
                <div 
                  key={hour} 
                  className={cn(
                    "flex min-h-[80px] group",
                    hour % 2 === 0 ? "bg-background" : "bg-muted/10"
                  )}
                >
                  <div className="w-20 p-2 border-r text-sm text-muted-foreground flex items-start">
                    {format(setHours(new Date(), hour), 'h:00 a')}
                  </div>
                  <div className="flex-1 p-2 relative">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleAddClick(hour)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {hourEvents.map(event => {
                      const eventStart = new Date(event.date);
                      eventStart.setHours(parseInt(event.startTime.split(':')[0]));
                      eventStart.setMinutes(parseInt(event.startTime.split(':')[1] || '0'));
                      
                      // Calculate if this event starts in this hour
                      const startsThisHour = eventStart.getHours() === hour;
                      
                      if (startsThisHour) {
                        return (
                          <div 
                            key={event.id}
                            className={cn(
                              "p-2 rounded mb-1 cursor-pointer",
                              event.status === 'confirmed' ? "bg-primary text-primary-foreground" :
                              event.status === 'canceled' ? "bg-destructive/80 text-destructive-foreground" :
                              "bg-amber-500 text-white"
                            )}
                            onClick={() => onSelectEvent(event)}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs">
                              {format(eventStart, 'h:mm a')} - {event.endTime} • {event.location}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Item</AlertDialogTitle>
            <AlertDialogDescription>
              Choose what type of item you want to add to the calendar
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button 
              variant="default"
              onClick={() => handleCreateOption('event')}
            >
              Create Event
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleCreateOption('appointment')}
            >
              Create Appointment
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
