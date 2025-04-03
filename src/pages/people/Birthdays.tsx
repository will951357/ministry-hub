
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Bell, Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data for birthdays
const BIRTHDAYS_DATA = [
  {
    id: 1,
    name: "John Smith",
    photo: "",
    avatar: "JS",
    birthday: "1985-05-15",
    email: "john.smith@example.com"
  },
  {
    id: 2,
    name: "Maria Garcia",
    photo: "",
    avatar: "MG",
    birthday: "1990-05-22",
    email: "maria.garcia@example.com"
  },
  {
    id: 3,
    name: "Robert Johnson",
    photo: "",
    avatar: "RJ",
    birthday: "1978-05-10",
    email: "robert.j@example.com"
  },
  {
    id: 4,
    name: "Lisa Wang",
    photo: "",
    avatar: "LW",
    birthday: "1992-06-05",
    email: "lisa.wang@example.com"
  },
  {
    id: 5,
    name: "David Rodriguez",
    photo: "",
    avatar: "DR",
    birthday: "1982-07-18",
    email: "david.r@example.com"
  },
  {
    id: 6,
    name: "Sarah Miller",
    photo: "",
    avatar: "SM",
    birthday: "1989-05-30",
    email: "sarah.m@example.com"
  }
];

export default function Birthdays() {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    description: "",
    personId: 0
  });
  const { toast } = useToast();

  // Filter birthdays for the selected month
  const filteredBirthdays = BIRTHDAYS_DATA.filter(person => {
    const birthdayDate = parseISO(person.birthday);
    return birthdayDate.getMonth() === selectedMonth.getMonth();
  });

  // Function to handle month navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(selectedMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setSelectedMonth(newMonth);
  };

  // Function to check if a date has birthdays
  const hasBirthdays = (date: Date) => {
    return BIRTHDAYS_DATA.some(person => {
      const birthdayDate = parseISO(person.birthday);
      return birthdayDate.getDate() === date.getDate() && 
             birthdayDate.getMonth() === date.getMonth();
    });
  };

  // Function to toggle member selection for notifications
  const toggleMemberSelection = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(memberId => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  // Function to send notifications to selected members
  const sendNotification = () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No Members Selected",
        description: "Please select at least one member to send a notification.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call an API to send notifications
    console.log(`Sending "${notificationMessage}" to members:`, 
      selectedMembers.map(id => BIRTHDAYS_DATA.find(p => p.id === id)?.name).join(", ")
    );
    
    toast({
      title: "Notification Sent",
      description: `Birthday greeting sent to ${selectedMembers.length} member(s).`
    });
    
    setNotificationMessage("");
    setSelectedMembers([]);
    setShowNotificationDialog(false);
  };

  // Function to open create event dialog from a birthday person
  const openCreateEventDialog = (person: typeof BIRTHDAYS_DATA[0]) => {
    const birthdayDate = parseISO(person.birthday);
    // Use current year for the event
    const currentYear = new Date().getFullYear();
    const eventDate = new Date(
      currentYear,
      birthdayDate.getMonth(),
      birthdayDate.getDate()
    );
    
    setEventDetails({
      name: `${person.name}'s Birthday Celebration`,
      date: format(eventDate, "yyyy-MM-dd"),
      description: `Birthday celebration for ${person.name}`,
      personId: person.id
    });
    
    setShowCreateEventDialog(true);
  };

  // Function to create an event
  const createEvent = () => {
    // In a real app, this would call an API to create the event
    console.log("Creating event:", eventDetails);
    
    toast({
      title: "Event Created",
      description: "Birthday event has been successfully created."
    });
    
    setShowCreateEventDialog(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-church-primary mb-2">Birthdays</h1>
        <p className="text-church-secondary">
          View upcoming birthdays and set up automatic birthday greetings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mini calendar section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Birthday Calendar</CardTitle>
              <div className="flex space-x-1">
                <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {format(selectedMonth, "MMMM yyyy")}
            </p>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="default"
              month={selectedMonth}
              onMonthChange={setSelectedMonth}
              modifiers={{
                hasBirthday: (date) => hasBirthdays(date),
              }}
              modifiersStyles={{
                hasBirthday: { backgroundColor: "#fce7f3", fontWeight: "bold", color: "#db2777" }
              }}
              className="rounded-md border shadow-sm"
            />
            <div className="mt-4">
              <Badge variant="outline" className="bg-pink-50 text-pink-600 border-pink-200">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{filteredBirthdays.length} birthdays this month</span>
                </span>
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Birthday list section */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Birthdays in {format(selectedMonth, "MMMM")}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredBirthdays.length} members celebrating their birthday
              </p>
            </div>
            <Button 
              onClick={() => setShowNotificationDialog(true)}
              disabled={filteredBirthdays.length === 0}
            >
              <Bell className="mr-2 h-4 w-4" />
              Send Birthday Wishes
            </Button>
          </CardHeader>
          <CardContent>
            {filteredBirthdays.length > 0 ? (
              <div className="space-y-4">
                {filteredBirthdays.map((person) => (
                  <div 
                    key={person.id}
                    className="flex items-start justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={person.photo} alt={person.name} />
                          <AvatarFallback>{person.avatar}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <h3 className="font-medium text-church-primary">{person.name}</h3>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(person.birthday), "MMMM d")}
                            <span className="text-xs ml-1 text-gray-400">
                              ({format(parseISO(person.birthday), "yyyy")})
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-church-primary focus:ring-church-accent h-4 w-4"
                        onChange={() => toggleMemberSelection(person.id)}
                        checked={selectedMembers.includes(person.id)}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openCreateEventDialog(person)}
                      >
                        <Calendar className="mr-2 h-3.5 w-3.5" />
                        Create Event
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No birthdays in {format(selectedMonth, "MMMM")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Send Notification Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Birthday Wishes</DialogTitle>
            <DialogDescription>
              Send a birthday notification to {selectedMembers.length || "selected"} members.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm text-church-secondary block mb-2">
                Recipients ({selectedMembers.length} selected)
              </label>
              <div className="max-h-32 overflow-y-auto border rounded-md p-2 text-sm">
                {selectedMembers.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedMembers.map(id => {
                      const person = BIRTHDAYS_DATA.find(p => p.id === id);
                      return person ? (
                        <li key={id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={person.photo} alt={person.name} />
                            <AvatarFallback className="text-xs">{person.avatar}</AvatarFallback>
                          </Avatar>
                          <span>{person.name}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No members selected</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm text-church-secondary block mb-2">
                Birthday Message
              </label>
              <textarea 
                className="w-full rounded-md border border-church-border p-2 text-church-primary h-32" 
                placeholder="Enter your birthday wishes..."
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={sendNotification} 
              className="bg-church-primary hover:bg-church-accent text-white"
              disabled={!notificationMessage.trim() || selectedMembers.length === 0}
            >
              Send Wishes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog open={showCreateEventDialog} onOpenChange={setShowCreateEventDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Birthday Event</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="text-sm text-church-secondary block mb-2">
                Event Name
              </label>
              <Input 
                value={eventDetails.name}
                onChange={(e) => setEventDetails({...eventDetails, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-church-secondary block mb-2">
                Event Date
              </label>
              <Input 
                type="date"
                value={eventDetails.date}
                onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm text-church-secondary block mb-2">
                Description
              </label>
              <textarea 
                className="w-full rounded-md border border-church-border p-2 text-church-primary h-24" 
                value={eventDetails.description}
                onChange={(e) => setEventDetails({...eventDetails, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateEventDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={createEvent}
              className="bg-church-primary hover:bg-church-accent text-white"
              disabled={!eventDetails.name.trim() || !eventDetails.date}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
