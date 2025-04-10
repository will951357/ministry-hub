import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search, Pencil, Trash2, Bell, Download, Calendar as CalendarIcon, Phone, Mail, User, Camera, CheckSquare, Square } from "lucide-react";
import { 
  Popover,
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { NewMemberForm } from "@/components/members/NewMemberForm";

export default function Members() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
    joinDate: "all"
  });
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const memberStats = {
    total: 247,
    capacity: 500
  };

  // Mock members data
  const members = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      avatar: "JS",
      image: "",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "(555) 987-6543",
      avatar: "MG",
      image: "",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "(555) 234-5678",
      avatar: "RJ",
      image: "",
    },
    {
      id: 4,
      name: "Lisa Wang",
      email: "lisa.wang@example.com",
      phone: "(555) 456-7890",
      avatar: "LW",
      image: "",
    },
    {
      id: 5,
      name: "David Rodriguez",
      email: "david.r@example.com",
      phone: "(555) 567-8901",
      avatar: "DR",
      image: "",
    },
  ];

  // Filter members based on search
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteMember = (id: number) => {
    setMemberToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDeleteMember = () => {
    // In a real app, this would call an API to delete the member
    console.log(`Delete member with ID: ${memberToDelete}`);
    
    toast({
      title: "Member Deleted",
      description: "The member has been successfully removed.",
    });
    
    setShowDeleteDialog(false);
    setMemberToDelete(null);
  };

  const handleEditMember = (id: number) => {
    navigate(`/people/members/${id}`);
  };

  const handleSendNotification = () => {
    // In a real app, this would send the notification to members via an API
    console.log(`Sending notification: ${notificationMessage}`);
    toast({
      title: "Notification Sent",
      description: `Successfully sent notification to all members.`,
    });
    setShowNotificationDialog(false);
    setNotificationMessage("");
  };

  const handleDownloadMemberList = () => {
    // In a real app, this would generate a CSV from actual data
    const csvContent = [
      ["Name", "Email", "Phone"],
      ...members.map(member => [member.name, member.email, member.phone])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'member_list.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download Started",
      description: "Member list is being downloaded as a CSV file.",
    });
  };

  // Toggle selection of a single member
  const toggleMemberSelection = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  // Toggle selection of all filtered members
  const toggleAllMembers = () => {
    if (selectedMembers.length === filteredMembers.length) {
      // If all are selected, deselect all
      setSelectedMembers([]);
    } else {
      // Otherwise, select all
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };

  // Check if all filtered members are selected
  const areAllSelected = filteredMembers.length > 0 && 
    selectedMembers.length === filteredMembers.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-church-primary mb-2">Members</h1>
        <p className="text-church-secondary">
          Manage your church membership - view, add, and update member information.
        </p>
      </div>

      <Card className="p-6 bg-white border-church-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium text-church-primary">Membership Statistics</h2>
            <div className="mt-2 flex items-center space-x-6">
              <div>
                <p className="text-sm text-church-secondary">Total Members</p>
                <p className="text-2xl font-semibold text-church-primary">{memberStats.total}</p>
              </div>
              <div>
                <p className="text-sm text-church-secondary">Maximum Capacity</p>
                <p className="text-2xl font-semibold text-church-primary">{memberStats.capacity}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              className="bg-church-primary hover:bg-church-accent text-white"
              onClick={() => setShowAddMemberDialog(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add a new member
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap items-center justify-between">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-church-secondary" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium text-church-primary">Filter Members</h3>
                
                <div className="space-y-2">
                  <label className="text-sm text-church-secondary">Status</label>
                  <select 
                    className="w-full rounded-md border border-church-border p-2 text-church-primary"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-church-secondary">Department</label>
                  <select 
                    className="w-full rounded-md border border-church-border p-2 text-church-primary"
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                  >
                    <option value="all">All</option>
                    <option value="worship">Worship</option>
                    <option value="children">Children</option>
                    <option value="youth">Youth</option>
                    <option value="hospitality">Hospitality</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-church-secondary">Joined Date</label>
                  <select 
                    className="w-full rounded-md border border-church-border p-2 text-church-primary"
                    value={filters.joinDate}
                    onChange={(e) => setFilters({...filters, joinDate: e.target.value})}
                  >
                    <option value="all">All Time</option>
                    <option value="last30">Last 30 Days</option>
                    <option value="last90">Last 90 Days</option>
                    <option value="lastyear">Last Year</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setFilters({
                    status: "all",
                    department: "all",
                    joinDate: "all"
                  })}>
                    Reset
                  </Button>
                  <Button className="bg-church-primary hover:bg-church-accent text-white">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            onClick={() => setShowNotificationDialog(true)} 
            className="flex items-center gap-2"
            disabled={selectedMembers.length === 0}
          >
            <Bell className="h-4 w-4" />
            <span>Send Notification</span>
          </Button>
          
          <Button variant="outline" onClick={handleDownloadMemberList} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Download List</span>
          </Button>
        </div>
      </div>

      {/* Select All control */}
      <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={toggleAllMembers}
        >
          {areAllSelected ? (
            <CheckSquare className="h-5 w-5 text-church-primary" />
          ) : (
            <Square className="h-5 w-5 text-gray-400" />
          )}
          <span>Select All</span>
        </Button>
        <div className="text-sm text-gray-500">
          {selectedMembers.length} of {filteredMembers.length} members selected
        </div>
      </div>

      {/* Member list table */}
      <Card className="bg-white border-church-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-6 w-6"
                    onClick={toggleAllMembers}
                  >
                    {areAllSelected ? (
                      <CheckSquare className="h-5 w-5 text-church-primary" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-6 w-6"
                      onClick={() => toggleMemberSelection(member.id)}
                    >
                      {selectedMembers.includes(member.id) ? (
                        <CheckSquare className="h-5 w-5 text-church-primary" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditMember(member.id)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Edit member</span>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteMember(member.id)}
                        className="h-8 w-8 p-0 hover:text-red-500"
                      >
                        <span className="sr-only">Delete member</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Send Notification Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Push Notification</DialogTitle>
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

      {/* Delete Member Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be undone.
              <br /><br />
              Note: Member interactions and donation records will be retained.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteDialog(false);
                setMemberToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDeleteMember}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <NewMemberForm onSuccess={() => {
            setShowAddMemberDialog(false);
            toast({
              title: "Member Added",
              description: "The new member has been successfully added.",
            });
          }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
