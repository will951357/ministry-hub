
import { format } from "date-fns";
import { CheckCircle, XCircle, User } from "lucide-react";
import { Appointment, appointmentTypes } from "@/types/appointment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface PendingAppointmentsProps {
  appointments: Appointment[];
}

export function PendingAppointments({ appointments }: PendingAppointmentsProps) {
  // Only show pending appointments
  const pendingAppointments = appointments.filter(
    appointment => appointment.status === "pending"
  );

  const handleApprove = (id: number) => {
    console.log(`Approved appointment ${id}`);
    // In a real app, you would call an API to update the appointment status
  };

  const handleDecline = (id: number) => {
    console.log(`Declined appointment ${id}`);
    // In a real app, you would call an API to update the appointment status
  };

  if (pendingAppointments.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{format(appointment.date, 'MMM d, yyyy')}</TableCell>
              <TableCell>{format(appointment.date, 'h:mm a')}</TableCell>
              <TableCell className="font-medium">{appointment.title}</TableCell>
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
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                    onClick={() => handleApprove(appointment.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleDecline(appointment.id)}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
