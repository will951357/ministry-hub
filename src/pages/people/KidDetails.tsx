
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
    <div className="container mx-auto py-6">

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

      <h1 className="text-2xl font-bold mb-6">{kid.name}</h1>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Parent</div>
          <div>{kid.parent}</div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Birth Date</div>
          <div>{formatDate(kid.birthDate)}</div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Contact Information</div>
          <div>{kid.contactOption || "Not provided"}</div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Alimentary Restrictions</div>
          <div>{kid.alimentaryRestriction || "None"}</div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Special Necessities</div>
          <div>{kid.specialNecessities || "None"}</div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Identification Password</div>
          <div>{kid.identificationPassword}</div>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          <div className="font-medium">Added Date</div>
          <div>{formatDate(kid.addedDate)}</div>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={handleSendNotification}>
          Send Notification
        </Button>
      </div>
    </div>
  );
}
