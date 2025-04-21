
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
import { Eye, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppointmentTableProps {
  appointments: Appointment[];
  filterType?: string;
}

export function AppointmentTable({ appointments, filterType }: AppointmentTableProps) {
  const navigate = useNavigate();
  
  const filtered = filterType && filterType !== "all"
    ? appointments.filter(app => app.type === filterType)
    : appointments;
  
  const handleRowClick = (id: number) => {
    navigate(`/people/appointments/${id}`);
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
          <TableHead className="w-[120px]">Type</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[80px]">View</TableHead>
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
                className="h-6 inline-flex items-center"
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleRowClick(appointment.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
