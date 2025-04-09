
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Plus,
  UserCheck,
  Calendar,
  Settings,
  Users,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MainLayout } from "@/components/layout/MainLayout";

// Define the Ministry type with a specific status type
type Ministry = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  members: number;
};

// Mock data for ministries
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

// Data for the pie chart
const statusData = [
  { name: 'Active', value: MINISTRIES_DATA.filter(m => m.status === 'active').length },
  { name: 'Inactive', value: MINISTRIES_DATA.filter(m => m.status === 'inactive').length }
];

const COLORS = ['#4CAF50', '#F44336'];

export default function Ministries() {
  const { toast } = useToast();
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const activeMinistries = MINISTRIES_DATA.filter(m => m.status === 'active').length;
  const totalMembers = MINISTRIES_DATA.reduce((sum, ministry) => sum + ministry.members, 0);
  
  const handleViewDetails = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
    setShowDetailsDialog(true);
  };

  const handleCreateMinistry = () => {
    // In a real app, this would save the new ministry to the database
    toast({
      title: "Feature Coming Soon",
      description: "Ministry creation will be available in the next update.",
    });
    setShowCreateDialog(false);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-church-primary mb-2">Ministries</h1>
          <p className="text-church-secondary">
            Manage and organize your church's ministries and their members.
          </p>
        </div>

        {/* Stats and chart overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Ministry Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Active Ministries</p>
                <p className="text-2xl font-semibold">{activeMinistries}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Members Involved</p>
                <p className="text-2xl font-semibold">{totalMembers}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Members per Ministry</p>
                <p className="text-2xl font-semibold">
                  {(totalMembers / MINISTRIES_DATA.length).toFixed(1)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Ministry Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ministry list */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-church-primary">Ministry List</h2>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Ministry
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES_DATA.map((ministry) => (
            <Card 
              key={ministry.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewDetails(ministry)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{ministry.name}</CardTitle>
                  <Badge variant={ministry.status === "active" ? "default" : "destructive"}>
                    {ministry.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {ministry.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{ministry.members} members</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">
                    Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ministry Details Dialog */}
        {selectedMinistry && (
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedMinistry.name}</span>
                  <Badge variant={selectedMinistry.status === "active" ? "default" : "destructive"}>
                    {selectedMinistry.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  {selectedMinistry.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Members</p>
                      <p className="font-medium">{selectedMinistry.members}</p>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Events</p>
                      <p className="font-medium">5</p>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Leaders</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Ministry Leader</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Assistant Leader</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <DialogFooter>
                <Button variant="outline">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Manage Members
                </Button>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Ministry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Create Ministry Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Ministry</DialogTitle>
              <DialogDescription>
                Add a new ministry to your church organization.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <p className="text-center text-muted-foreground">
                Ministry creation feature will be implemented in the next update.
              </p>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateMinistry}>
                Create Ministry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
