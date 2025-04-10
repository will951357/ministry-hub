
import { format } from "date-fns";
import { Appointment, AppointmentType, appointmentTypes } from "@/types/appointment";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface AppointmentTableProps {
  appointments: Appointment[];
  filterType?: string;
}

export function AppointmentTable({ appointments, filterType }: AppointmentTableProps) {
  const filtered = filterType && filterType !== "all"
    ? appointments.filter(app => app.type === filterType)
    : appointments;
  
  const handleCompletedToggle = (id: number, isCompleted: boolean) => {
    console.log(`Appointment ${id} marked as ${isCompleted ? 'completed' : 'not completed'}`);
    // In a real app, you would call an API to update the appointment status
  };
  
  if (filtered.length === 0) {
    const emptyMessage = filterType && filterType !== "all"
      ? `No ${appointmentTypes[filterType as AppointmentType].label.toLowerCase()} for this date.`
      : "No appointments for this date.";
    
    return (
      <div className="text-center py-8">
        <p className="text-church-secondary">{emptyMessage}</p>
        <Button variant="outline" className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Create Appointment
        </Button>
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
          <TableHead>Member</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Completed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{format(appointment.date, 'h:mm a')}</TableCell>
            <TableCell>{appointment.title}</TableCell>
            <TableCell>
              <Badge 
                variant={appointmentTypes[appointment.type].color}
              >
                {appointmentTypes[appointment.type].label}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                {appointment.memberName || "Unknown"}
              </div>
            </TableCell>
            <TableCell>{appointment.location}</TableCell>
            <TableCell className="capitalize">{appointment.status}</TableCell>
            <TableCell>
              <Switch 
                checked={appointment.completed || false}
                onCheckedChange={(checked) => handleCompletedToggle(appointment.id, checked)}
                aria-label="Toggle appointment completion"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
