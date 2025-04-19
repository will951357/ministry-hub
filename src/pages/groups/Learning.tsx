import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Book, FileText, Award, UserCheck, Filter, Bell, Search, ChevronDown, ChevronRight } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface ClassLesson {
  id: number;
  title: string;
  date: string;
  description?: string;
  materials?: string[];
}

interface Class {
  id: number;
  subject: string;
  date: string;
  sideMaterial?: string;
  description?: string;
  teacher?: string;
  lessons?: ClassLesson[];
  students?: number;
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
  expanded?: boolean;
}

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
        description: "Basics of biblical interpretation and study approaches",
        teacher: "John Smith",
        students: 10,
        lessons: [
          {
            id: 1,
            title: "Understanding Scripture Context",
            date: "2025-05-10",
            description: "Historical and cultural context of scripture",
            materials: ["Context Worksheet", "Timeline Handout"]
          },
          {
            id: 2,
            title: "Bible Study Methods",
            date: "2025-05-17",
            description: "Different approaches to studying the Bible",
            materials: ["Methods Overview"]
          }
        ]
      },
      {
        id: 2,
        subject: "Hermeneutics",
        date: "2025-05-17",
        sideMaterial: "Interpretation Guide",
        description: "Biblical interpretation principles and techniques",
        teacher: "Rebecca Davis",
        students: 8,
        lessons: [
          {
            id: 1,
            title: "Basic Interpretation Principles",
            date: "2025-05-17",
            description: "Foundational principles of Biblical interpretation",
            materials: ["Principles Handout"]
          }
        ]
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
        sideMaterial: "Leadership Principles",
        description: "Biblical servant leadership model and application",
        teacher: "David Wilson",
        students: 15,
        lessons: [
          {
            id: 1,
            title: "Servant Leadership Foundations",
            date: "2025-06-15",
            description: "Biblical basis for servant leadership",
            materials: ["Scripture References", "Discussion Guide"]
          }
        ]
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

interface CourseFormValues {
  name: string;
  description: string;
  targetAudience: "Kids" | "Young" | "Adult";
  certificateType: string;
  maxApplicants: number;
  minGrade: number;
  startDate: Date | undefined;
  endDate: Date | undefined;
  registrationStartDate: Date | undefined;
  registrationEndDate: Date | undefined;
  responsibleMembers: number[];
}

interface ClassFormValues {
  subject: string;
  date: Date | undefined;
  sideMaterial: string;
  description: string;
  teacher: string;
}

export default function Learning() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAddClassDialogOpen, setIsAddClassDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isCourseSelectMode, setIsCourseSelectMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isClassDetailsOpen, setIsClassDetailsOpen] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<CourseFormValues>({
    defaultValues: {
      name: "",
      description: "",
      targetAudience: "Adult",
      certificateType: "Standard",
      maxApplicants: 30,
      minGrade: 70,
      startDate: undefined,
      endDate: undefined,
      registrationStartDate: undefined,
      registrationEndDate: undefined,
      responsibleMembers: []
    }
  });
  
  const classForm = useForm<ClassFormValues>({
    defaultValues: {
      subject: "",
      date: undefined,
      sideMaterial: "",
      description: "",
      teacher: ""
    }
  });
  
  const activeCourses = coursesData.filter(course => course.status === "active");
  const upcomingCourses = coursesData.filter(course => course.status === "upcoming");
  
  const filteredCourses = searchQuery 
    ? coursesData.filter(course => 
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.targetAudience.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : coursesData;
  
  const handleCourseClick = (course: Course) => {
    if (isCourseSelectMode) {
      toggleCourseSelection(course.id);
    } else {
      toggleExpandCourse(course.id);
    }
  };

  const toggleExpandCourse = (courseId: number) => {
    setExpandedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleClassClick = (courseId: number, classItem: Class) => {
    setSelectedCourse(coursesData.find(c => c.id === courseId) || null);
    setSelectedClass(classItem);
    setIsClassDetailsOpen(true);
  };

  const toggleCourseSelection = (courseId: number) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId) 
        : [...prev, courseId]
    );
  };

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
  
  const onSubmit = (data: CourseFormValues) => {
    toast.success("Course created successfully!");
    setIsCreateDialogOpen(false);
    console.log("Form submitted with data:", data);
  };

  const openAddClassDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsAddClassDialogOpen(true);
  };

  const onAddClass = (data: ClassFormValues) => {
    if (!selectedCourse || !data.date) return;
    
    const formattedDate = format(data.date, "yyyy-MM-dd");
    
    const newClass: Class = {
      id: selectedCourse.classes.length + 1,
      subject: data.subject,
      date: formattedDate,
      sideMaterial: data.sideMaterial,
      description: data.description,
      teacher: data.teacher,
      students: 0,
      lessons: []
    };
    
    selectedCourse.classes.push(newClass);
    
    toast.success(`Class "${data.subject}" added to "${selectedCourse.name}"`);
    
    setIsAddClassDialogOpen(false);
    
    classForm.reset();
  };

  const toggleMemberSelection = (memberId: number) => {
    const updatedSelection = selectedMembers.includes(memberId)
      ? selectedMembers.filter(id => id !== memberId)
      : [...selectedMembers, memberId];
    
    setSelectedMembers(updatedSelection);
    form.setValue("responsibleMembers", updatedSelection);
  };

  const handleFilter = () => {
    toast.info("Filter functionality coming soon");
  };

  const sendBulkNotification = () => {
    const selectedCourseCount = selectedCourses.length;
    if (selectedCourseCount > 0) {
      const studentCount = selectedCourses.reduce((total, courseId) => {
        const course = coursesData.find(c => c.id === courseId);
        return total + (course?.currentApplicants || 0);
      }, 0);
      
      toast.success(`Notification sent to ${studentCount} students across ${selectedCourseCount} courses`);
      setSelectedCourses([]);
      setIsCourseSelectMode(false);
    } else {
      toast.error("Please select at least one course");
    }
  };

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-church-primary">Learning</h1>
            <p className="text-church-secondary">
              Manage all courses, classes, and learning opportunities.
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} />
            <span>Create Course</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            {isCourseSelectMode ? (
              <>
                <Button variant="outline" onClick={() => {
                  setSelectedCourses([]);
                  setIsCourseSelectMode(false);
                }}>
                  Cancel
                </Button>
                <Button onClick={sendBulkNotification}>
                  <Bell className="mr-2 h-4 w-4" />
                  Send Notification ({selectedCourses.length})
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => setIsCourseSelectMode(true)}>
                <Bell className="mr-2 h-4 w-4" />
                Select Courses
              </Button>
            )}
          </div>
        </div>

        <Card className="mb-6 border-church-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Courses Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-church-accent/10 p-2 rounded-full">
                  <Book className="h-6 w-6 text-church-accent" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Total Courses</p>
                  <p className="text-2xl font-semibold">{coursesData.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Active Courses</p>
                  <p className="text-2xl font-semibold">{activeCourses.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Total Classes</p>
                  <p className="text-2xl font-semibold">
                    {coursesData.reduce((total, course) => total + course.classes.length, 0)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-500/10 p-2 rounded-full">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Total Students</p>
                  <p className="text-2xl font-semibold">
                    {coursesData.reduce((total, course) => total + course.currentApplicants, 0)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Courses</h2>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Accordion type="multiple" className="w-full">
                {filteredCourses.map((course) => (
                  <AccordionItem 
                    key={course.id} 
                    value={course.id.toString()}
                    className={`${
                      selectedCourses.includes(course.id) ? "bg-primary/5" : ""
                    }`}
                  >
                    <AccordionTrigger 
                      className="px-4 py-3 hover:no-underline hover:bg-muted/50"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCourseClick(course);
                      }}
                    >
                      <div className="flex items-center flex-1">
                        {isCourseSelectMode && (
                          <Checkbox 
                            checked={selectedCourses.includes(course.id)} 
                            onCheckedChange={() => toggleCourseSelection(course.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="mr-3"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{course.name}</div>
                          <div className="text-sm text-muted-foreground">{course.targetAudience} • {course.dayOfWeek}s</div>
                        </div>
                        <div className="hidden md:flex items-center gap-8 mr-8">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Classes:</span> {course.classes.length}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Students:</span> {course.currentApplicants}/{course.maxApplicants}
                          </div>
                          <Badge variant={getStatusBadgeVariant(course.status)}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0">
                      <div className="border-t bg-muted/20 px-4 py-2 flex justify-between items-center">
                        <div className="text-sm font-medium">Classes ({course.classes.length})</div>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddClassDialog(course);
                          }}
                        >
                          <Plus size={14} className="mr-1" />
                          Add Class
                        </Button>
                      </div>
                      <div className="divide-y">
                        {course.classes.length > 0 ? (
                          course.classes.map((classItem) => (
                            <div 
                              key={classItem.id} 
                              className="px-6 py-3 hover:bg-muted/30 cursor-pointer"
                              onClick={() => handleClassClick(course.id, classItem)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{classItem.subject}</div>
                                  <div className="text-sm text-muted-foreground flex gap-4">
                                    <span>{formatDate(classItem.date)}</span>
                                    {classItem.teacher && <span>Teacher: {classItem.teacher}</span>}
                                    {classItem.students !== undefined && <span>Students: {classItem.students}</span>}
                                  </div>
                                </div>
                                <ChevronRight size={16} className="text-muted-foreground" />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-6 py-4 text-center text-muted-foreground">
                            No classes have been added to this course yet.
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Enter information for the new course
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
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
                        <Textarea placeholder="Enter course description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kids">Kids</SelectItem>
                            <SelectItem value="Young">Young</SelectItem>
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
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select certificate type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Kids">Kids</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registrationStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Registration Start</FormLabel>
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
                    name="registrationEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Registration End</FormLabel>
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
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="maxApplicants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Applicants</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select max applicants" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="minGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Average Grade (%)</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select min grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="60">60%</SelectItem>
                            <SelectItem value="65">65%</SelectItem>
                            <SelectItem value="70">70%</SelectItem>
                            <SelectItem value="75">75%</SelectItem>
                            <SelectItem value="80">80%</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="responsibleMembers"
                  render={() => (
                    <FormItem>
                      <FormLabel>Responsible Members</FormLabel>
                      <FormControl>
                        <div className="border rounded-md">
                          <div className="p-2 border-b bg-muted/30">
                            <Input 
                              placeholder="Search members..." 
                              className="h-8" 
                            />
                          </div>
                          <ScrollArea className="h-[200px]">
                            <div className="p-2">
                              {membersData.map((member) => (
                                <div 
                                  key={member.id} 
                                  className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded cursor-pointer"
                                  onClick={() => toggleMemberSelection(member.id)}
                                >
                                  <Checkbox 
                                    id={`member-${member.id}`} 
                                    checked={selectedMembers.includes(member.id)}
                                    onCheckedChange={() => toggleMemberSelection(member.id)}
                                  />
                                  <div className="flex items-center space-x-2 flex-1">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                                      {member.avatar ? 
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /> : 
                                        <UserCheck size={16} />
                                      }
                                    </div>
                                    <div>
                                      <div className="font-medium">{member.name}</div>
                                      <div className="text-xs text-muted-foreground">{member.role}</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="p-2 border-t bg-muted/30 text-sm">
                            {selectedMembers.length} members selected
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Plus size={16} className="mr-1" />
                    Create Course
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddClassDialogOpen} onOpenChange={setIsAddClassDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Class</DialogTitle>
            <DialogDescription>
              Add a class to {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Form {...classForm}>
              <form onSubmit={classForm.handleSubmit(onAddClass)} className="space-y-4">
                <FormField
                  control={classForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter class subject" {...field} />
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
                        <Textarea placeholder="Enter class description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={classForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Class Date</FormLabel>
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
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter teacher name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={classForm.control}
                  name="sideMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side Material (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter side material name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsAddClassDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Plus size={16} className="mr-1" />
                    Add Class
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isClassDetailsOpen} onOpenChange={setIsClassDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Class Details</DialogTitle>
            <DialogDescription>
              {selectedClass?.subject} - {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedClass && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p>{formatDate(selectedClass.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teacher</p>
                    <p>{selectedClass.teacher || "Not assigned"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p>{selectedClass.students || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Materials</p>
                    <p>{selectedClass.sideMaterial || "None"}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedClass.description || "No description available."}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Lessons</h3>
                  <Button size="sm">
                    <Plus size={14} className="mr-1" />
                    Add Lesson
                  </Button>
                </div>
                
                {selectedClass.lessons && selectedClass.lessons.length > 0 ? (
                  <div className="space-y-2">
                    {selectedClass.lessons.map(lesson => (
                      <Card key={lesson.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{lesson.title}</h4>
                              <p className="text-sm text-muted-foreground">{formatDate(lesson.date)}</p>
                              <p className="text-sm mt-1">{lesson.description}</p>
                            </div>
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                          {lesson.materials && lesson.materials.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground">Materials:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {lesson.materials.map((material, idx) => (
                                  <Badge key={idx} variant="outline">{material}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    <p className="text-muted-foreground">No lessons have been added yet.</p>
                    <Button variant="link" size="sm">
                      Add your first lesson
                    </Button>
                  </div>
                )}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Students</h3>
                  <Button size="sm">
                    <Plus size={14} className="mr-1" />
                    Add Student
                  </Button>
                </div>
                
                {selectedClass.students && selectedClass.students > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Sample Student</TableCell>
                          <TableCell>100%</TableCell>
                          <TableCell>A</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md">
                    <p className="text-muted-foreground">No students have been added yet.</p>
                    <Button variant="link" size="sm">
                      Add your first student
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsClassDetailsOpen(false)}>
                  Close
                </Button>
                <Button>
                  Edit Class
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
