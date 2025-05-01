
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Book, FileText, Users, Award, Link as LinkIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CourseFormValues {
  name: string;
  description: string;
  targetAudience: "Kids" | "Young" | "Adult";
  certificateType: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export default function CreateCourse() {
  const navigate = useNavigate();
  const [accessLink, setAccessLink] = useState<string>("");
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      name: "",
      description: "",
      targetAudience: "Adult",
      certificateType: "Standard",
      startDate: undefined,
      endDate: undefined,
    }
  });

  const onSubmit = (data: CourseFormValues) => {
    console.log("Course created:", data);
    
    // Generate a unique access link
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    const generatedLink = `https://yourchurchapp.com/join/course/${uniqueId}`;
    setAccessLink(generatedLink);
    setIsLinkGenerated(true);
    
    toast.success("Course created successfully!");
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(accessLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Create New Course</h1>
            <p className="text-muted-foreground">
              Add course details to create a new learning opportunity
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/groups/learning")}>
            Cancel
          </Button>
        </div>

        {!isLinkGenerated ? (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>
                Enter the details for the new course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter course name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter course description" className="min-h-32" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="targetAudience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select audience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Kids">Children</SelectItem>
                              <SelectItem value="Young">Youth</SelectItem>
                              <SelectItem value="Adult">Adult</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="certificateType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificate Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select certificate type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="None">None</SelectItem>
                              <SelectItem value="Standard">Standard</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Kids">Kids</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
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
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date</FormLabel>
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
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">Create Course</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-green-600">Course Created Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4 bg-muted/50">
                <div className="flex items-center gap-3">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <p className="font-medium">Course Access Link</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Input value={accessLink} readOnly className="font-mono text-sm" />
                  <Button onClick={copyLinkToClipboard} variant="outline">Copy</Button>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Share this link with people to give them access to the course.
                </p>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/groups/learning")}>
                  Back to Courses
                </Button>
                <Button onClick={() => navigate(`/groups/learning/add-class/${Date.now().toString(36)}`)}>
                  Add First Class
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
