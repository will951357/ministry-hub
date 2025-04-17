import { useState } from "react";
import { format, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { Filter, Plus, CalendarIcon } from "lucide-react";
import { appointments } from "@/data/appointments";
import { appointmentTypes } from "@/types/appointment";
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { AppointmentTable } from "@/components/appointments/AppointmentTable";
import { AppointmentHeader } from "@/components/appointments/AppointmentHeader";
import { PendingAppointments } from "@/components/appointments/PendingAppointments";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
export default function Appointments() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<string>("all");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Filter appointments based on selected month
  const filteredAppointments = appointments.filter(appointment => {
    const sameMonth = isSameMonth(appointment.date, date);
    return (view === "all" || appointment.type === view) && sameMonth;
  });

  // Get pending appointments
  const pendingAppointments = appointments.filter(appointment => appointment.status === "pending");

  // Get incomplete appointments count
  const incompleteAppointments = appointments.filter(appointment => appointment.status === "confirmed" && !appointment.completed);

  // Handle creating a new appointment
  const handleCreateAppointment = () => {
    navigate("/people/appointments/create");
  };
  return <div>
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
          <Button onClick={handleCreateAppointment}>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>
      
      {/* Pending Appointments Section */}
      {pendingAppointments.length > 0 && <Card className="mb-6 border-church-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Waiting for Approval</CardTitle>
            <CardDescription>
              {pendingAppointments.length} appointment{pendingAppointments.length !== 1 ? 's' : ''} pending your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PendingAppointments appointments={pendingAppointments} />
          </CardContent>
        </Card>}

      {/* Incomplete Appointments Counter - Now with better vertical alignment */}
      <Card className="mb-6 border-church-border shadow-sm">
        <CardHeader className="pb-2 flex flex-row items-center justify-between mx-0 my-0 py-[3px] px-[20px]">
          <div>
            <CardTitle className="text-lg font-medium">Appointments Not Completed</CardTitle>
            <CardDescription>
              {incompleteAppointments.length} appointment{incompleteAppointments.length !== 1 ? 's' : ''} need your attention
            </CardDescription>
          </div>
          <div className="bg-amber-100 text-amber-800 rounded-full px-4 py-2 text-xl font-semibold flex items-center self-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            {incompleteAppointments.length}
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid md:grid-cols-4 gap-6">
        {/* Left sidebar with calendar - improving responsiveness */}
        {!isMobile && <Card className="md:col-span-1 border-church-border h-fit shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Calendar</CardTitle>
              <CardDescription>Select a month to view appointments</CardDescription>
            </CardHeader>
            <CardContent className="px-2 pb-6">
              <div className="max-w-full overflow-x-auto">
                <AppointmentCalendar selectedDate={date} appointments={appointments} onDateSelect={setDate} viewMode="month" />
              </div>
            </CardContent>
          </Card>}
        
        {/* Main content area */}
        <Card className={`${isMobile ? "col-span-full" : "md:col-span-3"} border-church-border shadow-sm`}>
          <CardHeader className="pb-2">
            <AppointmentHeader date={date} appointmentCount={filteredAppointments.length} onDateSelect={setDate} viewMode="month" showMonthNavigation={isMobile} />
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
              
              {Object.keys(appointmentTypes).map(type => <TabsContent key={type} value={type}>
                  <AppointmentTable appointments={filteredAppointments} filterType={type} />
                </TabsContent>)}
              
              <TabsContent value="all">
                <AppointmentTable appointments={filteredAppointments} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
}