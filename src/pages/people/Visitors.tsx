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
  UserCheck,
  Smartphone,
  Building,
  CheckSquare,
  Square
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

// Type for visitor
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

// Mock data - in a real app, this would come from an API
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

// Schema for new visitor form
const visitorSchema = z.object({
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

  // Form for adding new visitors
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

  // Calculate metrics
  const visitorsLast30Days = 23; // Mock data
  const previousPeriodVisitors = 18; // Mock data
  const variationPercentage = ((visitorsLast30Days - previousPeriodVisitors) / previousPeriodVisitors) * 100;
  
  // Filter visitors based on search term and filters
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

  const handleSendEmail = () => {
    if (selectedVisitors.length === 0) {
      toast({
        title: "No visitors selected",
        description: "Please select at least one visitor to send an email.",
        variant: "destructive",
      });
      return;
    }

    const selectedNames = visitors
      .filter(v => selectedVisitors.includes(v.id))
      .map(v => v.name)
      .join(", ");

    toast({
      title: "Email preparation started",
      description: `Preparing to send email to ${selectedVisitors.length} visitor(s): ${selectedNames}`,
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

  // Check if all filtered visitors are selected
  const areAllSelected = filteredVisitors.length > 0 && 
    selectedVisitors.length === filteredVisitors.length;

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
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                <UserPlus size={16} className="mr-2" />
                Add Visitor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Visitor</DialogTitle>
                <DialogDescription>
                  Enter the details of the new visitor. All fields are required.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddVisitor)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cellGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cell Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a cell group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cellGroups.filter(group => group !== "All Groups").map((group) => (
                              <SelectItem key={group} value={group}>
                                {group}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="visitMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visit Method</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="How did they attend?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="in-person">
                              <div className="flex items-center">
                                <Building size={16} className="mr-2" />
                                In Person
                              </div>
                            </SelectItem>
                            <SelectItem value="app">
                              <div className="flex items-center">
                                <Smartphone size={16} className="mr-2" />
                                Via App
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="mt-6">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Add Visitor</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Select All toggle outside the table */}
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2" 
          onClick={handleSelectAll}
        >
          {areAllSelected ? (
            <CheckSquare className="h-5 w-5 text-church-primary" />
          ) : (
            <Square className="h-5 w-5 text-gray-400" />
          )}
          <span>Select All</span>
        </Button>
        <div className="text-sm text-gray-500">
          {selectedVisitors.length} of {filteredVisitors.length} visitors selected
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
        </CardContent>
      </Card>
    </div>
  );
}
