
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
import { ArrowLeft, Calendar, FileText, UploadCloud, Users, PencilIcon, Save, UserCheck, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
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
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Ministry Leader</TableCell>
                      <TableCell>Jan 2025</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Assistant Leader</TableCell>
                      <TableCell>Mar 2025</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
    </MainLayout>
  );
}
