import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search, Filter, Eye, Trash, Download, QrCode, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

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
  const navigate = useNavigate();
  const [kids, setKids] = useState<Kid[]>([{
    id: "1",
    name: "John Smith Jr.",
    parent: "John Smith",
    birthDate: "2018-05-15",
    contactOption: "555-1234",
    alimentaryRestriction: "Peanut allergy",
    specialNecessities: "None",
    identificationPassword: "JOHN2018",
    addedDate: "2023-01-10"
  }, {
    id: "2",
    name: "Sarah Johnson",
    parent: "Michael Johnson",
    birthDate: "2019-08-22",
    contactOption: "555-5678",
    alimentaryRestriction: "Lactose intolerant",
    specialNecessities: "Asthma, needs inhaler",
    identificationPassword: "SARAH2019",
    addedDate: "2023-02-15"
  }, {
    id: "3",
    name: "Emma Williams",
    parent: "David Williams",
    birthDate: "2020-03-10",
    contactOption: "555-9012",
    alimentaryRestriction: "None",
    specialNecessities: "None",
    identificationPassword: "EMMA2020",
    addedDate: "2024-03-20"
  }]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKid, setSelectedKid] = useState<Kid | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const {
    toast
  } = useToast();

  const totalKids = kids.length;

  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const kidsLastMonth = kids.filter(kid => {
    const addedDate = new Date(kid.addedDate);
    return addedDate >= lastMonth && addedDate <= lastMonthEnd;
  }).length;

  const previousMonth = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const previousMonthEnd = new Date(today.getFullYear(), today.getMonth() - 1, 0);
  const kidsPreviousMonth = kids.filter(kid => {
    const addedDate = new Date(kid.addedDate);
    return addedDate >= previousMonth && addedDate <= previousMonthEnd;
  }).length;

  let trendPercentage = 0;
  if (kidsPreviousMonth > 0) {
    trendPercentage = Math.round((kidsLastMonth - kidsPreviousMonth) / kidsPreviousMonth * 100);
  } else if (kidsLastMonth > 0) {
    trendPercentage = 100;
  }
  const isTrendPositive = trendPercentage >= 0;

  const filteredKids = kids.filter(kid => kid.name.toLowerCase().includes(searchQuery.toLowerCase()) || kid.parent.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleViewKid = (kid: Kid) => {
    navigate(`/people/kids/${kid.id}`);
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
        description: `${selectedKid.name} has been removed from the registry.`
      });
    }
  };

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: `Push notification sent to parent of ${selectedKid?.name}.`
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleExportData = () => {
    const headers = "ID,Name,Parent,Birth Date,Contact,Dietary Restrictions,Special Needs,ID Password,Added Date\n";
    const rows = filteredKids.map(kid => `${kid.id},"${kid.name}","${kid.parent}","${formatDate(kid.birthDate)}","${kid.contactOption}","${kid.alimentaryRestriction}","${kid.specialNecessities}","${kid.identificationPassword}","${formatDate(kid.addedDate)}"`).join("\n");
    const csvContent = headers + rows;
    const blob = new Blob([csvContent], {
      type: 'text/csv'
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "kids_registry.csv";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Export Successful",
      description: "Kids registry data has been exported to CSV"
    });
  };

  return <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kids Registry</h1>
          <p className="text-muted-foreground">
            View and manage children registered through the app
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 mx-px" />
            <Input 
              placeholder="Search by name or parent..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="pl-10" 
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-1" onClick={handleExportData}>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>

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
                  <TableHead>QR Code</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKids.map(kid => (
                  <TableRow key={kid.id} className="border-t border-border">
                    <TableCell className="font-medium">{kid.name}</TableCell>
                    <TableCell>{kid.parent}</TableCell>
                    <TableCell>{formatDate(kid.birthDate)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <QrCode className="h-4 w-4" />
                        <span className="sr-only">View QR Code</span>
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewKid(kid)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePrompt(kid)} className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
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
    </div>;
}
