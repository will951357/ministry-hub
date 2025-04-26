import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link, useNavigate } from "react-router-dom";
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
  UserCheck,
  Smartphone,
  Building,
  CheckSquare,
  Square,
  Bell
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMobile } from "@/hooks/use-mobile";

type VisitMethod = "app" | "in-person";

type Visitor = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  visits: number;
  cellGroup: string;
  visitMethod: VisitMethod;
};

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

export const visitorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  cellGroup: z.string().min(1, { message: "Please select a cell group." }),
  visitMethod: z.enum(["app", "in-person"], { 
    required_error: "Please select how the visitor attended." 
  })
});

type VisitorFormValues = z.infer<typeof visitorSchema>;

export default function Visitors() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedCellGroup, setSelectedCellGroup] = useState("All Groups");
  const [visitsFilter, setVisitsFilter] = useState<number | null>(null);
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);
  const [visitors, setVisitors] = useState<Visitor[]>(mockVisitors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const form = useForm<VisitorFormValues>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      cellGroup: "",
      visitMethod: "in-person"
    },
  });

  const visitorsLast30Days = 23;
  const previousPeriodVisitors = 18;
  const variationPercentage = ((visitorsLast30Days - previousPeriodVisitors) / previousPeriodVisitors) * 100;

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

  const handleAddVisitor = (data: VisitorFormValues) => {
    const newVisitor: Visitor = {
      id: (visitors.length + 1).toString(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      cellGroup: data.cellGroup,
      visitMethod: data.visitMethod,
      lastVisit: new Date().toISOString().split('T')[0],
      visits: 1
    };

    setVisitors(prev => [...prev, newVisitor]);
    form.reset();
    setIsDialogOpen(false);

    toast({
      title: "Visitor added",
      description: `${data.name} has been added as a visitor.`,
    });
  };

  const areAllSelected = filteredVisitors.length > 0 && 
    selectedVisitors.length === filteredVisitors.length;

  const totalConversions = 8;
  const visitorsInEvents = 15;

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Visitors"
          value={visitorsLast30Days.toString()}
          icon={<UserPlus size={20} />}
          trend={{
            value: parseFloat(variationPercentage.toFixed(1)),
            isPositive: variationPercentage > 0
          }}
          className="bg-white rounded-lg border border-church-border shadow-sm"
        />
        <StatsCard
          title="Follow-up Pending"
          value="12"
          icon={<UserCheck size={20} />}
          className="bg-white rounded-lg border border-church-border shadow-sm cursor-pointer"
          onClick={() => window.location.href = "/people/members"}
          footer={
            <div className="text-sm text-blue-600 flex items-center">
              <div classname="flex" />
              <span>Click here to see requests</span>
            </div>
          }
        />
        <StatsCard
          title="Visitor Conversions"
          value={totalConversions.toString()}
          icon={<Users size={20} />}
          description="Visitors who became members in the last 30 days"
          className="bg-white rounded-lg border border-church-border shadow-sm cursor-pointer"
          onClick={() => window.location.href = "/people/members"}
          footer={
            <div className="text-sm text-blue-600 flex items-center">
              <span>See all new members</span>
            </div>
          }
        />
        <StatsCard
          title="Event Registrations"
          value={visitorsInEvents.toString()}
          icon={<Calendar size={20} />}
          description="Visitors registered for events"
          className="bg-white rounded-lg border border-church-border shadow-sm cursor-pointer"
          onClick={() => window.location.href = "/events"}
          footer={
            <div className="text-sm text-blue-600 flex items-center">
              <span>See all registrations</span>
            </div>
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search visitors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap w-full sm:w-auto">
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
            onClick={handleSendNotifications}
            disabled={selectedVisitors.length === 0}
            className="w-full sm:w-auto"
          >
            <Bell size={16} className="mr-2" />
            Send Notifications
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md overflow-x-auto">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 whitespace-nowrap" 
          onClick={handleSelectAll}
        >
          {areAllSelected ? (
            <CheckSquare className="h-5 w-5 text-church-primary" />
          ) : (
            <Square className="h-5 w-5 text-gray-400" />
          )}
          <span>Select All</span>
        </Button>
        <div className="text-sm text-gray-500 whitespace-nowrap">
          {selectedVisitors.length} of {filteredVisitors.length} visitors selected
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Visitor List</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-6 w-6"
                      onClick={handleSelectAll}
                    >
                      {areAllSelected ? (
                        <CheckSquare className="h-5 w-5 text-church-primary" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="hidden lg:table-cell">Cell Group</TableHead>
                  <TableHead className="hidden lg:table-cell">Visits</TableHead>
                  <TableHead>Visit Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisitors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No visitors found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVisitors.map((visitor) => (
                    <TableRow key={visitor.id}>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-6 w-6"
                          onClick={() => handleSelectVisitor(visitor.id)}
                        >
                          {selectedVisitors.includes(visitor.id) ? (
                            <CheckSquare className="h-5 w-5 text-church-primary" />
                          ) : (
                            <Square className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>
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
                      <TableCell>
                        {visitor.visitMethod === "app" ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            <Smartphone size={14} className="mr-1" />
                            App
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            <Building size={14} className="mr-1" />
                            In Person
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
