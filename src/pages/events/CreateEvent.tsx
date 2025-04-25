import React, { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, DollarSign, Users, ArrowLeft, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sampleEvents } from '@/pages/Events';
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import ChooseMemberDialog from "@/pages/people/ChooseMemberDialog";
import AssignedMemberChip from "@/pages/people/AssignedMemberChip";

interface CreateEventProps {
  defaultDate?: Date | null;
}

interface MemberType {
  id: number;
  name: string;
  email: string;
  photo?: string;
}

export function CreateEvent({ defaultDate }: CreateEventProps) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [hasAttendeeLimit, setHasAttendeeLimit] = useState(false);
  const [maxAttendees, setMaxAttendees] = useState<number>(50);
  const [price, setPrice] = useState<number>(0);
  const [hasCheckin, setHasCheckin] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [observations, setObservations] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    if (eventId) {
      const eventToEdit = sampleEvents.find(event => event.id === Number(eventId));
      if (eventToEdit) {
        setName(eventToEdit.title);
        setDescription(eventToEdit.description);
        setDate(eventToEdit.date);
        setStartTime(eventToEdit.startTime);
        setEndTime(eventToEdit.endTime);
        setLocation(eventToEdit.location);
        setHasAttendeeLimit(!!eventToEdit.maxAttendees);
        setMaxAttendees(eventToEdit.maxAttendees || 50);
        setPrice(eventToEdit.price);
        setHasCheckin(eventToEdit.hasCheckin);
        setVisibility(eventToEdit.visibility);
        setObservations('');
        setSelectedMembers(eventToEdit.responsibleMembers.map((name, index) => ({
          id: index,
          name,
          email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
          photo: undefined
        })));
      }
    }
  }, [eventId]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setDate(defaultDate || new Date());
    setStartTime('09:00');
    setEndTime('10:00');
    setLocation('');
    setHasAttendeeLimit(false);
    setMaxAttendees(50);
    setPrice(0);
    setHasCheckin(false);
    setVisibility('public');
    setObservations('');
    setSelectedMembers([]);
  };

  const handleMaxAttendeesChange = (value: string) => {
    if (value === '') {
      setMaxAttendees(0);
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setMaxAttendees(parsedValue);
      }
    }
  };

  const handlePriceChange = (value: string) => {
    if (value === '') {
      setPrice(0);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setPrice(parsedValue);
      }
    }
  };

  const handleEventAdded = (event: any) => {
    toast({
      title: "Event Added",
      description: `${event.title} has been successfully added.`,
    });
    navigate('/events');
  };

  const handleEventUpdated = (event: any) => {
    toast({
      title: "Event Updated",
      description: `${event.title} has been successfully updated.`,
    });
    navigate('/events');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedEvent = {
      id: eventId ? Number(eventId) : Math.floor(Math.random() * 1000),
      title: name,
      description,
      date,
      startTime,
      endTime,
      location,
      maxAttendees: hasAttendeeLimit ? maxAttendees : undefined,
      price,
      hasCheckin,
      visibility,
      observations,
      responsibleMembers: selectedMembers.map(member => member.name),
      attendees: eventId ? (sampleEvents.find(e => e.id === Number(eventId))?.attendees || 0) : 0,
      status: 'confirmed',
    };
    
    setFormData(updatedEvent);
    setShowConfirmDialog(true);
  };

  const handleConfirmCreate = () => {
    if (formData) {
      if (eventId) {
        handleEventUpdated(formData);
      } else {
        handleEventAdded(formData);
      }
      resetForm();
      setShowConfirmDialog(false);
    }
  };

  const handleAddMember = (member: { name: string; email: string; photo: string; id?: number }) => {
    const newMember: MemberType = {
      id: member.id || Math.random(),
      name: member.name,
      email: member.email,
      photo: member.photo
    };
    
    if (!selectedMembers.some(m => m.id === newMember.id)) {
      setSelectedMembers([...selectedMembers, newMember]);
    }
  };

  const handleRemoveMember = (memberId: number) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== memberId));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/events')}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">{eventId ? 'Edit Event' : 'Create New Event'}</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 py-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Label htmlFor="name">Event Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="maxAttendees">Attendee Limit</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="hasAttendeeLimit"
                              checked={hasAttendeeLimit}
                              onCheckedChange={setHasAttendeeLimit}
                            />
                            <Label htmlFor="hasAttendeeLimit">Enable limit</Label>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="text-muted-foreground" />
                          <Input
                            id="maxAttendees"
                            type="number"
                            placeholder="Maximum attendees"
                            value={maxAttendees}
                            onChange={(e) => handleMaxAttendeesChange(e.target.value)}
                            disabled={!hasAttendeeLimit}
                            min={1}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="price">Price</Label>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="text-muted-foreground" />
                          <Input
                            id="price"
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="hasCheckin">Check-in Required</Label>
                          <Switch
                            id="hasCheckin"
                            checked={hasCheckin}
                            onCheckedChange={setHasCheckin}
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="visibility">Visibility</Label>
                        <RadioGroup
                          id="visibility"
                          value={visibility}
                          onValueChange={(value) => setVisibility(value as 'public' | 'private')}
                        >
                          <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="public" id="public" />
                              <Label htmlFor="public">Public</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="private" id="private" />
                              <Label htmlFor="private">Private</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Label htmlFor="observations">Additional Notes</Label>
                      <Textarea
                        id="observations"
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        placeholder="Any additional information about the event"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <Label>Responsible Members</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedMembers.map((member) => (
                          <AssignedMemberChip
                            key={member.id}
                            member={{
                              name: member.name,
                              email: member.email,
                              photo: member.photo || ""
                            }}
                            onRemove={() => handleRemoveMember(member.id)}
                          />
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="gap-2"
                        onClick={() => setShowMemberDialog(true)}
                      >
                        <Users className="h-4 w-4" />
                        Add Responsible Members
                      </Button>
                    </div>
                  </div>
                  <Button type="submit">Create Event</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create this event?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCreate}>Create</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ChooseMemberDialog
        open={showMemberDialog}
        onOpenChange={setShowMemberDialog}
        onChoose={handleAddMember}
        allowMultiple={true}
      />
    </MainLayout>
  );
}

export default CreateEvent;
