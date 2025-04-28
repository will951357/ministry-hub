
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, Calendar, FileText, UploadCloud, Users, PencilIcon, Save, UserCheck, 
  Trash2, PlusCircle, UserPlus, Group, Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Using the same Ministry type from the Ministries page
type Ministry = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  members: number;
};

// Mock data for documents
type Document = {
  id: number;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
};

// Mock data for ministry members
type Member = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
};

// Mock data for ministry groups
type Group = {
  id: number;
  name: string;
  description: string;
  memberCount: number;
};

// Mock data for leaders
type Leader = {
  id: number;
  name: string;
  role: "Ministry Leader" | "Assistant Leader" | "Administrator";
  since: string;
};

const DOCUMENTS_DATA: Document[] = [
  { id: 1, name: "Budget Proposal 2025", type: "PDF", uploadDate: "2025-04-10", size: "1.2 MB" },
  { id: 2, name: "Ministry Handbook", type: "DOCX", uploadDate: "2025-03-22", size: "3.8 MB" },
  { id: 3, name: "Team Roster", type: "XLSX", uploadDate: "2025-04-15", size: "780 KB" },
];

// Mock data for reports
type Report = {
  id: number;
  title: string;
  author: string;
  date: string;
  status: "submitted" | "reviewed" | "approved";
};

const REPORTS_DATA: Report[] = [
  { id: 1, title: "Q1 Ministry Activities", author: "John Doe", date: "2025-03-31", status: "approved" },
  { id: 2, title: "Easter Program Results", author: "Jane Smith", date: "2025-04-10", status: "reviewed" },
  { id: 3, title: "New Member Onboarding", author: "John Doe", date: "2025-04-20", status: "submitted" },
];

// Mock data for members
const MEMBERS_DATA: Member[] = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "555-123-4567", joinDate: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-987-6543", joinDate: "2023-02-20" },
  { id: 3, name: "Michael Johnson", email: "michael@example.com", phone: "555-456-7890", joinDate: "2023-03-05" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "555-789-0123", joinDate: "2023-03-22" },
  { id: 5, name: "David Wilson", email: "david@example.com", phone: "555-321-6547", joinDate: "2023-04-10" },
];

// Mock data for groups
const GROUPS_DATA: Group[] = [
  { id: 1, name: "Worship Team", description: "Sunday service worship team", memberCount: 8 },
  { id: 2, name: "Sound Engineers", description: "Audio/visual support team", memberCount: 4 },
  { id: 3, name: "Music Directors", description: "Coordinate weekly music selection", memberCount: 2 },
];

// Mock data for leaders
const LEADERS_DATA: Leader[] = [
  { id: 1, name: "John Doe", role: "Ministry Leader", since: "Jan 2025" },
  { id: 2, name: "Jane Smith", role: "Assistant Leader", since: "Mar 2025" },
];

// Mock data for ministries - same as in Ministries.tsx
const MINISTRIES_DATA: Ministry[] = [
  {
    id: 1,
    name: "Worship",
    description: "Leading the congregation in music and praise during services.",
    status: "active",
    members: 18
  },
  {
    id: 2,
    name: "Children's Ministry",
    description: "Providing spiritual education and care for children ages 0-12.",
    status: "active",
    members: 24
  },
  {
    id: 3,
    name: "Youth Group",
    description: "Fostering spiritual growth and community among teenagers.",
    status: "active",
    members: 15
  },
  {
    id: 4,
    name: "Hospitality",
    description: "Welcoming newcomers and organizing social events.",
    status: "active",
    members: 12
  },
  {
    id: 5,
    name: "Missions",
    description: "Coordinating outreach and missions work locally and abroad.",
    status: "inactive",
    members: 9
  },
  {
    id: 6,
    name: "Media",
    description: "Managing service recordings, live streaming, and website maintenance.",
    status: "active",
    members: 7
  }
];

export default function MinistryDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the ministry by ID
  const ministryId = parseInt(id || "0");
  const ministry = MINISTRIES_DATA.find(m => m.id === ministryId);
  
  // Form state for ministry information
  const [name, setName] = useState(ministry?.name || "");
  const [description, setDescription] = useState(ministry?.description || "");
  const [status, setStatus] = useState(ministry?.status || "active");
  const [isEditing, setIsEditing] = useState(false);
  
  // State for leadership management
  const [showLeaderDialog, setShowLeaderDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("Administrator");
  const [leadersList, setLeadersList] = useState<Leader[]>(LEADERS_DATA);

  if (!ministry) {
    return (
      <MainLayout>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">Ministry not found</h2>
          <Button className="mt-4" onClick={() => navigate("/ministries")}>
            Back to Ministries
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleSaveChanges = () => {
    toast({
      title: "Changes Saved",
      description: "Ministry information has been updated successfully.",
    });
    setIsEditing(false);
  };

  const handleUploadDocument = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Document upload functionality will be available in the next update.",
    });
  };

  const handleSubmitReport = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Report submission functionality will be available in the next update.",
    });
  };

  const handleAddLeader = () => {
    if (!selectedMember) {
      toast({
        title: "Selection Required",
        description: "Please select a member to add as a leader.",
        variant: "destructive"
      });
      return;
    }

    const member = MEMBERS_DATA.find(m => m.id.toString() === selectedMember);
    
    if (!member) return;
    
    // Check if there's already a Ministry Leader and trying to add another
    if (selectedRole === "Ministry Leader" && 
        leadersList.some(leader => leader.role === "Ministry Leader")) {
      toast({
        title: "Role Conflict",
        description: "There can only be one Ministry Leader per ministry.",
        variant: "destructive"
      });
      return;
    }

    // Check if the member is already a leader
    if (leadersList.some(leader => leader.name === member.name)) {
      toast({
        title: "Duplicate Leader",
        description: `${member.name} is already assigned a leadership role.`,
        variant: "destructive"
      });
      return;
    }

    const newLeader: Leader = {
      id: leadersList.length + 1,
      name: member.name,
      role: selectedRole as "Ministry Leader" | "Assistant Leader" | "Administrator",
      since: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setLeadersList([...leadersList, newLeader]);
    
    toast({
      title: "Leader Added",
      description: `${member.name} has been assigned the role of ${selectedRole}.`,
    });
    
    setShowLeaderDialog(false);
    setSelectedMember("");
  };

  const handleRemoveLeader = (leaderId: number) => {
    setLeadersList(leadersList.filter(leader => leader.id !== leaderId));
    
    toast({
      title: "Leader Removed",
      description: "The leader has been removed from this ministry.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={() => navigate("/ministries")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-church-primary">{ministry.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant={ministry.status === "active" ? "default" : "destructive"}>
                  {ministry.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {ministry.members} members
                </span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="information" className="space-y-4">
          <TabsList>
            <TabsTrigger value="information">
              <UserCheck className="h-4 w-4 mr-2" />
              Information
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="reports">
              <Calendar className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Ministry Information Tab */}
          <TabsContent value="information" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Ministry Details</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <PencilIcon className="h-4 w-4 mr-2" /> 
                    Edit Details
                  </Button>
                ) : (
                  <Button onClick={handleSaveChanges}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      disabled={!isEditing} 
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Status</label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          checked={status === "active"} 
                          onChange={() => setStatus("active")}
                          disabled={!isEditing}
                        />
                        <span>Active</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          checked={status === "inactive"} 
                          onChange={() => setStatus("inactive")}
                          disabled={!isEditing}
                        />
                        <span>Inactive</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Leadership</CardTitle>
                <Button variant="outline" onClick={() => setShowLeaderDialog(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage Leaders
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Since</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leadersList.map((leader) => (
                      <TableRow key={leader.id}>
                        <TableCell>{leader.name}</TableCell>
                        <TableCell>{leader.role}</TableCell>
                        <TableCell>{leader.since}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveLeader(leader.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {leadersList.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No leaders assigned to this ministry yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministry Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {GROUPS_DATA.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.description}</TableCell>
                        <TableCell>{group.memberCount}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Group className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {GROUPS_DATA.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No groups in this ministry yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add New Group
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ministry Members</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MEMBERS_DATA.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {MEMBERS_DATA.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                          No members in this ministry yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Members
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Ministry Documents</CardTitle>
                <Button onClick={handleUploadDocument}>
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {DOCUMENTS_DATA.map(doc => (
                      <TableRow key={doc.id}>
                        <TableCell>{doc.name}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Leadership Reports</CardTitle>
                <Button onClick={handleSubmitReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {REPORTS_DATA.map(report => (
                      <TableRow key={report.id}>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.author}</TableCell>
                        <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            report.status === "approved" ? "default" : 
                            report.status === "reviewed" ? "secondary" : "outline"
                          }>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Leader Dialog */}
      <Dialog open={showLeaderDialog} onOpenChange={setShowLeaderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Ministry Leaders</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Member</label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a member" />
                </SelectTrigger>
                <SelectContent>
                  {MEMBERS_DATA.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Role</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ministry Leader">Ministry Leader</SelectItem>
                  <SelectItem value="Assistant Leader">Assistant Leader</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                </SelectContent>
              </Select>
              {selectedRole === "Ministry Leader" && leadersList.some(leader => leader.role === "Ministry Leader") && (
                <p className="text-xs text-destructive mt-1">
                  Note: There can only be one Ministry Leader. Adding a new one will replace the current leader.
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaderDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLeader}>
              <Check className="h-4 w-4 mr-2" />
              Add Leader
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
