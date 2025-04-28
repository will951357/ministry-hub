import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, User, UserPlus, Search, Download, Bell, CheckSquare, Square, Pencil, Trash2, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { StatsCard } from "@/components/dashboard/StatsCard";
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
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  // Add the missing state variables here
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const {
    toast
  } = useToast();
  const memberStats = {
    total: 247,
    capacity: 500,
    change: 5.2
  };
  const members = [{
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    avatar: "JS",
    image: ""
  }, {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "(555) 987-6543",
    avatar: "MG",
    image: ""
  }, {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "(555) 234-5678",
    avatar: "RJ",
    image: ""
  }, {
    id: 4,
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    phone: "(555) 456-7890",
    avatar: "LW",
    image: ""
  }, {
    id: 5,
    name: "David Rodriguez",
    email: "david.r@example.com",
    phone: "(555) 567-8901",
    avatar: "DR",
    image: ""
  }];
  const membershipRequests = [{
    id: 101,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    requestDate: new Date(2025, 3, 10),
    avatar: "SJ",
    image: ""
  }, {
    id: 102,
    name: "Michael Brown",
    email: "michael.b@example.com",
    requestDate: new Date(2025, 3, 12),
    avatar: "MB",
    image: ""
  }, {
    id: 103,
    name: "Emily Davis",
    email: "emily.d@example.com",
    requestDate: new Date(2025, 3, 15),
    avatar: "ED",
    image: ""
  }];
  const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase()) || member.phone.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleDeleteMember = (id: number) => {
    setMemberToDelete(id);
    setShowDeleteDialog(true);
  };
  const confirmDeleteMember = () => {
    console.log(`Delete member with ID: ${memberToDelete}`);
    toast({
      title: "Member Deleted",
      description: "The member has been successfully removed."
    });
    setShowDeleteDialog(false);
    setMemberToDelete(null);
  };
  const handleEditMember = (id: number) => {
    navigate(`/people/members/${id}`);
  };
  const handleSendNotification = () => {
    console.log(`Sending notification: ${notificationMessage}`);
    toast({
      title: "Notification Sent",
      description: `Successfully sent notification to all members.`
    });
    setShowNotificationDialog(false);
    setNotificationMessage("");
  };
  const handleDownloadMemberList = () => {
    const csvContent = [["Name", "Email", "Phone"], ...members.map(member => [member.name, member.email, member.phone])].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: 'text/csv'
    });
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
      description: "Member list is being downloaded as a CSV file."
    });
  };
  const handleApproveRequest = (id: number) => {
    console.log(`Approving membership request with ID: ${id}`);
    toast({
      title: "Request Approved",
      description: "The membership request has been approved."
    });
  };
  const handleRejectRequest = (id: number) => {
    console.log(`Rejecting membership request with ID: ${id}`);
    toast({
      title: "Request Rejected",
      description: "The membership request has been rejected."
    });
  };
  const toggleMemberSelection = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };
  const toggleAllMembers = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };
  const areAllSelected = filteredMembers.length > 0 && selectedMembers.length === filteredMembers.length;
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  return <div className="space-y-6 max-w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-church-primary mb-2">Members</h1>
          <p className="text-church-secondary">
            Manage your church membership - view, add, and update member information.
          </p>
        </div>
        <Button className="bg-church-primary hover:bg-church-accent text-white md:self-start" onClick={() => navigate("/people/members/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add a new member
        </Button>
      </div>

      {/* Membership Requests Section */}
      {membershipRequests.length > 0 && <Card className="p-4 md:p-6 bg-white border-church-border mb-6 overflow-hidden">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-church-primary mb-4">Membership Requests</h2>
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {membershipRequests.map(request => <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={request.image} alt={request.name} />
                            <AvatarFallback>{request.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{request.name}</div>
                            <div className="text-sm text-muted-foreground">{request.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(request.requestDate)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleApproveRequest(request.id)} className="text-green-600 border-green-600 hover:bg-green-50">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleRejectRequest(request.id)} className="text-red-600 border-red-600 hover:bg-red-50">
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>}

      {/* Membership Statistics */}
      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <StatsCard title="Total Members" value={memberStats.total.toString()} description="Current membership count" icon={<User className="h-4 w-4" />} trend={{
        value: memberStats.change,
        isPositive: memberStats.change > 0
      }} className="bg-white p-6 rounded-lg border border-church-border" />
        <StatsCard title="Maximum Capacity" value={memberStats.capacity.toString()} description={`${Math.round(memberStats.total / memberStats.capacity * 100)}% utilized`} icon={<UserPlus className="h-4 w-4" />} className="bg-white p-6 rounded-lg border border-church-border" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap items-center justify-between">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-church-secondary" />
          <Input placeholder="Search members..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
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
                  <select className="w-full rounded-md border border-church-border p-2 text-church-primary" value={filters.status} onChange={e => setFilters({
                  ...filters,
                  status: e.target.value
                })}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-church-secondary">Department</label>
                  <select className="w-full rounded-md border border-church-border p-2 text-church-primary" value={filters.department} onChange={e => setFilters({
                  ...filters,
                  department: e.target.value
                })}>
                    <option value="all">All</option>
                    <option value="worship">Worship</option>
                    <option value="children">Children</option>
                    <option value="youth">Youth</option>
                    <option value="hospitality">Hospitality</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-church-secondary">Joined Date</label>
                  <select className="w-full rounded-md border border-church-border p-2 text-church-primary" value={filters.joinDate} onChange={e => setFilters({
                  ...filters,
                  joinDate: e.target.value
                })}>
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
          
          <Button variant="outline" onClick={() => setShowNotificationDialog(true)} className="flex items-center gap-2" disabled={selectedMembers.length === 0}>
            <Bell className="h-4 w-4" />
            <span>Send Notification</span>
          </Button>
          
          <Button variant="outline" onClick={handleDownloadMemberList} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Download List</span>
          </Button>
        </div>
      </div>

      

      <Card className="bg-white border-church-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">
                  <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={toggleAllMembers}>
                    {areAllSelected ? <CheckSquare className="h-5 w-5 text-church-primary" /> : <Square className="h-5 w-5 text-gray-400" />}
                  </Button>
                </TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map(member => <TableRow key={member.id}>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => toggleMemberSelection(member.id)}>
                      {selectedMembers.includes(member.id) ? <CheckSquare className="h-5 w-5 text-church-primary" /> : <Square className="h-5 w-5 text-gray-400" />}
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
                      <Button variant="ghost" size="sm" onClick={() => handleEditMember(member.id)} className="h-8 w-8 p-0">
                        <span className="sr-only">Edit member</span>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(member.id)} className="h-8 w-8 p-0 hover:text-red-500">
                        <span className="sr-only">Delete member</span>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Push Notification</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="text-sm text-church-secondary block mb-2">Notification Message</label>
            <textarea className="w-full rounded-md border border-church-border p-2 text-church-primary h-32" placeholder="Enter notification message..." value={notificationMessage} onChange={e => setNotificationMessage(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>Cancel</Button>
            <Button onClick={handleSendNotification} className="bg-church-primary hover:bg-church-accent text-white" disabled={!notificationMessage.trim()}>
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <Button variant="outline" onClick={() => {
            setShowDeleteDialog(false);
            setMemberToDelete(null);
          }}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteMember}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
}