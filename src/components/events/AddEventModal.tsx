
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  DollarSign, 
  Eye, 
  EyeOff, 
  FileText,
  User,
  Check
} from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Sample member data for the responsible member selection
const members = [
  { id: 1, name: 'Pastor John', role: 'Pastor' },
  { id: 2, name: 'Jane Doe', role: 'Youth Leader' },
  { id: 3, name: 'Michael Smith', role: 'Worship Leader' },
  { id: 4, name: 'Sarah Johnson', role: 'Children\'s Ministry' },
  { id: 5, name: 'David Wilson', role: 'Elder' },
];

// Form schema for validation
const formSchema = z.object({
  title: z.string().min(3, { message: "Event name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  maxAttendees: z.string().optional().transform(val => val === "" ? undefined : parseInt(val, 10)),
  price: z.string().default("0").transform(val => parseFloat(val) || 0),
  hasCheckin: z.boolean().default(false),
  visibility: z.enum(["public", "private"]).default("public"),
  observation: z.string().optional(),
  responsibleMembers: z.array(z.number()).min(1, { message: "At least one responsible member is required" }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventAdded: (event: any) => void;
}

export function AddEventModal({ open, onOpenChange, onEventAdded }: AddEventModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      location: "",
      maxAttendees: "",
      price: "0",
      hasCheckin: false,
      visibility: "public",
      observation: "",
      responsibleMembers: [],
    },
  });

  function onSubmit(data: FormValues) {
    const eventData = {
      ...data,
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      attendees: 0,
      status: "confirmed" as const,
      createdBy: "Current User", // This would come from auth context in a real app
    };
    
    onEventAdded(eventData);
    onOpenChange(false);
    form.reset();
    setSelectedMembers([]);
  }

  // Toggle member selection
  const toggleMemberSelection = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
      form.setValue('responsibleMembers', selectedMembers.filter(id => id !== memberId));
    } else {
      const newSelectedMembers = [...selectedMembers, memberId];
      setSelectedMembers(newSelectedMembers);
      form.setValue('responsibleMembers', newSelectedMembers);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Event Name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter event description" 
                      {...field} 
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Time */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="Enter event location" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Max Attendees & Price */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxAttendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Attendees</FormLabel>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Leave blank if unlimited" 
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      Leave blank for unlimited
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormDescription>
                      Set to 0 for free events
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Check-in */}
            <FormField
              control={form.control}
              name="hasCheckin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable Check-in
                    </FormLabel>
                    <FormDescription>
                      Track attendee check-ins at the event
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {/* Visibility */}
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Visibility</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-6"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="public" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            Public
                          </div>
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="private" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          <div className="flex items-center">
                            <EyeOff className="h-4 w-4 mr-1" />
                            Private
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    {field.value === 'public' 
                      ? 'Anyone can see this event' 
                      : 'Only selected members can see this event'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Observation */}
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <div className="flex items-start">
                    <FileText className="mr-2 h-4 w-4 mt-2 text-muted-foreground" />
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes or requirements"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Responsible Members */}
            <FormField
              control={form.control}
              name="responsibleMembers"
              render={() => (
                <FormItem>
                  <FormLabel>Responsible Members</FormLabel>
                  <div className="bg-background border rounded-md overflow-hidden">
                    <div className="max-h-[200px] overflow-y-auto">
                      {members.map((member) => (
                        <div 
                          key={member.id}
                          className={cn(
                            "flex items-center justify-between p-3 border-b last:border-0 cursor-pointer hover:bg-muted/50",
                            selectedMembers.includes(member.id) && "bg-primary/10"
                          )}
                          onClick={() => toggleMemberSelection(member.id)}
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-xs text-muted-foreground">{member.role}</div>
                            </div>
                          </div>
                          {selectedMembers.includes(member.id) && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  {form.formState.errors.responsibleMembers && (
                    <FormMessage>
                      {form.formState.errors.responsibleMembers.message}
                    </FormMessage>
                  )}
                  <FormDescription>
                    Select one or more members responsible for this event
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
