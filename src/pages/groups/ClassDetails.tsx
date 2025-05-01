import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, CalendarIcon, FileText, Users, Edit, X, Check, User, Award } from "lucide-react";
import { coursesData, membersData } from "./Learning";
import { format } from "date-fns";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface QuestionChoice {
  text: string;
  isCorrect: boolean;
}

interface EvaluationQuestion {
  question: string;
  choices: QuestionChoice[];
}

interface Evaluation {
  title: string;
  description: string;
  questions: EvaluationQuestion[];
}

interface Session {
  title: string;
  description: string;
  sessionDate: Date;
  files: string[];
}

// Extended member interface to include grades and attendance
interface StudentDetail {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  attendance: number;
  averageGrade: number;
  evaluationGrades: {
    evaluationId: number;
    title: string;
    grade: number;
  }[];
  sessionAttendance: {
    sessionId: number;
    attended: boolean;
  }[];
}

const ClassDetails = () => {
  const { courseId, classId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [editMode, setEditMode] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [editingEvaluationIndex, setEditingEvaluationIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newChoices, setNewChoices] = useState<QuestionChoice[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);
  const [questions, setQuestions] = useState<EvaluationQuestion[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  // Mock data for demonstration
  const course = coursesData.find(c => c.id === Number(courseId));
  const classItem = course?.classes.find(c => c.id === Number(classId));
  const [sessions, setSessions] = useState<Session[]>([
    {
      title: "Introduction to Theology",
      description: "Overview of theological concepts and history",
      sessionDate: new Date(),
      files: ["intro-slides.pdf", "reading-list.docx"]
    },
    {
      title: "Faith Foundations",
      description: "Core principles of faith and belief systems",
      sessionDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      files: ["foundations-handout.pdf"]
    }
  ]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([
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
    }
  ]);

  // Mock student data with attendance and grades
  const [students, setStudents] = useState<StudentDetail[]>(
    membersData.slice(0, 5).map((member, index) => ({
      ...member,
      attendance: Math.floor(Math.random() * 30) + 70, // Random attendance between 70-100%
      averageGrade: Math.floor(Math.random() * 30) + 70, // Random grade between 70-100
      evaluationGrades: [
        {
          evaluationId: 1,
          title: "Midterm Assessment",
          grade: Math.floor(Math.random() * 30) + 70
        }
      ],
      sessionAttendance: sessions.map((session, sIndex) => ({
        sessionId: sIndex + 1,
        attended: Math.random() > 0.2 // 80% chance of attendance
      }))
    }))
  );

  // Setup forms
  const generalForm = useForm({
    defaultValues: {
      subject: classItem?.subject || "",
      description: classItem?.description || "",
      startDate: classItem ? new Date(classItem.startDate) : new Date(),
      endDate: classItem ? new Date(classItem.endDate) : new Date(),
      minGrade: classItem?.minGrade || 70, // Now safely accessing optional property
      minAttendance: classItem?.minAttendance || 80, // Now safely accessing optional property
      teacherId: 1
    }
  });

  const sessionForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      sessionDate: new Date(),
      files: null as unknown as FileList
    }
  });

  const evaluationForm = useForm({
    defaultValues: {
      title: "",
      description: ""
    }
  });

  if (!course || !classItem) {
    return <div>Class not found</div>;
  }

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "PPP");
  };

  const handleSaveGeneralInfo = (data: any) => {
    toast.success("General information updated");
    setEditMode(false);
  };

  const handleAddSession = (data: any) => {
    const newSession = {
      title: data.title,
      description: data.description,
      sessionDate: data.sessionDate,
      files: data.files ? Array.from(data.files).map((file: any) => file.name) : []
    };
    
    setSessions([...sessions, newSession]);
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
      const validChoices = newChoices.filter(choice => choice.text.trim());
      
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

  const handleAddEvaluation = () => {
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

    if (editingEvaluationIndex !== null) {
      // Update existing evaluation
      const updatedEvaluations = [...evaluations];
      updatedEvaluations[editingEvaluationIndex] = evaluationData;
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
    setEditingEvaluation(null);
    setEditingEvaluationIndex(null);
  };

  const editEvaluation = (index: number) => {
    const evaluation = evaluations[index];
    evaluationForm.reset({
      title: evaluation.title,
      description: evaluation.description
    });
    setQuestions([...evaluation.questions]);
    setEditingEvaluation(evaluation);
    setEditingEvaluationIndex(index);
  };

  const removeEvaluation = (index: number) => {
    const updatedEvaluations = [...evaluations];
    updatedEvaluations.splice(index, 1);
    setEvaluations(updatedEvaluations);
    toast.success("Evaluation removed");
  };

  const cancelEditEvaluation = () => {
    evaluationForm.reset();
    setQuestions([]);
    setEditingEvaluation(null);
    setEditingEvaluationIndex(null);
  };

  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleUpdateStudents = () => {
    toast.success(`${selectedStudents.length} students enrolled`);
  };

  // New function to get initial letter from name for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Function to update student attendance 
  const toggleStudentAttendance = (studentId: number, sessionId: number) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId
          ? {
              ...student,
              sessionAttendance: student.sessionAttendance.map(session =>
                session.sessionId === sessionId
                  ? { ...session, attended: !session.attended }
                  : session
              )
            }
          : student
      )
    );
    toast.success("Attendance updated");
  };

  // Function to update student grade
  const updateStudentGrade = (studentId: number, evaluationId: number, grade: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? {
              ...student,
              evaluationGrades: student.evaluationGrades.map(evalGrade =>
                evalGrade.evaluationId === evaluationId
                  ? { ...evalGrade, grade }
                  : evalGrade
              ),
              // Also update average grade
              averageGrade: Math.round(
                (student.evaluationGrades.reduce(
                  (sum, evalGrade) => sum + (evalGrade.evaluationId === evaluationId ? grade : evalGrade.grade), 
                  0
                )) / student.evaluationGrades.length
              )
            }
          : student
      )
    );
    toast.success("Grade updated");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{classItem.subject}</h1>
            <p className="text-muted-foreground">{course.name}</p>
          </div>
          <Button onClick={() => navigate("/groups/learning")}>
            Back to Courses
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="sessions">Class Sessions</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          {/* General Information Tab */}
          <TabsContent value="general" className="space-y-4">
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
                          <p>{classItem.minGrade || "70"}%</p> {/* Now safely accessing optional property */}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Presence Rate</p>
                          <p>{classItem.presenceRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Minimum Attendance</p>
                          <p>{classItem.minAttendance || "80"}%</p> {/* Now safely accessing optional property */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Class Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...sessionForm}>
                  <form onSubmit={sessionForm.handleSubmit(handleAddSession)} className="space-y-4 border rounded-md p-4 bg-muted/30">
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
                  <div>
                    <h3 className="font-medium mb-3">Scheduled Sessions</h3>
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
                            <TableCell>{formatDate(session.sessionDate)}</TableCell>
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
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No sessions added yet.</p>
                    <p className="text-sm">Use the form above to schedule a session.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Evaluations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...evaluationForm}>
                  <div className="space-y-4 border rounded-md p-4 bg-muted/30">
                    <h3 className="font-medium">
                      {editingEvaluation ? "Edit Evaluation" : "Create Evaluation"}
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
                      {editingEvaluation && (
                        <Button type="button" variant="outline" onClick={cancelEditEvaluation}>
                          Cancel
                        </Button>
                      )}
                      <Button type="button" onClick={handleAddEvaluation}>
                        {editingEvaluation ? "Update Evaluation" : "Add Evaluation"}
                      </Button>
                    </div>
                  </div>
                </Form>
                
                {evaluations.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h3 className="font-medium">Existing Evaluations</h3>
                    <div className="space-y-4">
                      {evaluations.map((evaluation, index) => (
                        <div key={index} className="border rounded-md p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-medium">{evaluation.title}</h4>
                              <p className="text-sm text-muted-foreground">{evaluation.description}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => editEvaluation(index)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-500 hover:text-red-700" 
                                onClick={() => removeEvaluation(index)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm">
                            <p className="text-muted-foreground">{evaluation.questions.length} questions</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
