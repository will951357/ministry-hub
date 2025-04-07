
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CalendarIcon, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AppointmentType, appointmentTypes } from "@/types/appointment";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  date: z.date(),
  time: z.string(),
  type: z.string(),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  memberName: z.string().min(2, { message: "Member name must be at least 2 characters" }),
  notes: z.string().optional(),
  sendReminder: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateAppointment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time: "09:00",
      type: "visit",
      location: "",
      memberName: "",
      notes: "",
      sendReminder: true,
    },
  });

  const onSubmit = (data: FormData) => {
    // Format time properly
    const [hours, minutes] = data.time.split(':').map(Number);
    const appointmentDate = new Date(data.date);
    appointmentDate.setHours(hours, minutes);

    const newAppointment = {
      ...data,
      date: appointmentDate,
    };

    console.log("New appointment:", newAppointment);
    toast({
      title: "Appointment created",
      description: "The appointment has been successfully created.",
    });

    // In a real application, you would save this to your backend
    setTimeout(() => navigate("/people/appointments"), 1500);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2 p-0 h-auto"
          onClick={() => navigate("/people/appointments")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-church-primary">Create New Appointment</h1>
          <p className="text-church-secondary">
            Schedule a new pastoral appointment or meeting
          </p>
        </div>
      </div>

      <Card className="border-church-border shadow-sm">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>Enter the details for the new appointment</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Home Visit - Johnson Family" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="memberName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Member Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select appointment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Types</SelectLabel>
                              {Object.entries(appointmentTypes).map(([value, { label }]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date || new Date());
                                setDate(date || new Date());
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input type="time" className="pl-10" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional details about the appointment"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sendReminder"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Send reminder</FormLabel>
                          <FormDescription>
                            Send a reminder to the member before the appointment
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-end space-x-2 px-0">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate("/people/appointments")}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Appointment</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
