
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewMemberForm, MemberFormValues } from "@/components/members/NewMemberForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Bell, ArrowLeft, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function EditMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call to fetch the member data
    // For now, we'll use mock data based on the ID
    const getMemberData = () => {
      setLoading(true);
      
      // Mock member data - in a real app this would come from an API
      const mockMembers = [
        {
          id: "1",
          fullName: "John Smith",
          email: "john.smith@example.com",
          phone1: "(555) 123-4567",
          phone2: "",
          cpf: "12345678901",
          birthday: new Date("1985-06-15"),
          maritalStatus: "married",
          nationality: "American",
          naturality: "New York",
          profile: "member",
          entranceDate: new Date("2020-03-10"),
          wasBaptized: "yes",
          baptismType: "immersion",
          baptismDate: new Date("2010-07-22"),
          avatar: "JS",
          image: "",
        },
        {
          id: "2",
          fullName: "Maria Garcia",
          email: "maria.garcia@example.com",
          phone1: "(555) 987-6543",
          phone2: "(555) 123-9876",
          cpf: "09876543210",
          birthday: new Date("1992-11-08"),
          maritalStatus: "single",
          nationality: "Brazilian",
          naturality: "São Paulo",
          profile: "volunteer",
          entranceDate: new Date("2019-05-20"),
          wasBaptized: "yes",
          baptismType: "sprinkling",
          baptismDate: new Date("2015-04-10"),
          avatar: "MG",
          image: "",
        },
        {
          id: "3",
          fullName: "Robert Johnson",
          email: "robert.j@example.com",
          phone1: "(555) 234-5678",
          phone2: "",
          cpf: "45678901234",
          birthday: new Date("1978-02-25"),
          maritalStatus: "divorced",
          nationality: "Canadian",
          naturality: "Toronto",
          profile: "pastor",
          entranceDate: new Date("2015-11-15"),
          wasBaptized: "yes",
          baptismType: "immersion",
          baptismDate: new Date("2000-09-05"),
          avatar: "RJ",
          image: "",
        },
        {
          id: "4",
          fullName: "Lisa Wang",
          email: "lisa.wang@example.com",
          phone1: "(555) 456-7890",
          phone2: "",
          cpf: "56789012345",
          birthday: new Date("1990-09-12"),
          maritalStatus: "single",
          nationality: "Chinese",
          naturality: "Shanghai",
          profile: "member",
          entranceDate: new Date("2021-01-30"),
          wasBaptized: "no",
          avatar: "LW",
          image: "",
        },
        {
          id: "5",
          fullName: "David Rodriguez",
          email: "david.r@example.com",
          phone1: "(555) 567-8901",
          phone2: "(555) 678-9012",
          cpf: "67890123456",
          birthday: new Date("1982-07-19"),
          maritalStatus: "married",
          nationality: "Mexican",
          naturality: "Mexico City",
          profile: "leader",
          entranceDate: new Date("2018-06-22"),
          wasBaptized: "yes",
          baptismType: "immersion",
          baptismDate: new Date("2005-03-15"),
          avatar: "DR",
          image: "",
        },
      ];

      const foundMember = mockMembers.find(m => m.id === id);
      if (foundMember) {
        setMember(foundMember);
      } else {
        toast({
          title: "Member Not Found",
          description: "The requested member could not be found.",
          variant: "destructive"
        });
        navigate("/people/members");
      }
      
      setLoading(false);
    };

    getMemberData();
  }, [id, navigate, toast]);

  const handleSendNotification = () => {
    // In a real app, this would send a notification to the specific member
    console.log(`Sending notification to ${member.fullName}: ${notificationMessage}`);
    
    toast({
      title: "Notification Sent",
      description: `Successfully sent notification to ${member.fullName}.`,
    });
    
    setShowNotificationDialog(false);
    setNotificationMessage("");
  };

  const handleUpdateSuccess = () => {
    toast({
      title: "Member Updated",
      description: "The member has been successfully updated.",
    });
    navigate("/people/members");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading member information...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/people/members")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-church-primary">Edit Member</h1>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <Avatar className="h-24 w-24">
            <AvatarImage src={member.image} alt={member.fullName} />
            <AvatarFallback className="text-2xl">{member.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold text-center md:text-left">{member.fullName}</h2>
            <p className="text-church-secondary text-center md:text-left mb-4 capitalize">{member.profile}</p>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowNotificationDialog(true)}
            >
              <Bell className="h-4 w-4" />
              Send Notification
            </Button>
          </div>
        </div>

        <NewMemberForm 
          onSuccess={handleUpdateSuccess}
          initialData={member}
          isEditing={true}
        />
      </Card>

      {/* Send Notification Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Notification to {member.fullName}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm text-church-secondary block mb-2">Notification Message</label>
            <textarea 
              className="w-full rounded-md border border-church-border p-2 text-church-primary h-32" 
              placeholder="Enter notification message..."
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleSendNotification} 
              className="bg-church-primary hover:bg-church-accent text-white"
              disabled={!notificationMessage.trim()}
            >
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
