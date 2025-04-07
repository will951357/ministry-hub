
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Sample ministry data
const ministriesData = [
  {
    id: 1,
    name: "Youth Ministry",
    description: "Engaging young people in church activities and spiritual growth.",
    status: "active",
    members: 15
  },
  {
    id: 2,
    name: "Worship Team",
    description: "Leading the congregation in worship through music and prayer.",
    status: "active",
    members: 8
  },
  {
    id: 3,
    name: "Sunday School",
    description: "Providing biblical education for children of all ages.",
    status: "active",
    members: 12
  },
  {
    id: 4,
    name: "Outreach",
    description: "Connecting with the community and sharing the gospel.",
    status: "active",
    members: 10
  },
  {
    id: 5,
    name: "Prayer Team",
    description: "Dedicated to praying for the church and its members.",
    status: "active",
    members: 7
  },
  {
    id: 6,
    name: "Hospitality",
    description: "Welcoming visitors and creating a warm environment for all.",
    status: "inactive",
    members: 4
  }
];

interface Ministry {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  members: number;
}

export default function Ministries() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const activeMinistries = ministriesData.filter(ministry => ministry.status === "active");
  
  const handleMinistryClick = (ministry: Ministry) => {
    setSelectedMinistry(ministry);
    setIsDialogOpen(true);
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-church-primary">Ministries</h1>
            <p className="text-church-secondary">
              Manage all church ministries and activities.
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} />
            <span>New Ministry</span>
          </Button>
        </div>

        <Card className="mb-6 border-church-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Ministry Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-church-accent/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-church-accent" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Active Ministries</p>
                  <p className="text-2xl font-semibold">{activeMinistries.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Total Members</p>
                  <p className="text-2xl font-semibold">
                    {ministriesData.reduce((total, ministry) => total + ministry.members, 0)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministriesData.map((ministry) => (
            <div 
              key={ministry.id} 
              className="bg-white rounded-lg border border-church-border p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleMinistryClick(ministry)}
            >
              <h3 className="text-lg font-medium mb-2">{ministry.name}</h3>
              <p className="text-church-secondary text-sm mb-4 line-clamp-2">
                {ministry.description}
              </p>
              <div className="flex justify-between items-center">
                <Badge variant={ministry.status === "active" ? "default" : "secondary"}>
                  {ministry.status === "active" ? "Active" : "Inactive"}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-church-secondary">
                  <Users size={14} />
                  <span>{ministry.members} members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ministry details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedMinistry?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedMinistry && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-church-secondary mb-1">Description</h4>
                <p>{selectedMinistry.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Status</h4>
                  <Badge variant={selectedMinistry.status === "active" ? "default" : "secondary"}>
                    {selectedMinistry.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Members</h4>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-church-secondary" />
                    <span>{selectedMinistry.members}</span>
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

      {/* Create ministry dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Ministry</DialogTitle>
            <DialogDescription>
              Enter information for the new ministry
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              This feature is coming soon. You'll be able to create and manage ministry details here.
            </p>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
