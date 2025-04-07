
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, Bell, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample groups data
const groupsData = [
  {
    id: 1,
    name: "Men's Fellowship",
    description: "A gathering for men to study the Bible and build relationships.",
    status: "active" as const,
    members: 12,
    events: 2
  },
  {
    id: 2,
    name: "Women's Bible Study",
    description: "Weekly study and prayer group for women.",
    status: "active" as const,
    members: 15,
    events: 3
  },
  {
    id: 3,
    name: "Youth Group",
    description: "Engaging activities and Bible study for teenagers.",
    status: "active" as const,
    members: 18,
    events: 4
  },
  {
    id: 4,
    name: "Married Couples",
    description: "Support and fellowship for married couples.",
    status: "active" as const,
    members: 10,
    events: 1
  },
  {
    id: 5,
    name: "Senior Adults",
    description: "Fellowship and study for senior members of the congregation.",
    status: "inactive" as const,
    members: 8,
    events: 0
  },
  {
    id: 6,
    name: "New Believers",
    description: "Discipleship and mentoring for new Christians.",
    status: "active" as const,
    members: 6,
    events: 2
  }
];

interface Group {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  members: number;
  events: number;
}

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  
  const activeGroups = groupsData.filter(group => group.status === "active");
  const totalEvents = groupsData.reduce((total, group) => total + group.events, 0);
  
  const handleGroupClick = (group: Group) => {
    setSelectedGroup(group);
    setIsDialogOpen(true);
  };

  const handleSendNotification = (group: Group) => {
    setSelectedGroup(group);
    setIsNotificationDialogOpen(true);
  };

  const sendNotification = () => {
    if (selectedGroup) {
      toast.success(`Notification sent to ${selectedGroup.members} members of "${selectedGroup.name}" group`);
      setIsNotificationDialogOpen(false);
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-church-primary">Groups</h1>
            <p className="text-church-secondary">
              Manage all church groups and small groups.
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} />
            <span>Create Group</span>
          </Button>
        </div>

        <Card className="mb-6 border-church-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Groups Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-church-accent/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-church-accent" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Active Groups</p>
                  <p className="text-2xl font-semibold">{activeGroups.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Total Events</p>
                  <p className="text-2xl font-semibold">{totalEvents}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupsData.map((group) => (
            <div 
              key={group.id} 
              className="bg-white rounded-lg border border-church-border p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative"
              onClick={() => handleGroupClick(group)}
            >
              <div 
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendNotification(group);
                }}
              >
                <Bell size={16} className="text-church-secondary" />
              </div>
              <h3 className="text-lg font-medium mb-2 pr-8">{group.name}</h3>
              <p className="text-church-secondary text-sm mb-4 line-clamp-2">
                {group.description}
              </p>
              <div className="flex justify-between items-center">
                <Badge variant={group.status === "active" ? "default" : "secondary"}>
                  {group.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-church-secondary">
                  <Users size={14} />
                  <span>{group.members} members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Group details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedGroup?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedGroup && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-church-secondary mb-1">Description</h4>
                <p>{selectedGroup.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Status</h4>
                  <Badge variant={selectedGroup.status === "active" ? "default" : "secondary"}>
                    {selectedGroup.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Members</h4>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-church-secondary" />
                    <span>{selectedGroup.members}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Events</h4>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-church-secondary" />
                    <span>{selectedGroup.events}</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                <Button>
                  <Info size={16} className="mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create group dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Enter information for the new group
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              This feature is coming soon. You'll be able to create and manage group details here.
            </p>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send notification dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send a push notification to all members of "{selectedGroup?.name}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm mb-4">
              This will send a notification to {selectedGroup?.members} members.
            </p>
            
            <div className="flex justify-end gap-2">
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
    </MainLayout>
  );
}
