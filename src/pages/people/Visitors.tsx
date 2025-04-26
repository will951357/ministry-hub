import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { VisitorStats } from "@/components/visitors/VisitorStats";
import { VisitorFilters } from "@/components/visitors/VisitorFilters";
import { VisitorTable } from "@/components/visitors/VisitorTable";
import { Visitor } from "@/types/visitor";

const mockVisitors: Visitor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.j@example.com",
    lastVisit: "2025-03-25",
    visits: 3,
    cellGroup: "North Side",
    visitMethod: "in-person"
  },
  {
    id: "2",
    name: "Michael Chen",
    phone: "(555) 987-6543",
    email: "mchen@example.com",
    lastVisit: "2025-04-01",
    visits: 1,
    cellGroup: "Youth Group",
    visitMethod: "app"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    phone: "(555) 234-5678",
    email: "emily.r@example.com",
    lastVisit: "2025-03-18",
    visits: 2,
    cellGroup: "Downtown",
    visitMethod: "in-person"
  },
  {
    id: "4",
    name: "David Washington",
    phone: "(555) 456-7890",
    email: "d.washington@example.com",
    lastVisit: "2025-03-30",
    visits: 4,
    cellGroup: "West Side",
    visitMethod: "app"
  },
  {
    id: "5",
    name: "Aisha Patel",
    phone: "(555) 345-6789",
    email: "aisha.p@example.com",
    lastVisit: "2025-04-02",
    visits: 1,
    cellGroup: "College Ministry",
    visitMethod: "in-person"
  },
  {
    id: "6",
    name: "Will Patel",
    phone: "(555) 345-6789",
    email: "aisha.p@example.com",
    lastVisit: "2024-04-02",
    visits: 100,
    cellGroup: "College Ministry",
    visitMethod: "app"
  }
];

const cellGroups = [
  "All Groups",
  "North Side",
  "Downtown",
  "West Side",
  "Youth Group",
  "College Ministry"
];

export default function Visitors() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCellGroup, setSelectedCellGroup] = useState("All Groups");
  const [visitsFilter, setVisitsFilter] = useState<number | null>(null);
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);
  const [visitors] = useState<Visitor[]>(mockVisitors);

  const visitorsLast30Days = 23;
  const previousPeriodVisitors = 18;
  const totalConversions = 8;
  const visitorsInEvents = 15;

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = 
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phone.includes(searchTerm);
    
    const matchesCellGroup = selectedCellGroup === "All Groups" || visitor.cellGroup === selectedCellGroup;
    const matchesVisits = visitsFilter === null || visitor.visits === visitsFilter;
    
    return matchesSearch && matchesCellGroup && matchesVisits;
  });

  const handleSelectVisitor = (visitorId: string) => {
    setSelectedVisitors(prev => 
      prev.includes(visitorId)
        ? prev.filter(id => id !== visitorId)
        : [...prev, visitorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVisitors.length === filteredVisitors.length) {
      setSelectedVisitors([]);
    } else {
      setSelectedVisitors(filteredVisitors.map(v => v.id));
    }
  };
  
  const handleSendNotifications = () => {
    if (selectedVisitors.length === 0) {
      toast({
        title: "No visitors selected",
        description: "Please select at least one visitor to send notifications.",
        variant: "destructive",
      });
      return;
    }

    const selectedNames = visitors
      .filter(v => selectedVisitors.includes(v.id))
      .map(v => v.name)
      .join(", ");

    toast({
      title: "Notifications queued",
      description: `Preparing to send notifications to ${selectedVisitors.length} visitor(s): ${selectedNames}`,
    });
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-church-primary mb-2">Visitors</h1>
          <p className="text-church-secondary">
            Manage and track visitors to your church.
          </p>
        </div>
        
        <Button variant="default" onClick={() => navigate("/people/visitors/new")}>
          <UserPlus size={16} className="mr-2" />
          Add Visitor
        </Button>
      </div>

      <VisitorStats 
        visitorsLast30Days={visitorsLast30Days}
        previousPeriodVisitors={previousPeriodVisitors}
        totalConversions={totalConversions}
        visitorsInEvents={visitorsInEvents}
      />

      <VisitorFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCellGroup={selectedCellGroup}
        onCellGroupChange={setSelectedCellGroup}
        visitsFilter={visitsFilter}
        onVisitsFilterChange={setVisitsFilter}
        onSendNotifications={handleSendNotifications}
        cellGroups={cellGroups}
        selectedVisitorsCount={selectedVisitors.length}
      />

      <VisitorTable
        visitors={filteredVisitors}
        selectedVisitors={selectedVisitors}
        onSelectVisitor={handleSelectVisitor}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}
