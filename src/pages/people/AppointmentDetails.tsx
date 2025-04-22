
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { appointments } from "@/data/appointments";
import { appointmentTypes } from "@/types/appointment";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const appointment = appointments.find(a => a.id === Number(id));
  const [observation, setObservation] = useState(appointment?.observation || "");

  if (!appointment) {
    return (
      <div className="text-center py-8">
        <p>Appointment not found</p>
        <Button variant="outline" onClick={() => navigate("/people/appointments")} className="mt-4">
          Back to Appointments
        </Button>
      </div>
    );
  }

  const handleSaveObservation = () => {
    // In a real app, this would make an API call
    console.log("Saving observation:", observation);
    toast({
      title: "Observation saved",
      description: "The appointment observation has been updated."
    });
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 p-0 h-auto"
          onClick={() => navigate("/people/appointments")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-church-primary">{appointment.title}</h1>
          <p className="text-church-secondary">Appointment Details</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{format(appointment.date, "PPP")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {format(appointment.date, "p")} at {appointment.location}
              </p>
            </div>
            <Badge variant={appointmentTypes[appointment.type].color}>
              {appointmentTypes[appointment.type].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Location Detail */}
          <div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-sm text-muted-foreground">{appointment.location}</p>
          </div>

          {/* Solicitation/Member info */}
          <div>
            <h3 className="font-semibold mb-1">Solicited By</h3>
            <p className="text-sm text-muted-foreground">
              {appointment.memberName ? appointment.memberName : <span className="text-destructive">Not specified</span>}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Assignment</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {appointment.assignedMember ? (
                <>
                  Assigned to: {appointment.assignedMember}
                </>
              ) : (
                <>
                  <span>No member assigned</span>
                  <Button
                    size="sm"
                    className="ml-2"
                    variant="outline"
                    onClick={() => {
                      // Future: open member selection modal/dialog here
                      toast({ title: "Not yet implemented", description: "Member selection will be available soon." });
                    }}
                  >
                    Choose Member
                  </Button>
                </>
              )}
            </p>
            {appointment.isVolunteerWork && (
              <Badge variant="outline" className="mt-2">Volunteer Work</Badge>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Observation</h3>
            <Textarea
              placeholder="Add notes about the appointment completion..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="min-h-[150px]"
            />
            <Button onClick={handleSaveObservation} className="mt-2">
              Save Observation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
