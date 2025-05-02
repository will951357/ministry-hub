
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Check, Edit, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ClassGeneralInfoProps {
  classItem: any;
  membersData: any[];
}

export const ClassGeneralInfo = ({ classItem, membersData }: ClassGeneralInfoProps) => {
  const [editMode, setEditMode] = useState(false);
  
  const generalForm = useForm({
    defaultValues: {
      subject: classItem?.subject || "",
      description: classItem?.description || "",
      startDate: classItem ? new Date(classItem.startDate) : new Date(),
      endDate: classItem ? new Date(classItem.endDate) : new Date(),
      minGrade: classItem?.minGrade || 70, 
      minAttendance: classItem?.minAttendance || 80,
      teacherId: 1
    }
  });

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "PPP");
  };

  const handleSaveGeneralInfo = (data: any) => {
    toast.success("General information updated");
    setEditMode(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Class Details</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Edit Details
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {editMode ? (
          <Form {...generalForm}>
            <form onSubmit={generalForm.handleSubmit(handleSaveGeneralInfo)} className="space-y-4">
              <FormField
                control={generalForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={generalForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={generalForm.control}
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
                  control={generalForm.control}
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={generalForm.control}
                  name="minGrade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Grade (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0} 
                          max={100} 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={generalForm.control}
                  name="minAttendance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Attendance (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0} 
                          max={100} 
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={generalForm.control}
                name="teacherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {membersData.map(member => (
                          <SelectItem key={member.id} value={member.id.toString()}>
                            {member.name} ({member.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2 mt-4">
                <Button type="submit" className="flex items-center">
                  <Check className="h-4 w-4 mr-1" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Class Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Teacher</p>
                  <p>{classItem.teacher}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p>{formatDate(classItem.startDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p>{formatDate(classItem.endDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{classItem.description}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Statistics</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Students</p>
                  <p>{classItem.students}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Grade</p>
                  <p>{classItem.averageGrade}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Minimum Grade</p>
                  <p>{classItem.minGrade || "70"}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Presence Rate</p>
                  <p>{classItem.presenceRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Minimum Attendance</p>
                  <p>{classItem.minAttendance || "80"}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
