
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Plus, X, Upload, FileText, CheckCheck, User, Users, Circle, CirclePlus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  sessionDate: Date | undefined;
  files: FileList | null;
}

interface QuestionChoice {
  text: string;
  isCorrect: boolean;
}

interface EvaluationQuestion {
  question: string;
  choices: QuestionChoice[];
}

interface EvaluationFormValues {
  title: string;
  description: string;
  questions: EvaluationQuestion[];
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
  const [newChoices, setNewChoices] = useState<QuestionChoice[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);
  const [questions, setQuestions] = useState<EvaluationQuestion[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [sessions, setSessions] = useState<{ title: string; description: string; sessionDate: Date | undefined; files: string[] }[]>([]);
  const [evaluations, setEvaluations] = useState<{ title: string; description: string; questions: EvaluationQuestion[] }[]>([]);
  const [currentEvaluationIndex, setCurrentEvaluationIndex] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
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
      sessionDate: undefined,
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

  React.useEffect(() => {
    // Check if we're in edit mode
    if (courseId && courseId !== "new") {
      setIsEditMode(true);
      // Here you would fetch the class data and populate the forms
      // This is just mock data for demonstration
      classForm.reset({
        subject: "Introduction to Theology",
        description: "A comprehensive overview of basic theological concepts.",
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        minGrade: 75,
        minAttendance: 85,
        teacherId: 1,
      });
      
      // Mock sessions data
      setSessions([
        {
          title: "Foundations of Faith",
          description: "Understanding the core principles of faith.",
          sessionDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          files: ["foundations.pdf", "reading_list.docx"]
        },
        {
          title: "Scripture Study Methods",
          description: "Learning effective methods for scripture study.",
          sessionDate: new Date(new Date().setDate(new Date().getDate() + 14)),
          files: ["study_guide.pdf"]
        }
      ]);
      
      // Mock evaluations data
      setEvaluations([
        {
          title: "Midterm Assessment",
          description: "Evaluation of basic theological concepts",
          questions: [
            {
              question: "Which of the following is a book in the New Testament?",
              choices: [
                { text: "Exodus", isCorrect: false },
                { text: "Matthew", isCorrect: true },
                { text: "Isaiah", isCorrect: false },
                { text: "Psalms", isCorrect: false }
              ]
            },
            {
              question: "Who wrote most of the epistles in the New Testament?",
              choices: [
                { text: "Peter", isCorrect: false },
                { text: "John", isCorrect: false },
                { text: "Paul", isCorrect: true },
                { text: "James", isCorrect: false }
              ]
            }
          ]
        },
        {
          title: "Final Assessment",
          description: "Comprehensive evaluation of the course material",
          questions: [
            {
              question: "What is the first book of the Bible?",
              choices: [
                { text: "Exodus", isCorrect: false },
                { text: "Genesis", isCorrect: true },
                { text: "Leviticus", isCorrect: false },
                { text: "Numbers", isCorrect: false }
              ]
            }
          ]
        }
      ]);
      
      // Mock selected students
      setSelectedStudents([1, 3, 5]);
    }
  }, [courseId]);

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
      sessionDate: data.sessionDate,
      files: fileNames,
    }]);
    
    sessionForm.reset();
    toast.success("Session added successfully");
  };

  const updateChoiceText = (index: number, text: string) => {
    const updatedChoices = [...newChoices];
    updatedChoices[index].text = text;
    setNewChoices(updatedChoices);
  };

  const updateChoiceCorrect = (index: number) => {
    const updatedChoices = newChoices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index
    }));
    setNewChoices(updatedChoices);
  };

  const addQuestion = () => {
    if (newQuestion.trim() && newChoices.some(choice => choice.text.trim())) {
      // Only include choices that have text
      const validChoices = newChoices.filter(choice => choice.text.trim());
      
      // Ensure at least one choice is marked as correct
      if (!validChoices.some(choice => choice.isCorrect)) {
        validChoices[0].isCorrect = true;
      }
      
      setQuestions([...questions, {
        question: newQuestion,
        choices: validChoices
      }]);
      
      setNewQuestion("");
      setNewChoices([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]);
      
      toast.success("Question added");
    } else {
      toast.error("Please enter a question and at least one choice");
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const onSubmitEvaluation = () => {
    const evaluationData = { 
      title: evaluationForm.getValues("title"), 
      description: evaluationForm.getValues("description"), 
      questions: [...questions]
    };

    if (!evaluationData.title) {
      toast.error("Please enter an evaluation title");
      return;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    if (currentEvaluationIndex !== null) {
      // Update existing evaluation
      const updatedEvaluations = [...evaluations];
      updatedEvaluations[currentEvaluationIndex] = evaluationData;
      setEvaluations(updatedEvaluations);
      toast.success("Evaluation updated");
    } else {
      // Add new evaluation
      setEvaluations([...evaluations, evaluationData]);
      toast.success("Evaluation added");
    }
    
    // Reset form
    evaluationForm.reset();
    setQuestions([]);
    setCurrentEvaluationIndex(null);
  };

  const editEvaluation = (index: number) => {
    const evaluation = evaluations[index];
    evaluationForm.reset({
      title: evaluation.title,
      description: evaluation.description
    });
    setQuestions([...evaluation.questions]);
    setCurrentEvaluationIndex(index);
  };

  const removeEvaluation = (index: number) => {
    const updatedEvaluations = [...evaluations];
    updatedEvaluations.splice(index, 1);
    setEvaluations(updatedEvaluations);
  };

  const cancelEditEvaluation = () => {
    evaluationForm.reset();
    setQuestions([]);
    setCurrentEvaluationIndex(null);
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

  const handleFinish = () => {
    const classData = classForm.getValues();
    if (!classData.subject || !classData.description || !classData.startDate || !classData.endDate) {
      toast.error("Please fill in all required fields in the General tab");
      setActiveTab("general");
      return;
    }
    
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
            <h1 className="text-2xl font-semibold">{isEditMode ? "Edit Class" : "Add New Class"}</h1>
            <p className="text-muted-foreground">
              {isEditMode ? "Update your class information" : "Create a new class for your course"}
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
              Complete the General tab to create your class. Other tabs are optional and can be updated later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="general" disabled={isSubmitting}>
                  <span className="flex items-center gap-2">
                    General
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">Required</Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="sessions" disabled={isSubmitting}>
                  <span className="flex items-center gap-2">
                    Sessions
                    <Badge variant="outline" className="bg-slate-100">Optional</Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="evaluations" disabled={isSubmitting}>
                  <span className="flex items-center gap-2">
                    Evaluations
                    <Badge variant="outline" className="bg-slate-100">Optional</Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="students" disabled={isSubmitting}>
                  <span className="flex items-center gap-2">
                    Students
                    <Badge variant="outline" className="bg-slate-100">Optional</Badge>
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Form {...classForm}>
                  <form onSubmit={classForm.handleSubmit(onSubmitClass)} className="space-y-4">
                    <FormField
                      control={classForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter class name" {...field} required />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={classForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description*</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter class description" className="min-h-32" {...field} required />
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
                            <FormLabel>Start Date*</FormLabel>
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
                            <FormLabel>End Date*</FormLabel>
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
                            <FormLabel>Minimum Grade (%)*</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={100} 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value))} 
                                required
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
                            <FormLabel>Minimum Attendance (%)*</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0} 
                                max={100} 
                                {...field} 
                                onChange={e => field.onChange(parseInt(e.target.value))} 
                                required
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
                          <FormLabel>Teacher*</FormLabel>
                          <Select 
                            onValueChange={(value) => field.onChange(parseInt(value))} 
                            defaultValue={field.value.toString()}
                            required
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
                    
                    <div className="pt-4 flex justify-between">
                      <FormDescription>
                        * Required fields
                      </FormDescription>
                      <div className="flex gap-2">
                        {!isEditMode && (
                          <Button variant="outline" onClick={handleFinish}>
                            Save & Create Class
                          </Button>
                        )}
                        <Button type="submit">Save & Continue</Button>
                      </div>
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
                      name="sessionDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Session Date</FormLabel>
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
                            <TableHead>Date</TableHead>
                            <TableHead>Summary</TableHead>
                            <TableHead>Supporting Files</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessions.map((session, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{session.title}</TableCell>
                              <TableCell>{session.sessionDate ? format(session.sessionDate, "PPP") : "No date set"}</TableCell>
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
                    <h3 className="font-medium">
                      {currentEvaluationIndex !== null ? "Edit Evaluation" : "Create Evaluation"}
                    </h3>
                    
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
                      <FormLabel>Add Multiple Choice Question</FormLabel>
                      <div className="space-y-4">
                        <Input 
                          placeholder="Enter your question" 
                          value={newQuestion} 
                          onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        
                        <div className="space-y-3">
                          <FormLabel>Choices (select the correct answer)</FormLabel>
                          {newChoices.map((choice, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <RadioGroup 
                                value={choice.isCorrect ? index.toString() : undefined}
                                onValueChange={() => updateChoiceCorrect(index)}
                                className="flex-shrink-0"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value={index.toString()} />
                                </div>
                              </RadioGroup>
                              <Input 
                                placeholder={`Choice ${index + 1}`} 
                                value={choice.text} 
                                onChange={(e) => updateChoiceText(index, e.target.value)}
                                className="flex-grow"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-2">
                        <Button type="button" onClick={addQuestion}>
                          Add Question
                        </Button>
                      </div>
                    </div>

                    {questions.length > 0 && (
                      <div className="space-y-4 border-t pt-4 mt-4">
                        <h4 className="font-medium">Questions for this evaluation</h4>
                        <div className="space-y-3">
                          {questions.map((q, index) => (
                            <div key={index} className="p-3 border rounded-md space-y-2">
                              <div className="flex items-start justify-between">
                                <div className="font-medium">{q.question}</div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeQuestion(index)}
                                  className="h-6 w-6 p-0"
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                              <div className="pl-3 space-y-1 text-sm">
                                {q.choices.map((choice, choiceIndex) => (
                                  <div key={choiceIndex} className="flex items-center gap-2">
                                    <div className={cn(
                                      "w-5 h-5 rounded-full flex items-center justify-center text-xs border",
                                      choice.isCorrect ? "bg-green-500 text-white border-green-500" : "border-gray-300"
                                    )}>
                                      {String.fromCharCode(65 + choiceIndex)}
                                    </div>
                                    <div>{choice.text}</div>
                                    {choice.isCorrect && (
                                      <Badge className="ml-1 bg-green-100 text-green-800 hover:bg-green-100">
                                        Correct
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 flex justify-end gap-2">
                      {currentEvaluationIndex !== null && (
                        <Button type="button" variant="outline" onClick={cancelEditEvaluation}>
                          Cancel
                        </Button>
                      )}
                      <Button type="button" onClick={onSubmitEvaluation}>
                        {currentEvaluationIndex !== null ? "Update Evaluation" : "Add Evaluation"}
                      </Button>
                    </div>
                  </div>
                </Form>
                
                {evaluations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Evaluations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {evaluations.map((evaluation, index) => (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-medium">{evaluation.title}</h3>
                                <p className="text-sm text-muted-foreground">{evaluation.description}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => editEvaluation(index)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => removeEvaluation(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">{evaluation.questions.length} questions</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="pt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setActiveTab("sessions")}>
                    Back
                  </Button>
                  <Button onClick={() => setActiveTab("students")}>
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

