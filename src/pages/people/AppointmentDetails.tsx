
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
import ChooseMemberDialog from "./ChooseMemberDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AssignedMemberChip from "./AssignedMemberChip"; // new component

interface AssignedMember {
  name: string;
  email: string;
  photo: string;
}

export default function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const appointmentData = appointments.find(a => a.id === Number(id));
  const [observation, setObservation] = useState(appointmentData?.observation || "");
  // Multiple members assignment
  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>(
    appointmentData?.assignedMember && typeof appointmentData.assignedMember === "object"
      ? [appointmentData.assignedMember as AssignedMember]
      : []
  );
  const [openMemberDialog, setOpenMemberDialog] = useState(false);

  if (!appointmentData) {
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
    console.log("Saving observation:", observation);
    toast({
      title: "Saved",
      description: "The appointment changes have been updated."
    });
  };

  const handleChooseMember = (member: AssignedMember) => {
    // Add only if not already assigned
    if (!assignedMembers.some(m => m.email === member.email)) {
      setAssignedMembers(prev => [...prev, member]);
      toast({
        title: "Member assigned",
        description: `${member.name} has been assigned to the appointment.`,
      });
    }
  };

  const handleRemoveMember = (email: string) => {
    setAssignedMembers(prev => prev.filter(m => m.email !== email));
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
          <h1 className="text-2xl font-semibold text-church-primary">{appointmentData.title}</h1>
          <p className="text-church-secondary">Appointment Details</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{format(appointmentData.date, "PPP")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {format(appointmentData.date, "p")} at {appointmentData.location}
              </p>
            </div>
            <Badge variant={appointmentTypes[appointmentData.type].color}>
              {appointmentTypes[appointmentData.type].label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Location</h3>
            <p className="text-sm text-muted-foreground">{appointmentData.location}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Member Message</h3>
            <p className="text-sm text-muted-foreground">
              {appointmentData.message
                ? appointmentData.message
                : <span className="italic text-muted-foreground">No message provided</span>
              }
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Solicited By</h3>
            <p className="text-sm text-muted-foreground">
              {appointmentData.memberName ? appointmentData.memberName : <span className="text-destructive">Not specified</span>}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Assignment</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 items-center">
                {assignedMembers.length > 0 ? (
                    assignedMembers.map(member => (
                      <AssignedMemberChip 
                        key={member.email}
                        member={member}
                        onRemove={() => handleRemoveMember(member.email)}
                      />
                    ))
                  ) : (
                    <span>No member assigned</span>
                  )
                }
                <Button
                  size="sm"
                  className="ml-1"
                  variant="outline"
                  onClick={() => setOpenMemberDialog(true)}
                >
                  {assignedMembers.length > 0 ? "Add Member" : "Choose Member"}
                </Button>
                <ChooseMemberDialog
                  open={openMemberDialog}
                  onOpenChange={setOpenMemberDialog}
                  onChoose={handleChooseMember}
                  alreadyChosenEmails={assignedMembers.map(m => m.email)}
                  allowMultiple
                />
              </div>
              {appointmentData.isVolunteerWork && (
                <Badge variant="outline" className="mt-2">Volunteer Work</Badge>
              )}
            </div>
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
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

