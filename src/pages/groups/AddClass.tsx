
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
import { CalendarIcon, Plus, X, Upload, FileText, CheckCheck, User, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
// Fixed import - importing from the properly exported membersData
import { membersData } from "@/pages/groups/Learning";

interface ClassFormValues {
  subject: string;
  description: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  minGrade: number;
  minAttendance: number;
  teacherId: number;
}

interface SessionFormValues {
  title: string;
  description: string;
  files: FileList | null;
}

interface EvaluationFormValues {
  title: string;
  description: string;
  questions: { question: string; type: "multiple" | "text" | "scale" }[];
}

interface StudentFormValues {
  studentIds: number[];
}

export default function AddClass() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState<"multiple" | "text" | "scale">("text");
  const [questions, setQuestions] = useState<{ question: string; type: "multiple" | "text" | "scale" }[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [sessions, setSessions] = useState<{ title: string; description: string; files: string[] }[]>([]);
  
  const classForm = useForm<ClassFormValues>({
    defaultValues: {
      subject: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      minGrade: 70,
      minAttendance: 80,
      teacherId: 0,
    },
  });
  
  const sessionForm = useForm<SessionFormValues>({
    defaultValues: {
      title: "",
      description: "",
      files: null,
    },
  });
  
  const evaluationForm = useForm<EvaluationFormValues>({
    defaultValues: {
      title: "",
      description: "",
      questions: [],
    },
  });
  
  const studentForm = useForm<StudentFormValues>({
    defaultValues: {
      studentIds: [],
    },
  });

  const onSubmitClass = (data: ClassFormValues) => {
    console.log("Class info saved:", data);
    toast.success("Class information saved");
    setActiveTab("sessions");
  };

  const onSubmitSession = (data: SessionFormValues) => {
    console.log("Session added:", data);
    
    // Mock file names as they can't be directly accessed in React for security reasons
    let fileNames: string[] = [];
    if (data.files && data.files.length > 0) {
      fileNames = Array.from(data.files).map(file => file.name);
    }
    
    setSessions([...sessions, {
      title: data.title,
      description: data.description,
      files: fileNames,
    }]);
    
    sessionForm.reset();
    toast.success("Session added successfully");
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { question: newQuestion, type: questionType }]);
      setNewQuestion("");
      toast.success("Question added");
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const onSubmitEvaluation = () => {
    console.log("Evaluation saved:", { 
      title: evaluationForm.getValues("title"), 
      description: evaluationForm.getValues("description"), 
      questions 
    });
    toast.success("Evaluation saved");
    setActiveTab("students");
  };

  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const onSubmitStudents = () => {
    console.log("Students added:", selectedStudents);
    toast.success(`${selectedStudents.length} students added to class`);
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Class created successfully!");
      navigate("/groups/learning");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Add New Class</h1>
            <p className="text-muted-foreground">
              Create a new class for your course
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/groups/learning")}>
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Class Setup</CardTitle>
            <CardDescription>
              Complete all tabs to finish setting up your class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="general" disabled={isSubmitting}>General</TabsTrigger>
                <TabsTrigger value="sessions" disabled={isSubmitting}>Sessions</TabsTrigger>
                <TabsTrigger value="evaluations" disabled={isSubmitting}>Evaluations</TabsTrigger>
                <TabsTrigger value="students" disabled={isSubmitting}>Students</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Form {...classForm}>
                  <form onSubmit={classForm.handleSubmit(onSubmitClass)} className="space-y-4">
                    <FormField
                      control={classForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter class name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={classForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter class description" className="min-h-32" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={classForm.control}
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
                        control={classForm.control}
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
                        control={classForm.control}
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
                        control={classForm.control}
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
                      control={classForm.control}
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
                    
                    <div className="pt-4 flex justify-end">
                      <Button type="submit">Save & Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="sessions" className="space-y-6">
                <Form {...sessionForm}>
                  <form onSubmit={sessionForm.handleSubmit(onSubmitSession)} className="space-y-4 border rounded-md p-4 bg-muted/30">
                    <h3 className="font-medium">Add Class Session</h3>
                    
                    <FormField
                      control={sessionForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Session Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter session title" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={sessionForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Summarize the class session" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={sessionForm.control}
                      name="files"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Supporting Materials</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-2">
                              <Input 
                                type="file" 
                                multiple 
                                onChange={(e) => onChange(e.target.files)}
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2 flex justify-end">
                      <Button type="submit">Add Session</Button>
                    </div>
                  </form>
                </Form>
                
                {sessions.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Scheduled Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Summary</TableHead>
                            <TableHead>Supporting Files</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessions.map((session, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{session.title}</TableCell>
                              <TableCell>{session.description}</TableCell>
                              <TableCell>
                                {session.files.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {session.files.map((file, i) => (
                                      <Badge key={i} variant="outline" className="flex items-center gap-1">
                                        <FileText className="h-3 w-3" />
                                        {file}
                                      </Badge>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">No files</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No sessions added yet
                  </div>
                )}
                
                <div className="pt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setActiveTab("general")}>
                    Back
                  </Button>
                  <Button onClick={() => setActiveTab("evaluations")}>
                    Continue
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="evaluations" className="space-y-6">
                <Form {...evaluationForm}>
                  <div className="space-y-4 border rounded-md p-4 bg-muted/30">
                    <h3 className="font-medium">Create Evaluation</h3>
                    
                    <FormField
                      control={evaluationForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Evaluation Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter evaluation title" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={evaluationForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the evaluation" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-3 pt-2">
                      <FormLabel>Questions</FormLabel>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <Input 
                            placeholder="Add a question" 
                            value={newQuestion} 
                            onChange={(e) => setNewQuestion(e.target.value)}
                          />
                        </div>
                        <Select value={questionType} onValueChange={(val) => setQuestionType(val as any)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Question type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Answer</SelectItem>
                            <SelectItem value="multiple">Multiple Choice</SelectItem>
                            <SelectItem value="scale">Scale (1-10)</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button type="button" onClick={addQuestion}>
                          <Plus size={16} /> Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
                
                {questions.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          {questions.map((q, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="space-y-1">
                                <div className="font-medium">{q.question}</div>
                                <Badge variant="outline">
                                  {q.type === "text" ? "Text Answer" : 
                                   q.type === "multiple" ? "Multiple Choice" : "Scale (1-10)"}
                                </Badge>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeQuestion(index)}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No questions added yet
                  </div>
                )}
                
                <div className="pt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setActiveTab("sessions")}>
                    Back
                  </Button>
                  <Button onClick={onSubmitEvaluation} disabled={evaluationForm.getValues("title") === ""}>
                    Continue
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="students" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add Students</CardTitle>
                    <CardDescription>
                      Select students to enroll in this class
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead style={{ width: 50 }}></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {membersData.map(member => (
                            <TableRow key={member.id}>
                              <TableCell>
                                <Checkbox 
                                  checked={selectedStudents.includes(member.id)} 
                                  onCheckedChange={() => toggleStudentSelection(member.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{member.name}</TableCell>
                              <TableCell>{member.role}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                    
                    <div className="pt-4 flex items-center justify-between">
                      <div className="text-sm">
                        {selectedStudents.length} students selected
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="pt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setActiveTab("evaluations")}>
                    Back
                  </Button>
                  <Button onClick={onSubmitStudents} disabled={isSubmitting}>
                    {isSubmitting ? "Creating Class..." : "Finish & Create Class"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
