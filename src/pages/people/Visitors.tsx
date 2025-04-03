
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Filter, 
  Users, 
  Mail, 
  ChevronDown, 
  Search, 
  Phone, 
  Calendar, 
  UserPlus, 
  AtSign, 
  UserCheck 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const mockVisitors = [
  {
    id: "1",
    name: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sarah.j@example.com",
    lastVisit: "2025-03-25",
    visits: 3,
    cellGroup: "North Side"
  },
  {
    id: "2",
    name: "Michael Chen",
    phone: "(555) 987-6543",
    email: "mchen@example.com",
    lastVisit: "2025-04-01",
    visits: 1,
    cellGroup: "Youth Group"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    phone: "(555) 234-5678",
    email: "emily.r@example.com",
    lastVisit: "2025-03-18",
    visits: 2,
    cellGroup: "Downtown"
  },
  {
    id: "4",
    name: "David Washington",
    phone: "(555) 456-7890",
    email: "d.washington@example.com",
    lastVisit: "2025-03-30",
    visits: 4,
    cellGroup: "West Side"
  },
  {
    id: "5",
    name: "Aisha Patel",
    phone: "(555) 345-6789",
    email: "aisha.p@example.com",
    lastVisit: "2025-04-02",
    visits: 1,
    cellGroup: "College Ministry"
  }
];

// Cell group options - in a real app, this would come from an API
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCellGroup, setSelectedCellGroup] = useState("All Groups");
  const [visitsFilter, setVisitsFilter] = useState<number | null>(null);
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);

  // Calculate metrics
  const visitorsLast30Days = 23; // Mock data
  const previousPeriodVisitors = 18; // Mock data
  const variationPercentage = ((visitorsLast30Days - previousPeriodVisitors) / previousPeriodVisitors) * 100;
  
  // Filter visitors based on search term and filters
  const filteredVisitors = mockVisitors.filter(visitor => {
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

  const handleSendEmail = () => {
    if (selectedVisitors.length === 0) {
      toast({
        title: "No visitors selected",
        description: "Please select at least one visitor to send an email.",
        variant: "destructive",
      });
      return;
    }

    const selectedNames = mockVisitors
      .filter(v => selectedVisitors.includes(v.id))
      .map(v => v.name)
      .join(", ");

    toast({
      title: "Email preparation started",
      description: `Preparing to send email to ${selectedVisitors.length} visitor(s): ${selectedNames}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-church-primary mb-2">Visitors</h1>
        <p className="text-church-secondary">
          Manage and track visitors to your church.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatsCard
          title="Visitors (Last 30 Days)"
          value={visitorsLast30Days.toString()}
          icon={<UserPlus size={24} />}
          trend={{
            value: parseFloat(variationPercentage.toFixed(1)),
            isPositive: variationPercentage > 0
          }}
          className="bg-white p-6 rounded-lg border border-church-border shadow-sm"
        />
        <StatsCard
          title="Follow-up Pending"
          value="12"
          icon={<UserCheck size={24} />}
          className="bg-white p-6 rounded-lg border border-church-border shadow-sm"
        />
      </div>

      {/* Search and actions row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search visitors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Collapsible 
            open={isFiltersOpen} 
            onOpenChange={setIsFiltersOpen}
            className="w-full sm:w-auto"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter size={16} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 p-4 bg-white border rounded-md shadow-sm w-full sm:w-[300px] absolute z-10">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Cell Group</label>
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedCellGroup}
                    onChange={(e) => setSelectedCellGroup(e.target.value)}
                  >
                    {cellGroups.map((group) => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Number of Visits</label>
                  <div className="flex flex-wrap gap-2">
                    {[null, 1, 2, 3, 4, 5].map((num) => (
                      <Badge 
                        key={num === null ? 'all' : num}
                        variant={visitsFilter === num ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setVisitsFilter(num)}
                      >
                        {num === null ? 'All' : num}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <Button 
            onClick={handleSendEmail}
            disabled={selectedVisitors.length === 0}
          >
            <Mail size={16} className="mr-2" />
            Email Selected
          </Button>
        </div>
      </div>

      {/* Visitors Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Visitor List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox 
                    checked={selectedVisitors.length === filteredVisitors.length && filteredVisitors.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="hidden lg:table-cell">Cell Group</TableHead>
                <TableHead className="hidden lg:table-cell">Visits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No visitors found matching your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredVisitors.map((visitor) => (
                  <TableRow key={visitor.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedVisitors.includes(visitor.id)}
                        onCheckedChange={() => handleSelectVisitor(visitor.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{visitor.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center">
                        <Phone size={14} className="mr-1 text-gray-400" />
                        {visitor.phone}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center">
                        <AtSign size={14} className="mr-1 text-gray-400" />
                        {visitor.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {new Date(visitor.lastVisit).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline">{visitor.cellGroup}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge>{visitor.visits}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
