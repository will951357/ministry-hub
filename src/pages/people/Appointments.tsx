
import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Filter, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample appointment data
const appointments = [
  {
    id: 1,
    title: "Home Visit - Johnson Family",
    type: "visit",
    date: new Date(2025, 3, 5, 10, 0),
    location: "123 Main St",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Prayer Meeting - Hospital",
    type: "prayer",
    date: new Date(2025, 3, 5, 14, 30),
    location: "Memorial Hospital, Room 305",
    status: "pending",
  },
  {
    id: 3,
    title: "Youth Worship Practice",
    type: "worship",
    date: new Date(2025, 3, 6, 18, 0),
    location: "Church Sanctuary",
    status: "confirmed",
  },
  {
    id: 4,
    title: "Food Bank Volunteer",
    type: "social",
    date: new Date(2025, 3, 8, 9, 0),
    location: "Community Center",
    status: "confirmed",
  },
  {
    id: 5,
    title: "Counseling Session - Smith",
    type: "visit",
    date: new Date(2025, 3, 10, 13, 0),
    location: "Pastor's Office",
    status: "confirmed",
  }
];

// Appointment types with colors
const appointmentTypes = {
  visit: { label: "Visits", color: "default" },
  prayer: { label: "Prayers", color: "secondary" },
  worship: { label: "Worship Services", color: "destructive" },
  social: { label: "Social Actions", color: "outline" }
};

export default function Appointments() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<string>("all");
  
  // Filter appointments based on selected date and view
  const filteredAppointments = appointments.filter(appointment => {
    const sameDay = appointment.date.getDate() === date.getDate() && 
                    appointment.date.getMonth() === date.getMonth() &&
                    appointment.date.getFullYear() === date.getFullYear();
                    
    return (view === "all" || appointment.type === view) && sameDay;
  });
  
  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(appointment.date, date)
    );
  };
  
  // Custom day render for calendar with hover info
  const renderCalendarDay = (day: Date, cellProps: any) => {
    const dayAppointments = getAppointmentsForDate(day);
    const hasAppointments = dayAppointments.length > 0;
    
    if (!hasAppointments) {
      return <div>{day.getDate()}</div>;
    }
    
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="relative flex items-center justify-center">
            {day.getDate()}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="h-1 w-1 rounded-full bg-primary"></div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-0">
          <div className="p-3">
            <h4 className="font-semibold">{format(day, 'MMMM d, yyyy')}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-1">
              {dayAppointments.map((apt) => (
                <div key={apt.id} className="text-sm p-2 rounded-md bg-muted flex items-center justify-between">
                  <div>
                    <p className="font-medium">{apt.title}</p>
                    <p className="text-xs">{format(apt.date, 'h:mm a')} | {apt.location}</p>
                  </div>
                  <Badge variant={appointmentTypes[apt.type as keyof typeof appointmentTypes].color as any}>
                    {apt.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-church-primary">Appointments</h1>
          <p className="text-church-secondary">
            Schedule and manage pastoral appointments and meetings.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-4 gap-6">
        {/* Left sidebar with calendar */}
        <Card className="md:col-span-1 border-church-border">
          <CardHeader>
            <CardTitle className="text-lg">Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md pointer-events-auto"
              components={{
                Day: ({ day, ...props }) => renderCalendarDay(day, props)
              }}
            />
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Appointment Types</h3>
              <div className="flex flex-col space-y-2">
                {Object.entries(appointmentTypes).map(([key, { label, color }]) => (
                  <div key={key} className="flex items-center">
                    <Badge variant={color as any} className="mr-2 w-3 h-3 p-0" />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content area */}
        <Card className="md:col-span-3 border-church-border">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Appointments for {format(date, 'MMMM d, yyyy')}</CardTitle>
                <CardDescription>
                  {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(date, 'MMM d, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          
          <CardContent className="pt-2">
            <Tabs defaultValue="all" className="w-full" onValueChange={setView}>
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="visit">Visits</TabsTrigger>
                <TabsTrigger value="prayer">Prayers</TabsTrigger>
                <TabsTrigger value="worship">Worship</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              
              {Object.keys(appointmentTypes).map((type) => (
                <TabsContent key={type} value={type}>
                  {renderAppointmentsTable(filteredAppointments, type)}
                </TabsContent>
              ))}
              
              <TabsContent value="all">
                {renderAppointmentsTable(filteredAppointments)}
              </TabsContent>
            </Tabs>
            
            {filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-church-secondary">No appointments for this date.</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to render appointments table
function renderAppointmentsTable(appointments: any[], filterType?: string) {
  const filtered = filterType 
    ? appointments.filter(app => app.type === filterType)
    : appointments;
  
  if (filtered.length === 0 && filterType) {
    return (
      <div className="text-center py-8">
        <p className="text-church-secondary">No {appointmentTypes[filterType as keyof typeof appointmentTypes].label.toLowerCase()} for this date.</p>
      </div>
    );
  }
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{format(appointment.date, 'h:mm a')}</TableCell>
            <TableCell>{appointment.title}</TableCell>
            <TableCell>
              <Badge 
                variant={appointmentTypes[appointment.type as keyof typeof appointmentTypes].color as any}
              >
                {appointmentTypes[appointment.type as keyof typeof appointmentTypes].label}
              </Badge>
            </TableCell>
            <TableCell>{appointment.location}</TableCell>
            <TableCell className="capitalize">{appointment.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
