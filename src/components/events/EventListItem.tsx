
import React from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign, EyeOff, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type EventUser = {
  id: number;
  name: string;
  email: string;
  checkedIn: boolean;
};

type EventItemProps = {
  event: {
    id: number;
    title: string;
    date: Date;
    time: string;
    location: string;
    attendees: number;
    maxAttendees: number;
    price: number;
    visibility: 'public' | 'private';
    status: string;
    hasCheckin: boolean;
    description: string;
    registeredUsers: EventUser[];
    responsibleMembers: string[];
  };
  onViewDetails: (event: EventItemProps['event']) => void;
};

export function EventListItem({
  event,
  onViewDetails,
}: EventItemProps) {
  return (
    <div className="flex items-start space-x-4 rounded-md border p-3 transition-all hover:bg-muted/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-church-accent/10 text-church-accent">
        <Calendar />
      </div>
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium leading-none">
            {event.title}
            {event.visibility === 'private' && (
              <EyeOff className="h-3 w-3 inline ml-1 text-muted-foreground" />
            )}
            {event.hasCheckin && (
              <Check className="h-3 w-3 inline ml-1 text-green-600" />
            )}
          </p>
          <div className="flex gap-1">
            {event.price === 0 ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Free
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                ${event.price}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex text-sm text-muted-foreground items-center">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          <span>{format(event.date, "MMMM d, yyyy")}</span>
        </div>
        
        <div className="flex text-sm text-muted-foreground items-center">
          <Clock className="mr-1 h-3.5 w-3.5" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex text-sm text-muted-foreground items-center">
          <MapPin className="mr-1 h-3.5 w-3.5" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex text-sm text-muted-foreground items-center">
          <Users className="mr-1 h-3.5 w-3.5" />
          <span>{event.attendees}/{event.maxAttendees} attendees</span>
        </div>

        <div className="flex mt-2 pt-2 border-t justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8" 
            onClick={() => onViewDetails(event)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" /> Event Details
          </Button>
        </div>
      </div>
    </div>
  );
}
