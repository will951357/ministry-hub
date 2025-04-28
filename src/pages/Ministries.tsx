import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  UserCheck,
  Calendar,
  Settings,
  Users,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Download,
  Bell,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";

type Ministry = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  members: number;
};

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

export default function Ministries() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeMinistries = MINISTRIES_DATA.filter(m => m.status === 'active').length;
  const totalMembers = MINISTRIES_DATA.reduce((sum, ministry) => sum + ministry.members, 0);
  const pendingApprovals = 3;
  const administratorsCount = 5;

  const handleViewDetails = (ministryId: number) => {
    navigate(`/ministries/${ministryId}`);
  };

  const handleCreateMinistry = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Ministry creation will be available in the next update.",
    });
    setShowCreateDialog(false);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Your data is being prepared for export.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Options",
      description: "Filter options will be available soon.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-church-primary mb-2">Ministries</h1>
            <p className="text-church-secondary">
              Manage and organize your church's ministries and their members.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Ministry
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search ministries..." 
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
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Pending Approvals"
            value={pendingApprovals.toString()}
            description="Documents pending"
            icon={<FileText className="h-4 w-4" />}
          />
          
          <StatsCard
            title="Active Ministries"
            value={activeMinistries.toString()}
            description="Currently active"
            icon={<Users className="h-4 w-4" />}
          />
          
          <StatsCard
            title="Administrators"
            value={administratorsCount.toString()}
            description="Ministry leaders"
            icon={<UserCheck className="h-4 w-4" />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES_DATA.map((ministry) => (
            <ChartCard 
              key={ministry.id} 
              title={ministry.name}
              description={ministry.description}
              icon={<Users className="h-4 w-4" />}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewDetails(ministry.id)}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant={ministry.status === "active" ? "default" : "destructive"}>
                    {ministry.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{ministry.members} members</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8 w-full" onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(ministry.id);
                }}>
                  Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </ChartCard>
          ))}
        </div>

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
