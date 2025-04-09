
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarCheck,
  Users,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  DollarSign,
  Filter,
  Plus,
  Check,
  Tag
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Define the Event type
type EventType = "member" | "community";
type EventStatus = "upcoming" | "past" | "cancelled";

interface Event {
  id: number;
  name: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  confirmedPersons: number;
  type: EventType;
  isPaid: boolean;
  price?: number;
  status: EventStatus;
}

// Mock data for events
const EVENTS_DATA: Event[] = [
  {
    id: 1,
    name: "Sunday Service",
    description: "Weekly Sunday worship service for the entire congregation.",
    date: new Date(2025, 3, 13), // April 13, 2025
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    confirmedPersons: 120,
    type: "community",
    isPaid: false,
    status: "upcoming"
  },
  {
    id: 2,
    name: "Youth Group Meeting",
    description: "Weekly gathering for teenagers to socialize and learn together.",
    date: new Date(2025, 3, 14), // April 14, 2025
    time: "6:30 PM - 8:30 PM",
    location: "Youth Center",
    confirmedPersons: 35,
    type: "member",
    isPaid: false,
    status: "upcoming"
  },
  {
    id: 3,
    name: "Women's Retreat",
    description: "A weekend retreat for women to relax, reflect, and grow in faith.",
    date: new Date(2025, 4, 10), // May 10, 2025
    time: "All Day",
    location: "Mountain Retreat Center",
    confirmedPersons: 45,
    type: "member",
    isPaid: true,
    price: 75,
    status: "upcoming"
  },
  {
    id: 4,
    name: "Community Outreach",
    description: "Serving food and providing essentials to homeless individuals in our community.",
    date: new Date(2025, 3, 20), // April 20, 2025
    time: "9:00 AM - 1:00 PM",
    location: "Downtown Community Center",
    confirmedPersons: 28,
    type: "community",
    isPaid: false,
    status: "upcoming"
  },
  {
    id: 5,
    name: "Leadership Conference",
    description: "Annual conference for church leaders focused on growth and development.",
    date: new Date(2025, 5, 5), // June 5, 2025
    time: "9:00 AM - 5:00 PM",
    location: "Conference Hall",
    confirmedPersons: 75,
    type: "member",
    isPaid: true,
    price: 120,
    status: "upcoming"
  },
  {
    id: 6,
    name: "Easter Service",
    description: "Special Easter celebration service with music, drama, and message.",
    date: new Date(2025, 3, 6), // April 6, 2025 (past)
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    confirmedPersons: 200,
    type: "community",
    isPaid: false,
    status: "past"
  }
];

export default function Events() {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filters, setFilters] = useState({
    type: "all",
    isPaid: "all",
    status: "upcoming"
  });

  // Filter events based on selected filters
  const filteredEvents = EVENTS_DATA.filter(event => {
    return (
      (filters.type === "all" || event.type === filters.type) &&
      (filters.isPaid === "all" || 
        (filters.isPaid === "paid" && event.isPaid) || 
        (filters.isPaid === "free" && !event.isPaid)) &&
      (filters.status === "all" || event.status === filters.status)
    );
  });

  // Events for the selected date in calendar
  const eventsForSelectedDate = selectedDate 
    ? EVENTS_DATA.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setShowDetailsDialog(true);
  };

  // Function to highlight dates with events in the calendar
  const isDayWithEvent = (day: Date) => {
    return EVENTS_DATA.some(event => 
      day.getDate() === event.date.getDate() &&
      day.getMonth() === event.date.getMonth() &&
      day.getFullYear() === event.date.getFullYear()
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-church-primary mb-2">Events</h1>
          <p className="text-church-secondary">
            Manage and organize upcoming church events and activities.
          </p>
        </div>

        {/* Calendar section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full pointer-events-auto"
                  modifiersStyles={{
                    selected: {
                      backgroundColor: "var(--primary)",
                      color: "white"
                    }
                  }}
                  modifiers={{
                    withEvents: (date) => isDayWithEvent(date)
                  }}
                  styles={{
                    day_withEvents: { 
                      fontWeight: "bold",
                      border: "2px solid var(--primary)",
                      borderRadius: "4px"
                    }
                  }}
                />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-medium mb-3">
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}
                </h3>
                
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-3">
                    {eventsForSelectedDate.map(event => (
                      <div 
                        key={event.id}
                        className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleViewDetails(event)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{event.name}</h4>
                          <Badge variant={event.type === "member" ? "secondary" : "default"}>
                            {event.type === "member" ? "Member" : "Community"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No events scheduled for this date
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Create Button */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="flex flex-wrap gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 space-y-4" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium">Event Type</h4>
                  <Select
                    defaultValue={filters.type}
                    onValueChange={(value) => setFilters({...filters, type: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Payment</h4>
                  <Select
                    defaultValue={filters.isPaid}
                    onValueChange={(value) => setFilters({...filters, isPaid: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <Select
                    defaultValue={filters.status}
                    onValueChange={(value) => setFilters({...filters, status: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="past">Past</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Quick filter badges */}
            <Button 
              variant={filters.type === "member" ? "default" : "outline"} 
              size="sm"
              className="h-9"
              onClick={() => setFilters({...filters, type: filters.type === "member" ? "all" : "member"})}
            >
              <Users className="mr-2 h-4 w-4" />
              Member Events
            </Button>
            
            <Button 
              variant={filters.type === "community" ? "default" : "outline"} 
              size="sm"
              className="h-9"
              onClick={() => setFilters({...filters, type: filters.type === "community" ? "all" : "community"})}
            >
              <Users className="mr-2 h-4 w-4" />
              Community Events
            </Button>
            
            <Button 
              variant={filters.isPaid === "paid" ? "default" : "outline"} 
              size="sm"
              className="h-9"
              onClick={() => setFilters({...filters, isPaid: filters.isPaid === "paid" ? "all" : "paid"})}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Paid Events
            </Button>
          </div>
          
          <Button onClick={() => toast({ title: "Coming Soon", description: "Event creation will be available in the next update." })}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                event.status === "past" ? "opacity-75" : ""
              }`}
              onClick={() => handleViewDetails(event)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.name}</CardTitle>
                  <Badge variant={event.type === "member" ? "secondary" : "default"}>
                    {event.type === "member" ? "Member" : "Community"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{format(event.date, "MMMM d, yyyy")}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-1 text-sm">
                      <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                      <span>{event.confirmedPersons} confirmed</span>
                    </div>
                    
                    {event.isPaid ? (
                      <Badge variant="secondary" className="flex items-center">
                        <DollarSign className="h-3.5 w-3.5 mr-1" />
                        ${event.price?.toFixed(2)}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Free</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No events match your current filters.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({ type: "all", isPaid: "all", status: "upcoming" })}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Event Details Dialog */}
        {selectedEvent && (
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedEvent.name}</span>
                  <Badge variant={selectedEvent.type === "member" ? "secondary" : "default"}>
                    {selectedEvent.type === "member" ? "Member" : "Community"}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{format(selectedEvent.date, "MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Confirmed</p>
                      <p className="font-medium">{selectedEvent.confirmedPersons}</p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                    <Tag className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="font-medium capitalize">{selectedEvent.type}</p>
                    </div>
                  </div>
                </div>

                {selectedEvent.isPaid && (
                  <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Event Fee</p>
                      <p className="font-medium">${selectedEvent.price?.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline">
                  <Check className="mr-2 h-4 w-4" />
                  Manage Attendees
                </Button>
                <Button>
                  Edit Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  );
}
