
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Kid {
  id: string;
  name: string;
  parent: string;
  birthDate: string;
  contactOption: string;
  alimentaryRestriction: string;
  specialNecessities: string;
  identificationPassword: string;
  addedDate: string;
}

export default function KidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // For this example, we'll use the same mock data
  // In a real app, this would come from an API or database
  const kid: Kid | undefined = {
    id: "1",
    name: "John Smith Jr.",
    parent: "John Smith",
    birthDate: "2018-05-15",
    contactOption: "555-1234",
    alimentaryRestriction: "Peanut allergy",
    specialNecessities: "None",
    identificationPassword: "JOHN2018",
    addedDate: "2023-01-10"
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: `Push notification sent to parent of ${kid?.name}.`
    });
  };

  if (!kid) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-2xl font-semibold mb-2">Kid not found</h2>
          <Button onClick={() => navigate("/people/kids")}>Return to Kids List</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Back button and header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/people/kids")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-church-primary">Details</h1>
      </div>

      {/* Line 1: Child's name and age */}
      <div className="flex flex-col items-baseline gap-3">
        <h1 className="text-3xl font-bold">{kid.name}</h1>
        <span className="text-xl text-muted-foreground">
          {calculateAge(kid.birthDate)} years old
        </span>
      </div>

      {/* Line 2: Parent information */}
      <div className="flex items-center gap-6 py-4 border-y">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {kid.parent.charAt(0)}
        </div>
        <div className="space-y-1">
          <h2 className="font-semibold">{kid.parent}</h2>
          <div className="text-sm text-muted-foreground space-x-4">
            <span>{kid.contactOption}</span>
          </div>
        </div>
      </div>

      {/* Line 3: Dietary restrictions and special needs */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-2">Dietary Restrictions</h3>
          <p className="text-muted-foreground">
            {kid.alimentaryRestriction || "None"}
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Special Needs</h3>
          <p className="text-muted-foreground">
            {kid.specialNecessities || "None"}
          </p>
        </div>
      </div>

      {/* Line 4: Notification button */}
      <div>
        <Button onClick={handleSendNotification} className="gap-2">
          <Send className="h-4 w-4" />
          Send Notification to Parent
        </Button>
      </div>
    </div>
  );
}
