
import { Calendar, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Event } from '@/types/event';

interface EventStatsProps {
  events: Event[];
}

export function EventStats({ events }: EventStatsProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const monthEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  const totalRegistrations = events.reduce((acc, event) => acc + event.attendees, 0);
  const totalRevenue = events.reduce((acc, event) => acc + (event.price * event.attendees), 0);

  const publicEvents = upcomingEvents.filter(event => event.visibility === 'public').length;
  const privateEvents = upcomingEvents.filter(event => event.visibility === 'private').length;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
              <h3 className="mt-2 text-2xl font-semibold">{upcomingEvents.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {publicEvents} public • {privateEvents} private
              </p>
            </div>
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Events</p>
              <h3 className="mt-2 text-2xl font-semibold">{monthEvents.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {totalRegistrations} registrations
              </p>
            </div>
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Revenue</p>
              <h3 className="mt-2 text-2xl font-semibold">${totalRevenue.toFixed(2)}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                From {totalRegistrations} registrations
              </p>
            </div>
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
