import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { appointments } from "@/data/appointments";
import { appointmentTypes } from "@/types/appointment";
import { AppointmentTable } from "@/components/appointments/AppointmentTable";
import { AppointmentHeader } from "@/components/appointments/AppointmentHeader";
import { PendingAppointments } from "@/components/appointments/PendingAppointments";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

export default function Appointments() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<string>("all");
  const navigate = useNavigate();

  const filteredAppointments = appointments.filter(appointment => 
    (view === "all" || appointment.type === view)
  );

  const pendingAppointments = appointments.filter(appointment => appointment.status === "pending");

  const handleDownloadAppointments = () => {
    const appointmentsData = filteredAppointments.map(apt => ({
      title: apt.title,
      type: appointmentTypes[apt.type].label,
      date: apt.date.toLocaleDateString(),
      time: apt.date.toLocaleTimeString(),
      location: apt.location,
      status: apt.status,
      memberName: apt.memberName || 'Unassigned',
      completed: apt.completed ? 'Yes' : 'No'
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(appointmentsData[0]).join(",") + "\n" +
      appointmentsData.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "church_appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAppointment = () => {
    navigate("/people/appointments/create");
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
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadAppointments}>
            <Download className="h-4 w-4 mr-2" />
            Download List
          </Button>
          <Button onClick={handleCreateAppointment}>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>
      
      {pendingAppointments.length > 0 && (
        <Card className="mb-6 border-church-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Waiting for Approval</CardTitle>
            <CardDescription>
              {pendingAppointments.length} appointment{pendingAppointments.length !== 1 ? 's' : ''} pending your approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PendingAppointments appointments={pendingAppointments} />
          </CardContent>
        </Card>
      )}
      
      <Card className="border-church-border shadow-sm">
        <CardHeader className="pb-2">
          <AppointmentHeader date={date} appointmentCount={filteredAppointments.length} onDateSelect={setDate} viewMode="month" showMonthNavigation={true} />
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
            
            {Object.keys(appointmentTypes).map(type => (
              <TabsContent key={type} value={type}>
                <AppointmentTable appointments={filteredAppointments} filterType={type} />
              </TabsContent>
            ))}
            
            <TabsContent value="all">
              <AppointmentTable appointments={filteredAppointments} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
