
import { Calendar, MapPin, Clock, Users, DollarSign, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Example events data with more realistic information
const events = [
  {
    id: 1,
    title: 'Sunday Worship Service',
    date: new Date(2025, 3, 21), // April 21, 2025
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    attendees: 120,
    maxAttendees: 200,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
  },
  {
    id: 2,
    title: 'Youth Group Meeting',
    date: new Date(2025, 3, 22), // April 22, 2025
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
    attendees: 35,
    maxAttendees: 50,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
  },
  {
    id: 3,
    title: 'Prayer Meeting',
    date: new Date(2025, 3, 18), // April 18, 2025
    time: '7:00 PM - 8:30 PM',
    location: 'Chapel',
    attendees: 45,
    maxAttendees: 60,
    price: 0,
    visibility: 'public',
    status: 'confirmed',
  },
  {
    id: 4,
    title: 'Leadership Retreat (Private)',
    date: new Date(2025, 3, 25), // April 25, 2025
    time: '9:00 AM - 5:00 PM',
    location: 'Mountain Retreat Center',
    attendees: 15,
    maxAttendees: 20,
    price: 75,
    visibility: 'private',
    status: 'confirmed',
  },
];

export function EventList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start space-x-4 rounded-md border p-3 transition-all hover:bg-muted/50"
            >
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
                  </p>
                  <div>
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
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
