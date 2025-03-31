
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Example events data
const events = [
  {
    id: 1,
    title: 'Sunday Service',
    date: '2023-10-15',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
  },
  {
    id: 2,
    title: 'Youth Group',
    date: '2023-10-15',
    time: '6:00 PM - 8:00 PM',
    location: 'Youth Center',
  },
  {
    id: 3,
    title: 'Prayer Meeting',
    date: '2023-10-18',
    time: '7:00 PM - 8:30 PM',
    location: 'Chapel',
  },
  {
    id: 4,
    title: 'Bible Study',
    date: '2023-10-19',
    time: '6:30 PM - 8:00 PM',
    location: 'Fellowship Hall',
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
              <div className="space-y-1">
                <p className="font-medium leading-none">{event.title}</p>
                <div className="flex text-sm text-muted-foreground items-center">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex text-sm text-muted-foreground items-center">
                  <MapPin className="mr-1 h-3.5 w-3.5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
