
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar as CalendarIcon, Phone, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Define the form schema with Zod
const memberFormSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone1: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  phone2: z.string().optional(),
  birthday: z.date({
    required_error: "Birthday is required.",
  }),
  cpf: z.string().min(11, { message: "CPF must be at least 11 characters." }),
  maritalStatus: z.string({
    required_error: "Please select a marital status.",
  }),
  nationality: z.string().min(2, { message: "Nationality must be at least 2 characters." }),
  naturality: z.string().min(2, { message: "Naturality must be at least 2 characters." }),
  profile: z.string({
    required_error: "Please select a profile.",
  }),
  entranceDate: z.date({
    required_error: "Entrance date is required.",
  }),
  wasBaptized: z.string(),
  baptismType: z.string().optional(),
  baptismDate: z.date().optional(),
});

export type MemberFormValues = z.infer<typeof memberFormSchema>;

type MemberFormProps = {
  onSuccess: () => void;
  initialData?: MemberFormValues;
  isEditing?: boolean;
};

export function NewMemberForm({ onSuccess, initialData, isEditing = false }: MemberFormProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Initialize the form
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: initialData || {
      fullName: "",
      email: "",
      phone1: "",
      phone2: "",
      cpf: "",
      nationality: "",
      naturality: "",
      maritalStatus: "single",
      profile: "member",
      wasBaptized: "no",
    },
  });

  const wasBaptized = form.watch("wasBaptized");

  function onSubmit(data: MemberFormValues) {
    // In a real app, this would send data to your backend
    console.log(data);
    
    // Call the success callback
    onSuccess();
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="personal">Personal Data</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="ecclesiastical">Ecclesiastical Data</TabsTrigger>
          </TabsList>

          {/* Personal Data Tab - Now first */}
          <TabsContent value="personal" className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  {photoPreview ? (
                    <AvatarImage src={photoPreview} alt="Preview" />
                  ) : (
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 cursor-pointer">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
              </div>
            </div>

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complete Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Your full name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Birthday</FormLabel>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your CPF" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Your nationality" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="naturality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naturality</FormLabel>
                    <FormControl>
                      <Input placeholder="Your city of birth" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          {/* Contact Tab - Now second */}
          <TabsContent value="contact" className="space-y-4">
            <FormField
              control={form.control}
              name="phone1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone 1</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Your primary phone number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone 2 (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Your secondary phone number" {...field} />
                    </div>
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-8" placeholder="Your email address" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Ecclesiastical Data Tab - Now third */}
          <TabsContent value="ecclesiastical" className="space-y-4">
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select profile" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="pastor">Pastor</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                      <SelectItem value="leader">Leader</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entranceDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Entrance Date</FormLabel>
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
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wasBaptized"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Was Baptized?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {wasBaptized === "yes" && (
              <>
                <FormField
                  control={form.control}
                  name="baptismType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baptism Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select baptism type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="immersion">Immersion</SelectItem>
                          <SelectItem value="sprinkling">Sprinkling</SelectItem>
                          <SelectItem value="pouring">Pouring</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="baptismDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Baptism Date</FormLabel>
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
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-church-primary hover:bg-church-accent text-white">
            {isEditing ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
