
import { useState } from "react";
import { PlusCircle, Search, Filter, Baby, Eye, Trash, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { StatsCard } from "@/components/dashboard/StatsCard";

interface Kid {
  id: string;
  name: string;
  parent: string;
  birthDate: string;
  contactOption: string;
  alimentaryRestriction: string;
  specialNecessities: string;
  identificationPassword: string;
  addedDate: string;
}

export default function Kids() {
  // Mock data for kids
  const [kids, setKids] = useState<Kid[]>([
    {
      id: "1",
      name: "John Smith Jr.",
      parent: "John Smith",
      birthDate: "2018-05-15",
      contactOption: "555-1234",
      alimentaryRestriction: "Peanut allergy",
      specialNecessities: "None",
      identificationPassword: "JOHN2018",
      addedDate: "2023-01-10",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      parent: "Michael Johnson",
      birthDate: "2019-08-22",
      contactOption: "555-5678",
      alimentaryRestriction: "Lactose intolerant",
      specialNecessities: "Asthma, needs inhaler",
      identificationPassword: "SARAH2019",
      addedDate: "2023-02-15",
    },
    {
      id: "3",
      name: "Emma Williams",
      parent: "David Williams",
      birthDate: "2020-03-10",
      contactOption: "555-9012",
      alimentaryRestriction: "None",
      specialNecessities: "None",
      identificationPassword: "EMMA2020",
      addedDate: "2024-03-20",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { toast } = useToast();

  // Calculate metrics
  const totalKids = kids.length;
  
  // Get last month's date range
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  
  // Calculate new kids registered last month
  const kidsLastMonth = kids.filter(kid => {
    const addedDate = new Date(kid.addedDate);
    return addedDate >= lastMonth && addedDate <= lastMonthEnd;
  }).length;

  // Calculate trend percentage
  const previousMonth = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const previousMonthEnd = new Date(today.getFullYear(), today.getMonth() - 1, 0);
  
  const kidsPreviousMonth = kids.filter(kid => {
    const addedDate = new Date(kid.addedDate);
    return addedDate >= previousMonth && addedDate <= previousMonthEnd;
  }).length;
  
  // Calculate trend percentage (avoid division by zero)
  let trendPercentage = 0;
  if (kidsPreviousMonth > 0) {
    trendPercentage = Math.round(((kidsLastMonth - kidsPreviousMonth) / kidsPreviousMonth) * 100);
  } else if (kidsLastMonth > 0) {
    trendPercentage = 100; // If previous month had 0 but current month has some, that's a 100% increase
  }
  
  const isTrendPositive = trendPercentage >= 0;

  const filteredKids = kids.filter(kid => 
    kid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kid.parent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewKid = (kid: Kid) => {
    setSelectedKid(kid);
    setIsViewOpen(true);
  };

  const handleDeletePrompt = (kid: Kid) => {
    setSelectedKid(kid);
    setIsDeleteOpen(true);
  };

  const handleDeleteKid = () => {
    if (selectedKid) {
      setKids(kids.filter(k => k.id !== selectedKid.id));
      setIsDeleteOpen(false);
      
      toast({
        title: "Success!",
        description: `${selectedKid.name} has been removed from the registry.`,
      });
    }
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: `Push notification sent to parent of ${selectedKid?.name}.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleExportData = () => {
    // Generate CSV content
    const headers = "ID,Name,Parent,Birth Date,Contact,Dietary Restrictions,Special Needs,ID Password,Added Date\n";
    const rows = filteredKids.map(kid => 
      `${kid.id},"${kid.name}","${kid.parent}","${formatDate(kid.birthDate)}","${kid.contactOption}","${kid.alimentaryRestriction}","${kid.specialNecessities}","${kid.identificationPassword}","${formatDate(kid.addedDate)}"`
    ).join("\n");
    
    const csvContent = headers + rows;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    // Create download link and trigger click
    const a = document.createElement('a');
    a.href = url;
    a.download = "kids_registry.csv";
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Successful",
      description: "Kids registry data has been exported to CSV",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kids Registry</h1>
          <p className="text-muted-foreground">
            View and manage children registered through the app
          </p>
        </div>

        {/* Stats cards and Search row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Stats card - takes 1/4 of the row on desktop */}
          <div className="md:col-span-1">
            <StatsCard
              title="Total Kids"
              value={totalKids.toString()}
              description={`${kidsLastMonth} new registration${kidsLastMonth !== 1 ? 's' : ''} last month`}
              trend={trendPercentage !== 0 ? {
                value: Math.abs(trendPercentage),
                isPositive: isTrendPositive
              } : undefined}
              icon={<Baby />}
              className="h-full"
            />
          </div>
          
          {/* Search and filters - takes 3/4 of the row on desktop */}
          <div className="md:col-span-3">
            <div className="flex flex-col gap-3 h-full">
              {/* Search row */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by name or parent..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Buttons row */}
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Kids list */}
        {kids.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Baby className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">No children registered yet</h2>
            <p className="mb-8 mt-2 text-center text-sm text-muted-foreground max-w-sm">
              Children will be added when parents register them through the app.
            </p>
          </div>
        ) : (
          <Card className="border-border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-muted/50">
                  <TableHead>Name</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Birthday</TableHead>
                  <TableHead>ID Password</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKids.map((kid) => (
                  <TableRow key={kid.id} className="border-t border-border">
                    <TableCell className="font-medium">{kid.name}</TableCell>
                    <TableCell>{kid.parent}</TableCell>
                    <TableCell>{formatDate(kid.birthDate)}</TableCell>
                    <TableCell>{kid.identificationPassword}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewKid(kid)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeletePrompt(kid)}
                          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredKids.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No children found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>

      {/* View Kid Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Child Information</DialogTitle>
          </DialogHeader>
          {selectedKid && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Full Name</div>
                <div>{selectedKid.name}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Parent</div>
                <div>{selectedKid.parent}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Birth Date</div>
                <div>{formatDate(selectedKid.birthDate)}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Contact Information</div>
                <div>{selectedKid.contactOption || "Not provided"}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Alimentary Restrictions</div>
                <div>{selectedKid.alimentaryRestriction || "None"}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Special Necessities</div>
                <div>{selectedKid.specialNecessities || "None"}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Identification Password</div>
                <div>{selectedKid.identificationPassword}</div>
              </div>
              <div className="grid grid-cols-1 gap-1">
                <div className="font-medium">Added Date</div>
                <div>{formatDate(selectedKid.addedDate)}</div>
              </div>
            </div>
          )}
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              onClick={handleSendNotification}
              variant="outline"
            >
              Send Notification
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {selectedKid?.name} from the kids registry.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteKid} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
