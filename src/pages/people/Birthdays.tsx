import { useState } from "react";
import { format, parseISO, addYears, isFuture, isThisMonth } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Search, Bell, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const BIRTHDAYS_DATA = [{
  id: 1,
  name: "John Smith",
  photo: "",
  avatar: "JS",
  birthday: "1985-05-15",
  email: "john.smith@example.com"
}, {
  id: 2,
  name: "Maria Garcia",
  photo: "",
  avatar: "MG",
  birthday: "1990-05-22",
  email: "maria.garcia@example.com"
}, {
  id: 3,
  name: "Robert Johnson",
  photo: "",
  avatar: "RJ",
  birthday: "1978-05-10",
  email: "robert.j@example.com"
}, {
  id: 4,
  name: "Lisa Wang",
  photo: "",
  avatar: "LW",
  birthday: "1992-06-05",
  email: "lisa.wang@example.com"
}, {
  id: 5,
  name: "David Rodriguez",
  photo: "",
  avatar: "DR",
  birthday: "1982-07-18",
  email: "david.r@example.com"
}, {
  id: 6,
  name: "Sarah Miller",
  photo: "",
  avatar: "SM",
  birthday: "1989-05-30",
  email: "sarah.m@example.com"
}];

export default function Birthdays() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const getUpcomingBirthdays = () => {
    const today = new Date();
    const upcomingBirthdays = BIRTHDAYS_DATA.map(person => {
      const birthday = parseISO(person.birthday);
      const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      if (nextBirthday < today) {
        return {
          ...person,
          nextBirthday: addYears(nextBirthday, 1)
        };
      }
      return {
        ...person,
        nextBirthday
      };
    }).filter(person => isFuture(person.nextBirthday)).sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime()).slice(0, 3);
    return upcomingBirthdays;
  };

  const monthBirthdays = BIRTHDAYS_DATA.filter(person => {
    const birthday = parseISO(person.birthday);
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase());
    return birthday.getMonth() === selectedMonth.getMonth() && matchesSearch;
  }).sort((a, b) => {
    const dateA = parseISO(a.birthday);
    const dateB = parseISO(b.birthday);
    return dateA.getDate() - dateB.getDate();
  });

  const handleSelectPerson = (id: number) => {
    setSelectedPeople(prev => {
      const idStr = id.toString();
      if (prev.includes(idStr)) {
        return prev.filter(p => p !== idStr);
      }
      return [...prev, idStr];
    });
  };

  const handleSendNotification = () => {
    if (selectedPeople.length === 0) return;
    setIsMessageDialogOpen(true);
  };

  const handleSendPersonalizedNotification = () => {
    const selectedNames = selectedPeople
      .map(id => BIRTHDAYS_DATA.find(p => p.id.toString() === id)?.name)
      .filter(Boolean);

    toast({
      title: "Birthday Notifications Sent",
      description: `Birthday wishes have been sent to ${selectedNames.join(", ")}!`
    });

    setIsMessageDialogOpen(false);
    setNotificationMessage("");
    setSelectedPeople([]);
  };

  const handleCreateEvent = (person: typeof BIRTHDAYS_DATA[0]) => {
    const birthday = parseISO(person.birthday);
    const nextBirthday = new Date(new Date().getFullYear(), birthday.getMonth(), birthday.getDate());
    
    if (nextBirthday < new Date()) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const eventData = {
      date: format(nextBirthday, 'yyyy-MM-dd'),
      title: `Birthday - ${person.name}`,
      description: `Birthday celebration for ${person.name}`
    };

    const queryParams = new URLSearchParams(eventData);
    navigate(`/events/create?${queryParams.toString()}`);
  };

  const formatDate = (date: Date) => {
    return format(date, "MMMM d");
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(selectedMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setSelectedMonth(newMonth);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-church-primary mb-2">Birthdays</h1>
        <p className="text-church-secondary">
          Keep track of member birthdays and send them warm wishes on their special day.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input placeholder="Search by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <Button 
          variant="outline" 
          onClick={handleSendNotification}
          disabled={selectedPeople.length === 0}
        >
          <Users className="mr-2 h-4 w-4" />
          Send Notifications ({selectedPeople.length})
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Birthdays of {format(selectedMonth, 'MMMM')}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {monthBirthdays.length} birthdays this month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthBirthdays.map(person => (
                <TableRow key={person.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPeople.includes(person.id.toString())}
                      onCheckedChange={() => handleSelectPerson(person.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={person.photo} alt={person.name} />
                        <AvatarFallback>{person.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(parseISO(person.birthday))}
                    {isThisMonth(parseISO(person.birthday)) && (
                      <Badge variant="secondary" className="ml-2">This Month</Badge>
                    )}
                  </TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleSelectPerson(person.id)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCreateEvent(person)}
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Birthday Wishes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Recipients:</p>
              <p className="text-sm text-muted-foreground">
                {selectedPeople
                  .map(id => BIRTHDAYS_DATA.find(p => p.id.toString() === id)?.name)
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Personalized Message
              </label>
              <Textarea
                id="message"
                placeholder="Write your birthday message here..."
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendPersonalizedNotification}>
              Send Wishes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
