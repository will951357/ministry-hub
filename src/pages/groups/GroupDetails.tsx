
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Bell, 
  Check, 
  UserPlus,
  Pencil,
  UserMinus,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Sample groups data - this would be fetched from an API in a real app
const groupsData = [
  {
    id: 1,
    name: "Men's Fellowship",
    description: "A gathering for men to study the Bible and build relationships.",
    status: "active" as const,
    members: 12,
    events: 2,
    meetingDay: "Tuesday",
    meetingTime: "7:00 PM",
    meetingLocation: "Church Fellowship Hall",
    leader: "John Smith",
    membersList: [
      { id: 1, name: "John Smith", role: "Leader", email: "john.smith@example.com", phone: "(555) 123-4567" },
      { id: 2, name: "Michael Johnson", role: "Member", email: "michael.j@example.com", phone: "(555) 234-5678" },
      { id: 3, name: "David Brown", role: "Member", email: "david.b@example.com", phone: "(555) 345-6789" },
      { id: 4, name: "Robert Williams", role: "Member", email: "robert.w@example.com", phone: "(555) 456-7890" },
      { id: 5, name: "James Jones", role: "Member", email: "james.j@example.com", phone: "(555) 567-8901" }
    ],
    eventsList: [
      { id: 1, name: "Weekly Bible Study", date: "2025-05-06", time: "7:00 PM", location: "Fellowship Hall" },
      { id: 2, name: "Men's Retreat", date: "2025-06-15", time: "All Day", location: "Mountain Lodge" }
    ]
  },
  {
    id: 2,
    name: "Women's Bible Study",
    description: "Weekly study and prayer group for women.",
    status: "active" as const,
    members: 15,
    events: 3,
    meetingDay: "Thursday",
    meetingTime: "10:00 AM",
    meetingLocation: "Church Room 203",
    leader: "Mary Johnson",
    membersList: [
      { id: 6, name: "Mary Johnson", role: "Leader", email: "mary.j@example.com", phone: "(555) 678-9012" },
      { id: 7, name: "Patricia Davis", role: "Member", email: "patricia.d@example.com", phone: "(555) 789-0123" },
      { id: 8, name: "Jennifer Miller", role: "Member", email: "jennifer.m@example.com", phone: "(555) 890-1234" }
    ],
    eventsList: [
      { id: 3, name: "Weekly Bible Study", date: "2025-05-08", time: "10:00 AM", location: "Room 203" },
      { id: 4, name: "Prayer Workshop", date: "2025-05-22", time: "10:00 AM", location: "Room 203" },
      { id: 5, name: "Women's Conference", date: "2025-07-12", time: "9:00 AM", location: "Main Sanctuary" }
    ]
  },
  {
    id: 3,
    name: "Youth Group",
    description: "Engaging activities and Bible study for teenagers.",
    status: "active" as const,
    members: 18,
    events: 4,
    meetingDay: "Wednesday",
    meetingTime: "6:30 PM",
    meetingLocation: "Youth Center",
    leader: "Sarah Adams",
    membersList: [
      { id: 9, name: "Sarah Adams", role: "Leader", email: "sarah.a@example.com", phone: "(555) 901-2345" }
    ],
    eventsList: [
      { id: 6, name: "Weekly Meeting", date: "2025-05-07", time: "6:30 PM", location: "Youth Center" }
    ]
  },
  {
    id: 4,
    name: "Married Couples",
    description: "Support and fellowship for married couples.",
    status: "active" as const,
    members: 10,
    events: 1,
    meetingDay: "Friday",
    meetingTime: "7:00 PM",
    meetingLocation: "Church Fellowship Hall",
    leader: "James and Lisa Wilson",
    membersList: [
      { id: 10, name: "James Wilson", role: "Co-Leader", email: "james.w@example.com", phone: "(555) 012-3456" },
      { id: 11, name: "Lisa Wilson", role: "Co-Leader", email: "lisa.w@example.com", phone: "(555) 012-3456" }
    ],
    eventsList: [
      { id: 7, name: "Monthly Gathering", date: "2025-05-23", time: "7:00 PM", location: "Fellowship Hall" }
    ]
  },
  {
    id: 5,
    name: "Senior Adults",
    description: "Fellowship and study for senior members of the congregation.",
    status: "inactive" as const,
    members: 8,
    events: 0,
    meetingDay: "Monday",
    meetingTime: "10:30 AM",
    meetingLocation: "Church Room 105",
    leader: "Harold Thompson",
    membersList: [
      { id: 12, name: "Harold Thompson", role: "Leader", email: "harold.t@example.com", phone: "(555) 123-7890" }
    ],
    eventsList: []
  },
  {
    id: 6,
    name: "New Believers",
    description: "Discipleship and mentoring for new Christians.",
    status: "active" as const,
    members: 6,
    events: 2,
    meetingDay: "Sunday",
    meetingTime: "9:30 AM",
    meetingLocation: "Church Room 101",
    leader: "Thomas Clark",
    membersList: [
      { id: 13, name: "Thomas Clark", role: "Leader", email: "thomas.c@example.com", phone: "(555) 234-8901" }
    ],
    eventsList: [
      { id: 8, name: "Discipleship Class", date: "2025-05-04", time: "9:30 AM", location: "Room 101" },
      { id: 9, name: "Baptism Preparation", date: "2025-05-18", time: "9:30 AM", location: "Room 101" }
    ]
  }
];

interface Member {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface GroupEvent {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
}

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const groupId = parseInt(id || '1');
  
  const group = groupsData.find(g => g.id === groupId);
  
  const [activeTab, setActiveTab] = useState("information");
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [isEditGroupDialogOpen, setIsEditGroupDialogOpen] = useState(false);
  const [editedGroup, setEditedGroup] = useState<any>(null);
  const [isEditMemberDialogOpen, setIsEditMemberDialogOpen] = useState(false);
  const [currentEditMember, setCurrentEditMember] = useState<Member | null>(null);
  const [availableRoles] = useState(["Leader", "Member", "Assistant"]);

  if (!group) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <h2 className="text-xl font-medium mb-2">Group not found</h2>
          <Button onClick={() => navigate("/groups")}>
            <ArrowLeft size={16} className="mr-1" />
            Back to Groups
          </Button>
        </div>
      </MainLayout>
    );
  }

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId) 
        : [...prev, memberId]
    );
  };

  const selectAllMembers = () => {
    setSelectedMembers(group.membersList.map(member => member.id));
  };

  const deselectAllMembers = () => {
    setSelectedMembers([]);
  };

  const sendNotification = () => {
    if (notificationText.trim() === "") {
      toast.error("Please enter a notification message");
      return;
    }

    const targetMembers = selectedMembers.length > 0 
      ? selectedMembers.length 
      : group.members;
    
    toast.success(`Notification sent to ${targetMembers} member${targetMembers !== 1 ? 's' : ''}`);
    setIsNotificationDialogOpen(false);
    setNotificationText("");
  };

  // New functions for editing group info
  const handleEditGroup = () => {
    setEditedGroup({
      name: group.name,
      description: group.description,
      meetingDay: group.meetingDay,
      meetingTime: group.meetingTime,
      meetingLocation: group.meetingLocation,
      status: group.status
    });
    setIsEditGroupDialogOpen(true);
  };

  const saveGroupChanges = () => {
    // In a real app, this would update the database
    toast.success("Group information updated successfully");
    setIsEditGroupDialogOpen(false);
  };

  // Member management functions
  const handleEditMember = (member: Member) => {
    setCurrentEditMember(member);
    setIsEditMemberDialogOpen(true);
  };

  const saveEditMember = () => {
    if (!currentEditMember) return;

    // Check if we're trying to set another member as Leader when one already exists
    const newRole = currentEditMember.role;
    if (newRole === "Leader") {
      const existingLeader = group.membersList.find(
        m => m.id !== currentEditMember.id && m.role === "Leader"
      );
      
      if (existingLeader) {
        toast.error("Only one member can be the leader. Please change the current leader's role first.");
        return;
      }
    }
    
    // In a real app, this would update the database
    toast.success(`${currentEditMember.name}'s role updated to ${currentEditMember.role}`);
    setIsEditMemberDialogOpen(false);
  };

  const handleDeleteMember = (memberId: number) => {
    // In a real app, this would update the database
    const memberName = group.membersList.find(m => m.id === memberId)?.name;
    toast.success(`${memberName} removed from the group`);
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Button variant="ghost" onClick={() => navigate("/groups")} className="mr-2 -ml-2">
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-2xl font-semibold text-church-primary">{group.name}</h1>
          <Badge variant={group.status === "active" ? "default" : "secondary"} className="ml-3">
            {group.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-church-secondary">{group.description}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-6">
        <Button onClick={() => setIsNotificationDialogOpen(true)}>
          <Bell size={16} className="mr-1" />
          Send Notification
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Information Tab */}
        <TabsContent value="information" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Group Details</CardTitle>
              <Button variant="outline" size="sm" onClick={handleEditGroup}>
                <Edit size={16} className="mr-1" />
                Edit Information
              </Button>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:gap-10">
                  <div className="sm:w-1/2 space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-church-secondary">Meeting Day</dt>
                      <dd>{group.meetingDay}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-church-secondary">Meeting Time</dt>
                      <dd>{group.meetingTime}</dd>
                    </div>
                  </div>
                  <div className="sm:w-1/2 space-y-4 mt-4 sm:mt-0">
                    <div>
                      <dt className="text-sm font-medium text-church-secondary">Meeting Location</dt>
                      <dd>{group.meetingLocation}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-church-secondary">Group Leader</dt>
                      <dd>{group.leader}</dd>
                    </div>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Members ({group.membersList.length})</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={selectAllMembers}>Select All</Button>
              <Button variant="outline" size="sm" onClick={deselectAllMembers}>Deselect All</Button>
              <Button size="sm" disabled={selectedMembers.length === 0} onClick={() => setIsNotificationDialogOpen(true)}>
                <Bell size={16} className="mr-1" />
                Notify ({selectedMembers.length})
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] sm:grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-4 bg-muted p-3 px-4 border-b">
              <div></div>
              <div className="font-medium">Name</div>
              <div className="hidden sm:block font-medium">Email</div>
              <div className="hidden sm:block font-medium">Phone</div>
              <div className="font-medium">Role</div>
              <div className="font-medium">Actions</div>
            </div>
            <div className="divide-y">
              {group.membersList.map((member) => (
                <div key={member.id} className="grid grid-cols-[auto_1fr_1fr_1fr_auto_auto] sm:grid-cols-[auto_1fr_1fr_1fr_auto_auto] gap-4 p-3 px-4 items-center hover:bg-muted/50">
                  <div>
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => toggleMemberSelection(member.id)}
                    />
                  </div>
                  <div className="font-medium">{member.name}</div>
                  <div className="hidden sm:block text-church-secondary">{member.email}</div>
                  <div className="hidden sm:block text-church-secondary">{member.phone}</div>
                  <Badge variant={member.role === "Leader" ? "default" : "outline"}>
                    {member.role}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEditMember(member)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteMember(member.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => toast.info("Adding new members feature coming soon")}>
              <UserPlus size={16} className="mr-1" />
              Add Member
            </Button>
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Events ({group.eventsList.length})</h2>
            <Button variant="outline" onClick={() => navigate("/events/create")}>
              <Calendar size={16} className="mr-1" />
              Add Event
            </Button>
          </div>

          {group.eventsList.length > 0 ? (
            <div className="space-y-4">
              {group.eventsList.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium">{event.name}</h3>
                        <div className="text-church-secondary text-sm flex flex-col sm:flex-row sm:gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div>{event.time}</div>
                          <div>{event.location}</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0" 
                        onClick={() => navigate(`/events/edit/${event.id}`)}>
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-church-secondary">
              <Calendar size={48} className="mx-auto mb-2 opacity-20" />
              <p>No events scheduled for this group</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Send Notification Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              {selectedMembers.length > 0 
                ? `Send a message to ${selectedMembers.length} selected member(s).`
                : `Send a message to all ${group.members} members of this group.`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <label htmlFor="notification" className="text-sm font-medium">
                Notification Message
              </label>
              <textarea
                id="notification"
                className="w-full min-h-32 border rounded-md p-2"
                placeholder="Enter your notification message here..."
                value={notificationText}
                onChange={(e) => setNotificationText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsNotificationDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={sendNotification}>
                <Bell size={16} className="mr-1" />
                Send Notification
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Group Dialog */}
      <Dialog open={isEditGroupDialogOpen} onOpenChange={setIsEditGroupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Group Information</DialogTitle>
            <DialogDescription>
              Make changes to the group details below.
            </DialogDescription>
          </DialogHeader>
          
          {editedGroup && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input 
                  id="name" 
                  value={editedGroup.name}
                  onChange={(e) => setEditedGroup({...editedGroup, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full min-h-20 border rounded-md p-2"
                  value={editedGroup.description}
                  onChange={(e) => setEditedGroup({...editedGroup, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meetingDay">Meeting Day</Label>
                  <Input 
                    id="meetingDay" 
                    value={editedGroup.meetingDay}
                    onChange={(e) => setEditedGroup({...editedGroup, meetingDay: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="meetingTime">Meeting Time</Label>
                  <Input 
                    id="meetingTime" 
                    value={editedGroup.meetingTime}
                    onChange={(e) => setEditedGroup({...editedGroup, meetingTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meetingLocation">Meeting Location</Label>
                <Input 
                  id="meetingLocation" 
                  value={editedGroup.meetingLocation}
                  onChange={(e) => setEditedGroup({...editedGroup, meetingLocation: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editedGroup.status}
                  onValueChange={(value) => setEditedGroup({...editedGroup, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditGroupDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveGroupChanges}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditMemberDialogOpen} onOpenChange={setIsEditMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member Role</DialogTitle>
            <DialogDescription>
              Update the role for {currentEditMember?.name}
            </DialogDescription>
          </DialogHeader>
          
          {currentEditMember && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="memberRole">Role</Label>
                <Select
                  value={currentEditMember.role}
                  onValueChange={(value) => setCurrentEditMember({...currentEditMember, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {currentEditMember.role === "Leader" && (
                  <p className="text-xs text-amber-600 mt-2">
                    Note: Only one member can be assigned as Leader.
                  </p>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditMemberDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveEditMember}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
