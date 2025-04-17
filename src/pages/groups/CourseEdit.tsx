
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  FileText, 
  CalendarIcon, 
  Clock, 
  Users, 
  Award, 
  ClipboardEdit, 
  BookOpen, 
  UserCheck,
  CheckCircle2,
  File,
  Upload,
  Edit
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Class {
  id: number;
  subject: string;
  date: string;
  sideMaterial?: string;
  content?: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  status: "active" | "upcoming" | "completed";
  startDate: string;
  endDate: string;
  dayOfWeek: string;
  maxApplicants: number;
  currentApplicants: number;
  minAverageGrade: number;
  certificateType: string;
  targetAudience: "Kids" | "Young" | "Adult";
  sideMaterials: string[];
  classes: Class[];
  responsibleMembers: Member[];
}

interface Student {
  id: number;
  name: string;
  email: string;
  attendance: {
    classId: number;
    present: boolean;
  }[];
  grades: {
    evaluationId: number;
    score: number;
  }[];
  averageGrade: number;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
}

interface Evaluation {
  id: number;
  title: string;
  description: string;
  date: string;
  questions: Question[];
}

// Sample data for members (used from the Learning component)
const membersData: Member[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Pastor",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Youth Leader",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    role: "Elder",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Rebecca Davis",
    email: "rebecca.d@example.com",
    role: "Sunday School Teacher",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    role: "Deacon",
    avatar: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Amanda Miller",
    email: "amanda.m@example.com",
    role: "Worship Leader",
    avatar: "/placeholder.svg"
  }
];

// Sample data for courses (used from the Learning component)
const coursesData: Course[] = [
  {
    id: 1,
    name: "Bible Study Foundations",
    description: "An introductory course on Bible study methods and interpretation.",
    status: "active",
    startDate: "2025-05-10",
    endDate: "2025-08-10",
    dayOfWeek: "Sunday",
    maxApplicants: 30,
    currentApplicants: 12,
    minAverageGrade: 70,
    certificateType: "Standard",
    targetAudience: "Adult",
    sideMaterials: ["Study Guide", "Workbook"],
    classes: [
      {
        id: 1,
        subject: "Introduction to Bible Study",
        date: "2025-05-10",
        sideMaterial: "Introduction Handout",
        content: "In this class, we will introduce the basic principles of Bible study and interpretation..."
      },
      {
        id: 2,
        subject: "Hermeneutics",
        date: "2025-05-17",
        sideMaterial: "Interpretation Guide"
      }
    ],
    responsibleMembers: [membersData[0], membersData[3]]
  },
  {
    id: 2,
    name: "Leadership Training",
    description: "Developing biblical leadership skills for ministry.",
    status: "active",
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    dayOfWeek: "Wednesday",
    maxApplicants: 20,
    currentApplicants: 15,
    minAverageGrade: 75,
    certificateType: "Advanced",
    targetAudience: "Adult",
    sideMaterials: ["Leadership Manual", "Case Studies"],
    classes: [
      {
        id: 1,
        subject: "Servant Leadership",
        date: "2025-06-15",
        sideMaterial: "Leadership Principles"
      }
    ],
    responsibleMembers: [membersData[0], membersData[2]]
  },
  {
    id: 3,
    name: "Children's Bible Stories",
    description: "Fun and engaging Bible storytelling for children.",
    status: "upcoming",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    dayOfWeek: "Saturday",
    maxApplicants: 25,
    currentApplicants: 0,
    minAverageGrade: 60,
    certificateType: "Kids",
    targetAudience: "Kids",
    sideMaterials: ["Activity Book", "Coloring Pages"],
    classes: [],
    responsibleMembers: [membersData[3], membersData[5]]
  },
  {
    id: 4,
    name: "Youth Discipleship",
    description: "Discipleship program designed specifically for teenagers.",
    status: "active",
    startDate: "2025-05-05",
    endDate: "2025-08-05",
    dayOfWeek: "Friday",
    maxApplicants: 35,
    currentApplicants: 28,
    minAverageGrade: 65,
    certificateType: "Standard",
    targetAudience: "Young",
    sideMaterials: ["Discussion Guide", "Media Resources"],
    classes: [
      {
        id: 1,
        subject: "Identity in Christ",
        date: "2025-05-05",
        sideMaterial: "Workbook"
      }
    ],
    responsibleMembers: [membersData[1], membersData[4]]
  },
  {
    id: 5,
    name: "Marriage Enrichment",
    description: "Strengthening marriages through biblical principles.",
    status: "completed",
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    dayOfWeek: "Saturday",
    maxApplicants: 20,
    currentApplicants: 18,
    minAverageGrade: 70,
    certificateType: "Advanced",
    targetAudience: "Adult",
    sideMaterials: ["Workbook", "Video Series"],
    classes: [
      {
        id: 1,
        subject: "Communication",
        date: "2025-01-10",
        sideMaterial: "Communication Guide"
      },
      {
        id: 2,
        subject: "Conflict Resolution",
        date: "2025-01-17",
        sideMaterial: "Conflict Resolution Workbook"
      }
    ],
    responsibleMembers: [membersData[0], membersData[1]]
  },
  {
    id: 6,
    name: "Prayer Workshop",
    description: "Developing a deeper prayer life and understanding.",
    status: "upcoming",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    dayOfWeek: "Tuesday",
    maxApplicants: 30,
    currentApplicants: 5,
    minAverageGrade: 60,
    certificateType: "Standard",
    targetAudience: "Adult",
    sideMaterials: ["Prayer Guide"],
    classes: [],
    responsibleMembers: [membersData[2], membersData[5]]
  }
];

// Sample students data
const studentsData: Student[] = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.t@example.com",
    attendance: [
      { classId: 1, present: true },
      { classId: 2, present: true }
    ],
    grades: [
      { evaluationId: 1, score: 85 }
    ],
    averageGrade: 85
  },
  {
    id: 2,
    name: "James Wilson",
    email: "james.w@example.com",
    attendance: [
      { classId: 1, present: true },
      { classId: 2, present: false }
    ],
    grades: [
      { evaluationId: 1, score: 72 }
    ],
    averageGrade: 72
  },
  {
    id: 3,
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    attendance: [
      { classId: 1, present: true },
      { classId: 2, present: true }
    ],
    grades: [
      { evaluationId: 1, score: 95 }
    ],
    averageGrade: 95
  }
];

// Sample evaluations data
const evaluationsData: Evaluation[] = [
  {
    id: 1,
    title: "Module 1 Quiz",
    description: "Basic principles of Bible study",
    date: "2025-05-24",
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of hermeneutics?",
        options: [
          "To translate the Bible into different languages",
          "To interpret and understand Biblical texts",
          "To memorize Biblical passages",
          "To identify the authors of Biblical texts"
        ],
        correctOption: 1
      },
      {
        id: 2,
        question: "Which of the following is NOT a valid Bible study method?",
        options: [
          "Inductive study",
          "Deductive study",
          "Historical context analysis",
          "Predictive interpretation"
        ],
        correctOption: 3
      }
    ]
  }
];

interface ClassContentFormValues {
  content: string;
}

interface ClassMaterialFormValues {
  materialName: string;
  file?: File;
}

interface EvaluationFormValues {
  title: string;
  description: string;
  date: Date | undefined;
  questions: {
    question: string;
    options: string[];
    correctOption: number;
  }[];
}

export default function CourseEdit() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isAddingClassContent, setIsAddingClassContent] = useState(false);
  const [isAddingClassMaterial, setIsAddingClassMaterial] = useState(false);
  const [isEditingClassContent, setIsEditingClassContent] = useState(false);
  const [isCreatingEvaluation, setIsCreatingEvaluation] = useState(false);
  const [isViewingEvaluation, setIsViewingEvaluation] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [newQuestion, setNewQuestion] = useState({ question: "", options: ["", "", "", ""], correctOption: 0 });
  
  // Find the course based on courseId
  const course = coursesData.find(c => c.id === parseInt(courseId || "0")) || null;
  
  if (!course) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-4">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/groups/learning")}>Go Back to Courses</Button>
        </div>
      </MainLayout>
    );
  }
  
  const contentForm = useForm<ClassContentFormValues>({
    defaultValues: {
      content: selectedClass?.content || ""
    }
  });
  
  const materialForm = useForm<ClassMaterialFormValues>({
    defaultValues: {
      materialName: ""
    }
  });
  
  const evaluationForm = useForm<EvaluationFormValues>({
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      questions: []
    }
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'upcoming':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  const handleSaveBasicInfo = () => {
    toast.success("Course information saved successfully");
  };
  
  const handleClassSelect = (classItem: Class) => {
    setSelectedClass(classItem);
  };
  
  const handleAddClassContent = (data: ClassContentFormValues) => {
    if (selectedClass) {
      // In a real app, this would update the backend
      selectedClass.content = data.content;
      setIsAddingClassContent(false);
      setIsEditingClassContent(false);
      toast.success("Class content updated successfully");
    }
  };
  
  const handleAddClassMaterial = (data: ClassMaterialFormValues) => {
    if (selectedClass) {
      // In a real app, this would upload the file to the backend
      selectedClass.sideMaterial = data.materialName;
      setIsAddingClassMaterial(false);
      toast.success("Material added to class successfully");
    }
  };
  
  const handleAddOption = () => {
    setNewQuestion({
      ...newQuestion,
      options: [...newQuestion.options, ""]
    });
  };
  
  const handleRemoveOption = (index: number) => {
    const options = [...newQuestion.options];
    options.splice(index, 1);
    
    // Adjust correctOption if needed
    let correctOption = newQuestion.correctOption;
    if (index === correctOption) {
      correctOption = 0;
    } else if (index < correctOption) {
      correctOption--;
    }
    
    setNewQuestion({
      ...newQuestion,
      options,
      correctOption
    });
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const options = [...newQuestion.options];
    options[index] = value;
    setNewQuestion({
      ...newQuestion,
      options
    });
  };
  
  const handleAddQuestion = () => {
    const questions = [...evaluationForm.getValues().questions];
    questions.push({
      question: newQuestion.question,
      options: newQuestion.options,
      correctOption: newQuestion.correctOption
    });
    
    evaluationForm.setValue("questions", questions);
    setNewQuestion({ question: "", options: ["", "", "", ""], correctOption: 0 });
  };
  
  const handleRemoveQuestion = (index: number) => {
    const questions = [...evaluationForm.getValues().questions];
    questions.splice(index, 1);
    evaluationForm.setValue("questions", questions);
  };
  
  const handleCreateEvaluation = (data: EvaluationFormValues) => {
    if (!data.date) return;
    
    // In a real app, this would create a new evaluation in the backend
    const formattedDate = format(data.date, "yyyy-MM-dd");
    
    const newEvaluation: Evaluation = {
      id: evaluationsData.length + 1,
      title: data.title,
      description: data.description,
      date: formattedDate,
      questions: data.questions.map((q, index) => ({
        id: index + 1,
        question: q.question,
        options: q.options,
        correctOption: q.correctOption
      }))
    };
    
    evaluationsData.push(newEvaluation);
    setIsCreatingEvaluation(false);
    evaluationForm.reset();
    toast.success("Evaluation created successfully");
  };
  
  const handleViewEvaluation = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation);
    setIsViewingEvaluation(true);
  };
  
  const calculateAttendanceRate = (studentId: number) => {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return "0%";
    
    const totalClasses = course.classes.length;
    const attendedClasses = student.attendance.filter(a => a.present).length;
    
    return `${Math.round((attendedClasses / totalClasses) * 100)}%`;
  };
  
  const getAttendanceStatus = (studentId: number, classId: number) => {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return false;
    
    const attendance = student.attendance.find(a => a.classId === classId);
    return attendance?.present || false;
  };
  
  const toggleAttendance = (studentId: number, classId: number) => {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;
    
    const attendanceIndex = student.attendance.findIndex(a => a.classId === classId);
    
    if (attendanceIndex >= 0) {
      student.attendance[attendanceIndex].present = !student.attendance[attendanceIndex].present;
    } else {
      student.attendance.push({ classId, present: true });
    }
    
    toast.success(`Attendance updated for ${student.name}`);
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/groups/learning")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-church-primary">{course.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant={getStatusBadgeVariant(course.status)}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {course.targetAudience} · {course.certificateType} Certificate
              </span>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="classes">Classes & Content</TabsTrigger>
            <TabsTrigger value="evaluations">Evaluations</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
                <CardDescription>General information about the course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Course Name</FormLabel>
                      <Input defaultValue={course.name} />
                    </div>
                    
                    <div>
                      <FormLabel>Description</FormLabel>
                      <Textarea 
                        defaultValue={course.description} 
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Target Audience</FormLabel>
                        <Input defaultValue={course.targetAudience} disabled />
                      </div>
                      
                      <div>
                        <FormLabel>Certificate Type</FormLabel>
                        <Input defaultValue={course.certificateType} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Start Date</FormLabel>
                        <Input 
                          defaultValue={formatDate(course.startDate)} 
                          disabled
                        />
                      </div>
                      
                      <div>
                        <FormLabel>End Date</FormLabel>
                        <Input 
                          defaultValue={formatDate(course.endDate)} 
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Day of Week</FormLabel>
                        <Input defaultValue={course.dayOfWeek} />
                      </div>
                      
                      <div>
                        <FormLabel>Status</FormLabel>
                        <Input 
                          defaultValue={course.status.charAt(0).toUpperCase() + course.status.slice(1)} 
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Max Applicants</FormLabel>
                        <Input 
                          type="number" 
                          defaultValue={course.maxApplicants.toString()} 
                        />
                      </div>
                      
                      <div>
                        <FormLabel>Current Applicants</FormLabel>
                        <Input 
                          defaultValue={course.currentApplicants.toString()} 
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div>
                      <FormLabel>Minimum Average Grade (%)</FormLabel>
                      <Input 
                        type="number"
                        defaultValue={course.minAverageGrade.toString()} 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <FormLabel>Responsible Members</FormLabel>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {course.responsibleMembers.map((member) => (
                      <Badge key={member.id} variant="outline" className="flex items-center gap-1 p-1.5">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                          {member.avatar ? 
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : 
                            <UserCheck size={12} />
                          }
                        </div>
                        <span>{member.name}</span>
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="h-8">
                      <Plus size={14} className="mr-1" />
                      Add Member
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveBasicInfo}>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="classes" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl">Classes</CardTitle>
                  <CardDescription>
                    {course.classes.length} {course.classes.length === 1 ? "class" : "classes"} scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {course.classes.map((classItem) => (
                      <div 
                        key={classItem.id}
                        className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedClass?.id === classItem.id ? "bg-muted/50" : ""
                        }`}
                        onClick={() => handleClassSelect(classItem)}
                      >
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <CalendarIcon size={14} />
                          <span>{formatDate(classItem.date)}</span>
                        </div>
                        {classItem.content && (
                          <Badge variant="outline" className="mt-2">
                            <BookOpen size={12} className="mr-1" />
                            Has Content
                          </Badge>
                        )}
                        {classItem.sideMaterial && (
                          <Badge variant="outline" className="mt-2 ml-2">
                            <FileText size={12} className="mr-1" />
                            Has Material
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-3 border-t">
                  <Button className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add New Class
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="lg:col-span-2">
                {selectedClass ? (
                  <>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedClass.subject}</CardTitle>
                        <CardDescription>
                          Scheduled for {formatDate(selectedClass.date)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <CalendarIcon size={14} className="mr-1" />
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Class Content</h3>
                        {selectedClass.content ? (
                          <div className="relative">
                            <div className="p-4 border rounded-md bg-muted/10 prose max-w-full">
                              <div dangerouslySetInnerHTML={{ __html: selectedClass.content.replace(/\n/g, '<br/>') }} />
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="absolute top-2 right-2"
                              onClick={() => {
                                contentForm.setValue("content", selectedClass.content || "");
                                setIsEditingClassContent(true);
                              }}
                            >
                              <Edit size={14} />
                            </Button>
                          </div>
                        ) : (
                          <div className="p-6 border rounded-md bg-muted/10 flex flex-col items-center justify-center">
                            <BookOpen className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground text-center mb-4">No content has been added to this class yet.</p>
                            <Button onClick={() => setIsAddingClassContent(true)}>
                              <Plus size={16} className="mr-2" />
                              Add Content
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Class Materials</h3>
                        {selectedClass.sideMaterial ? (
                          <div className="p-4 border rounded-md bg-muted/10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                <span>{selectedClass.sideMaterial}</span>
                              </div>
                              <Button size="sm" variant="outline">Download</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 border rounded-md bg-muted/10 flex flex-col items-center justify-center">
                            <File className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground text-center mb-4">No materials have been added to this class yet.</p>
                            <Button onClick={() => setIsAddingClassMaterial(true)}>
                              <Upload size={16} className="mr-2" />
                              Add Material
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">Select a Class</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      Select a class from the list to view or edit its content and materials.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="evaluations" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Evaluations & Quizzes</CardTitle>
                    <CardDescription>Manage course evaluations and quizzes</CardDescription>
                  </div>
                  <Button onClick={() => setIsCreatingEvaluation(true)}>
                    <Plus size={16} className="mr-2" />
                    Create Evaluation
                  </Button>
                </CardHeader>
                <CardContent>
                  {evaluationsData.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Questions</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evaluationsData.map((evaluation) => (
                          <TableRow key={evaluation.id}>
                            <TableCell className="font-medium">{evaluation.title}</TableCell>
                            <TableCell>{evaluation.description}</TableCell>
                            <TableCell>{formatDate(evaluation.date)}</TableCell>
                            <TableCell>{evaluation.questions.length}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewEvaluation(evaluation)}
                                >
                                  View
                                </Button>
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Delete</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-6 flex flex-col items-center justify-center text-center">
                      <ClipboardEdit className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Evaluations Yet</h3>
                      <p className="text-muted-foreground max-w-md mb-6">
                        Create evaluations to assess student understanding and track progress.
                      </p>
                      <Button onClick={() => setIsCreatingEvaluation(true)}>
                        <Plus size={16} className="mr-2" />
                        Create Your First Evaluation
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="students" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-xl">Students</CardTitle>
                    <CardDescription>Manage students and track their progress</CardDescription>
                  </div>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    Add Student
                  </Button>
                </CardHeader>
                <CardContent>
                  {studentsData.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Average Grade</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentsData.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{calculateAttendanceRate(student.id)}</TableCell>
                            <TableCell>{student.averageGrade}%</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                                <Button variant="destructive" size="sm">Remove</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-6 flex flex-col items-center justify-center text-center">
                      <Users className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Students Yet</h3>
                      <p className="text-muted-foreground max-w-md mb-6">
                        Add students to this course to track their attendance and grades.
                      </p>
                      <Button>
                        <Plus size={16} className="mr-2" />
                        Add Your First Student
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {course.classes.length > 0 && studentsData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Attendance Tracking</CardTitle>
                    <CardDescription>Track student attendance for each class</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          {course.classes.map((classItem) => (
                            <TableHead key={classItem.id}>
                              {classItem.subject}
                              <div className="text-xs font-normal text-muted-foreground">
                                {formatDate(classItem.date)}
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentsData.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            {course.classes.map((classItem) => (
                              <TableCell key={classItem.id}>
                                <Checkbox 
                                  checked={getAttendanceStatus(student.id, classItem.id)}
                                  onCheckedChange={() => toggleAttendance(student.id, classItem.id)}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Class Content Dialog */}
      <Dialog open={isAddingClassContent || isEditingClassContent} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingClassContent(false);
            setIsEditingClassContent(false);
          }
        }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isEditingClassContent ? "Edit Class Content" : "Add Class Content"}
            </DialogTitle>
            <DialogDescription>
              {isEditingClassContent 
                ? "Edit the content for this class." 
                : "Add content for this class. This can include lesson notes, key points, or any text-based content."}
            </DialogDescription>
          </DialogHeader>
          <Form {...contentForm}>
            <form onSubmit={contentForm.handleSubmit(handleAddClassContent)} className="space-y-4">
              <FormField
                control={contentForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter class content here..." 
                        className="min-h-[200px]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => {
                  setIsAddingClassContent(false);
                  setIsEditingClassContent(false);
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditingClassContent ? "Save Changes" : "Add Content"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Class Material Dialog */}
      <Dialog open={isAddingClassMaterial} 
        onOpenChange={(open) => {
          if (!open) setIsAddingClassMaterial(false);
        }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Class Material</DialogTitle>
            <DialogDescription>
              Upload a file or document to be used as class material.
            </DialogDescription>
          </DialogHeader>
          <Form {...materialForm}>
            <form onSubmit={materialForm.handleSubmit(handleAddClassMaterial)} className="space-y-4">
              <FormField
                control={materialForm.control}
                name="materialName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter material name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialForm.control}
                name="file"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="file" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setIsAddingClassMaterial(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Upload Material
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Create Evaluation Dialog */}
      <Dialog open={isCreatingEvaluation} 
        onOpenChange={(open) => {
          if (!open) setIsCreatingEvaluation(false);
        }}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Create Evaluation</DialogTitle>
            <DialogDescription>
              Create a new evaluation or quiz for this course.
            </DialogDescription>
          </DialogHeader>
          <Form {...evaluationForm}>
            <form onSubmit={evaluationForm.handleSubmit(handleCreateEvaluation)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={evaluationForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter evaluation title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={evaluationForm.control}
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
              
              <FormField
                control={evaluationForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter evaluation description" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="text-lg font-medium mb-4">Questions</h3>
                
                {evaluationForm.getValues().questions.length > 0 && (
                  <div className="space-y-4 mb-6">
                    {evaluationForm.getValues().questions.map((question, index) => (
                      <div key={index} className="bg-background p-4 rounded-md border">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6" 
                            onClick={() => handleRemoveQuestion(index)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <p className="mb-2">{question.question}</p>
                        <div className="pl-4">
                          {question.options.map((option, optionIdx) => (
                            <div key={optionIdx} className="flex items-center gap-2 mb-1">
                              <div className={cn(
                                "w-4 h-4 rounded-full flex items-center justify-center text-[10px]",
                                optionIdx === question.correctOption ? "bg-primary text-primary-foreground" : "bg-muted"
                              )}>
                                {String.fromCharCode(65 + optionIdx)}
                              </div>
                              <span>{option}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="bg-background p-4 rounded-md border">
                  <h4 className="font-medium mb-2">Add New Question</h4>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Enter question" 
                      value={newQuestion.question}
                      onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    />
                    
                    <div className="space-y-2">
                      {newQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                            index === newQuestion.correctOption ? "bg-primary text-primary-foreground" : "bg-muted"
                          )}
                          onClick={() => setNewQuestion({...newQuestion, correctOption: index})}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <Input 
                            placeholder={`Option ${String.fromCharCode(65 + index)}`} 
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => handleRemoveOption(index)}
                            disabled={newQuestion.options.length <= 2}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={handleAddOption} disabled={newQuestion.options.length >= 6}>
                        <Plus size={14} className="mr-1" />
                        Add Option
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleAddQuestion} 
                        disabled={!newQuestion.question || newQuestion.options.some(opt => !opt)}
                      >
                        Add Question
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => setIsCreatingEvaluation(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={!evaluationForm.getValues().title || !evaluationForm.getValues().date || evaluationForm.getValues().questions.length === 0}
                >
                  Create Evaluation
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* View Evaluation Dialog */}
      <Dialog open={isViewingEvaluation} 
        onOpenChange={(open) => {
          if (!open) setIsViewingEvaluation(false);
        }}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvaluation?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvaluation?.description} • {selectedEvaluation && formatDate(selectedEvaluation.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedEvaluation?.questions.map((question, index) => (
              <div key={question.id} className="bg-muted/10 p-4 rounded-md border">
                <h3 className="font-medium mb-2">Question {index + 1}: {question.question}</h3>
                <div className="pl-4 space-y-2">
                  {question.options.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center gap-2">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                        optionIdx === question.correctOption ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        {String.fromCharCode(65 + optionIdx)}
                      </div>
                      <span className={optionIdx === question.correctOption ? "font-medium" : ""}>
                        {option}
                      </span>
                      {optionIdx === question.correctOption && (
                        <CheckCircle2 size={16} className="text-primary ml-auto" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
