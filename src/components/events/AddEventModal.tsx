
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Users, DollarSign } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventAdded: (event: any) => void;
  defaultDate?: Date | null;
}

export function AddEventModal({ open, onOpenChange, onEventAdded, defaultDate }: AddEventModalProps) {
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
  const [responsibleMembers, setResponsibleMembers] = useState('');

  // Set date when defaultDate changes
  useEffect(() => {
    if (defaultDate) {
      setDate(defaultDate);
    }
  }, [defaultDate]);

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
    setResponsibleMembers('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent = {
      id: Math.floor(Math.random() * 1000),
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
      responsibleMembers: responsibleMembers.split(',').map(m => m.trim()),
      attendees: 0,
      status: 'confirmed',
    };
    
    onEventAdded(newEvent);
    resetForm();
    onOpenChange(false);
  };

  const handleMaxAttendeesChange = (value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setMaxAttendees(parsedValue);
    }
  };

  const handlePriceChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setPrice(parsedValue);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Create a new event for your church. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
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
                    step="0.01"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    min={0}
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private</Label>
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
              <Label htmlFor="responsibleMembers">Responsible Members</Label>
              <Input
                id="responsibleMembers"
                value={responsibleMembers}
                onChange={(e) => setResponsibleMembers(e.target.value)}
                placeholder="Names separated by commas"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
