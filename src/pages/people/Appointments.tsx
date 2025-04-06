
import { useState } from "react";
import { format } from "date-fns";
import { Filter, Plus } from "lucide-react";
import { appointments } from "@/data/appointments";
import { appointmentTypes } from "@/types/appointment";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { AppointmentTable } from "@/components/appointments/AppointmentTable";
import { AppointmentHeader } from "@/components/appointments/AppointmentHeader";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Appointments() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<string>("all");
  
  // Filter appointments based on selected date
  const filteredAppointments = appointments.filter(appointment => {
    const sameDay = appointment.date.getDate() === date.getDate() && 
                    appointment.date.getMonth() === date.getMonth() &&
                    appointment.date.getFullYear() === date.getFullYear();
                    
    return (view === "all" || appointment.type === view) && sameDay;
  });

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
        {/* Left sidebar with calendar - ensure it stays in its column */}
        <Card className="md:col-span-1 border-church-border h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Calendar</CardTitle>
            <CardDescription>Select a date to view appointments</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden">
            <AppointmentCalendar 
              selectedDate={date}
              appointments={appointments}
              onDateSelect={setDate}
            />
          </CardContent>
        </Card>
        
        {/* Main content area */}
        <Card className="md:col-span-3 border-church-border">
          <CardHeader className="pb-2">
            <AppointmentHeader
              date={date}
              appointmentCount={filteredAppointments.length}
              onDateSelect={setDate}
            />
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
                  <AppointmentTable 
                    appointments={filteredAppointments} 
                    filterType={type}
                  />
                </TabsContent>
              ))}
              
              <TabsContent value="all">
                <AppointmentTable appointments={filteredAppointments} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
