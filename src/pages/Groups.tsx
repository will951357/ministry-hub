import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, Bell, Filter, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [isGroupSelectMode, setIsGroupSelectMode] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  
  const activeGroups = groupsData.filter(group => group.status === "active");
  const totalEvents = groupsData.reduce((total, group) => total + group.events, 0);
  
  const handleGroupClick = (group: Group) => {
    if (isGroupSelectMode) {
      toggleGroupSelection(group.id);
    } 
  };

  const toggleGroupSelection = (groupId: number) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
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

  const sendBulkNotification = () => {
    const selectedGroupCount = selectedGroups.length;
    if (selectedGroupCount > 0) {
      const memberCount = selectedGroups.reduce((total, groupId) => {
        const group = groupsData.find(g => g.id === groupId);
        return total + (group?.members || 0);
      }, 0);
      
      toast.success(`Notification sent to ${memberCount} members across ${selectedGroupCount} groups`);
      setSelectedGroups([]);
      setIsGroupSelectMode(false);
    } else {
      toast.error("Please select at least one group");
    }
  };

  const handleFilter = () => {
    toast.info("Filter functionality coming soon");
  };

  const filteredGroups = searchQuery 
    ? groupsData.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groupsData;

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
          <Button onClick={() => navigate("/groups/create")}>
            <Plus size={16} />
            <span>Create Group</span>
          </Button>
        </div>

        {/* Action bar */}
        <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search groups..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            {isGroupSelectMode ? (
              <>
                <Button variant="outline" onClick={() => {
                  setSelectedGroups([]);
                  setIsGroupSelectMode(false);
                }}>
                  Cancel
                </Button>
                <Button onClick={sendBulkNotification}>
                  <Bell className="mr-2 h-4 w-4" />
                  Send Notification ({selectedGroups.length})
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => setIsGroupSelectMode(true)}>
                <Bell className="mr-2 h-4 w-4" />
                Select Groups
              </Button>
            )}
          </div>
        </div>

        {/* Groups grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div 
              key={group.id} 
              className={`bg-white rounded-lg border ${
                selectedGroups.includes(group.id) ? "border-primary" : "border-church-border"
              } hover:shadow-md transition-all ${isGroupSelectMode ? "cursor-pointer" : ""} relative`}
              onClick={() => isGroupSelectMode && handleGroupClick(group)}
            >
              {isGroupSelectMode && (
                <div className="absolute top-4 left-4 z-10" onClick={(e) => {
                  e.stopPropagation();
                  toggleGroupSelection(group.id);
                }}>
                  <Checkbox checked={selectedGroups.includes(group.id)} />
                </div>
              )}
              
              {/* Card Header Section */}
              <div className="border-b p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-medium ${isGroupSelectMode ? "pl-8" : ""}`}>
                    {group.name}
                  </h3>
                  <Badge variant={group.status === "active" ? "default" : "secondary"}>
                    {group.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-church-secondary text-sm line-clamp-2">
                  {group.description}
                </p>
              </div>
              
              {/* Card Content Section */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-church-secondary" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-church-secondary" />
                    <span>{group.events} events</span>
                  </div>
                </div>
                
                {/* Card Actions */}
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendNotification(group);
                    }}
                  >
                    <Bell size={16} className="mr-1" />
                    Notify
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/groups/${group.id}`);
                    }}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
