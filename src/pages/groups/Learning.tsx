import { useState } from "react";
import * as React from "react"; // Added explicit React import to resolve UMD global errors
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Book, FileText, Award, UserCheck, Filter, Bell, Search, ChevronDown, ChevronRight, Eye, Edit as EditIcon } from "lucide-react";
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
import { ChartCard } from "@/components/dashboard/ChartCard";

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
  teacher: string;
  students: number;
  averageGrade: number;
  presenceRate: number;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  description?: string;
  sideMaterial?: string;
  lessons?: ClassLesson[];
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

export const coursesData: Course[] = [
  {
    id: 1,
    name: "Introduction to Biblical Studies",
    description: "An introductory course to the key themes and books of the Bible.",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-05-30",
    dayOfWeek: "Wednesday",
    maxApplicants: 50,
    currentApplicants: 35,
    minAverageGrade: 70,
    certificateType: "Standard",
    targetAudience: "Adult",
    sideMaterials: ["Textbook", "Online Articles"],
    classes: [
      {
        id: 101,
        subject: "Old Testament Overview",
        teacher: "Dr. Emily Carter",
        students: 35,
        averageGrade: 78,
        presenceRate: 85,
        startDate: "2024-03-06",
        endDate: "2024-03-27",
        status: "in_progress",
        description: "A survey of the major events and characters in the Old Testament.",
        sideMaterial: "Lecture Slides",
        lessons: [
          {
            id: 1001,
            title: "Creation and the Fall",
            date: "2024-03-06",
            description: "Exploring the creation narrative and the consequences of the fall.",
            materials: ["Genesis 1-3", "Article on Original Sin"]
          }
        ]
      }
    ],
    responsibleMembers: [membersData[0], membersData[2]]
  },
  {
    id: 2,
    name: "Youth Leadership Training",
    description: "Equipping young leaders with the skills to lead and mentor their peers.",
    status: "upcoming",
    startDate: "2024-06-15",
    endDate: "2024-08-31",
    dayOfWeek: "Saturday",
    maxApplicants: 30,
    currentApplicants: 20,
    minAverageGrade: 75,
    certificateType: "Advanced",
    targetAudience: "Young",
    sideMaterials: ["Leadership Manual", "Case Studies"],
    classes: [
      {
        id: 201,
        subject: "Effective Communication",
        teacher: "Pastor John Smith",
        students: 20,
        averageGrade: 82,
        presenceRate: 90,
        startDate: "2024-06-22",
        endDate: "2024-07-13",
        status: "scheduled",
        description: "Techniques for clear and impactful communication.",
        sideMaterial: "Communication Guide",
        lessons: [
          {
            id: 2001,
            title: "Verbal Communication Skills",
            date: "2024-06-22",
            description: "Improving verbal communication for leadership roles.",
            materials: ["Communication Skills Handbook", "Role-Playing Scenarios"]
          }
        ]
      }
    ],
    responsibleMembers: [membersData[1], membersData[3]]
  },
  {
    id: 3,
    name: "Children's Ministry Workshop",
    description: "Training for volunteers working with children in the church.",
    status: "completed",
    startDate: "2024-01-10",
    endDate: "2024-02-28",
    dayOfWeek: "Tuesday",
    maxApplicants: 40,
    currentApplicants: 40,
    minAverageGrade: 65,
    certificateType: "Kids",
    targetAudience: "Adult",
    sideMaterials: ["Activity Book", "Safety Guidelines"],
    classes: [
      {
        id: 301,
        subject: "Creative Bible Storytelling",
        teacher: "Mrs. Sarah Johnson",
        students: 40,
        averageGrade: 88,
        presenceRate: 95,
        startDate: "2024-01-16",
        endDate: "2024-02-06",
        status: "completed",
        description: "Methods for engaging children with Bible stories.",
        sideMaterial: "Storytelling Techniques",
        lessons: [
          {
            id: 3001,
            title: "Using Visual Aids",
            date: "2024-01-16",
            description: "Enhancing storytelling with visual aids.",
            materials: ["Visual Aid Examples", "DIY Visual Aid Guide"]
          }
        ]
      }
    ],
    responsibleMembers: [membersData[3], membersData[5]]
  },
  {
    id: 4,
    name: "Financial Stewardship Course",
    description: "A practical guide to managing personal finances based on biblical principles.",
    status: "active",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    dayOfWeek: "Thursday",
    maxApplicants: 35,
    currentApplicants: 28,
    minAverageGrade: 72,
    certificateType: "Standard",
    targetAudience: "Adult",
    sideMaterials: ["Budgeting Templates", "Investment Guide"],
    classes: [
      {
        id: 401,
        subject: "Budgeting Basics",
        teacher: "Mr. David Wilson",
        students: 28,
        averageGrade: 80,
        presenceRate: 88,
        startDate: "2024-04-04",
        endDate: "2024-04-25",
        status: "in_progress",
        description: "Creating and maintaining a personal budget.",
        sideMaterial: "Budgeting Software Guide",
        lessons: [
          {
            id: 4001,
            title: "Tracking Expenses",
            date: "2024-04-04",
            description: "Methods for tracking and categorizing personal expenses.",
            materials: ["Expense Tracking App Recommendations", "Spreadsheet Templates"]
          }
        ]
      }
    ],
    responsibleMembers: [membersData[4], membersData[0]]
  },
  {
    id: 5,
    name: "Marriage Enrichment Seminar",
    description: "Strengthening marital relationships through communication and understanding.",
    status: "upcoming",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    dayOfWeek: "Friday",
    maxApplicants: 25,
    currentApplicants: 15,
    minAverageGrade: 78,
    certificateType: "Advanced",
    targetAudience: "Adult",
    sideMaterials: ["Communication Exercises", "Relationship Articles"],
    classes: [
      {
        id: 501,
        subject: "Effective Communication in Marriage",
        teacher: "Pastor and Mrs. Brown",
        students: 15,
        averageGrade: 85,
        presenceRate: 92,
        startDate: "2024-07-05",
        endDate: "2024-07-26",
        status: "scheduled",
        description: "Improving communication skills for a stronger marriage.",
        sideMaterial: "Communication Skills Workbook",
        lessons: [
          {
            id: 5001,
            title: "Active Listening",
            date: "2024-07-05",
            description: "Techniques for active listening and understanding your spouse.",
            materials: ["Active Listening Guide", "Communication Role-Play Scenarios"]
          }
        ]
      }
    ],
    responsibleMembers: [membersData[2], membersData[4]]
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
  const [isEditCourseDialogOpen, setIsEditCourseDialogOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
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
    navigate(`/groups/learning/class/${courseId}/${classItem.id}`);
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
      teacher: data.teacher,
      students: 0,
      averageGrade: 0,
      presenceRate: 0,
      startDate: formattedDate,
      endDate: formattedDate,
      status: "scheduled",
      description: data.description,
      sideMaterial: data.sideMaterial,
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

  const handleEditCourse = (course: Course) => {
    setCourseToEdit(course);
    form.reset({
      name: course.name,
      description: course.description,
      targetAudience: course.targetAudience,
      certificateType: course.certificateType,
      maxApplicants: course.maxApplicants,
      minGrade: course.minAverageGrade,
      startDate: new Date(course.startDate),
      endDate: new Date(course.endDate),
      registrationStartDate: undefined,
      registrationEndDate: undefined,
      responsibleMembers: course.responsibleMembers.map(member => member.id)
    });
    setIsEditCourseDialogOpen(true);
  };

  const handleQuickAddClass = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCourse(course);
    setIsAddClassDialogOpen(true);
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

        {/* Updated Courses Overview with individual cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ChartCard 
            title="Total Courses" 
            description="All course offerings"
            icon={<Book className="h-5 w-5" />}
          >
            <p className="text-2xl font-semibold">{coursesData.length}</p>
          </ChartCard>
          
          <ChartCard 
            title="Active Courses"
            description="Currently running"
            icon={<CalendarIcon className="h-5 w-5" />}
          >
            <p className="text-2xl font-semibold">{activeCourses.length}</p>
          </ChartCard>
          
          <ChartCard 
            title="Total Classes"
            description="Individual class sessions"
            icon={<FileText className="h-5 w-5" />}
          >
            <p className="text-2xl font-semibold">
              {coursesData.reduce((total, course) => total + course.classes.length, 0)}
            </p>
          </ChartCard>
          
          <ChartCard 
            title="Total Students"
            description="Enrolled students"
            icon={<Users className="h-5 w-5" />}
          >
            <p className="text-2xl font-semibold">
              {coursesData.reduce((total, course) => total + course.currentApplicants, 0)}
            </p>
          </ChartCard>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Courses</h2>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-center">Classes</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-[140px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <React.Fragment key={course.id}>
                      <TableRow className={selectedCourses.includes(course.id) ? "bg-primary/5" : ""}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {isCourseSelectMode && (
                              <Checkbox 
                                checked={selectedCourses.includes(course.id)} 
                                onCheckedChange={() => toggleCourseSelection(course.id)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <div>
                              <div className="font-medium">{course.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatDate(course.startDate)} - {formatDate(course.endDate)}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{course.classes.length}</TableCell>
                        <TableCell className="text-center">{course.currentApplicants}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={getStatusBadgeVariant(course.status)}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCourse(course);
                              }}
                            >
                              <EditIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleQuickAddClass(course, e)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpandCourse(course.id)}
                            >
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  expandedCourses.includes(course.id) && "rotate-180"
                                )}
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCourses.includes(course.id) && (
                        <TableRow>
                          <TableCell colSpan={5} className="p-0">
                            <div className="bg-muted/50">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Class Name</TableHead>
                                    <TableHead>Professor</TableHead>
                                    <TableHead className="text-center">Students</TableHead>
                                    <TableHead className="text-center">Avg. Grade</TableHead>
                                    <TableHead className="text-center">Presence</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>End Date</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {course.classes.map((classItem) => (
                                    <TableRow key={classItem.id} className="hover:bg-muted/70">
                                      <TableCell>{classItem.subject}</TableCell>
                                      <TableCell>{classItem.teacher}</TableCell>
                                      <TableCell className="text-center">{classItem.students}</TableCell>
                                      <TableCell className="text-center">
                                        {classItem.averageGrade > 0 ? `${classItem.averageGrade}%` : '-'}
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {classItem.presenceRate > 0 ? `${classItem.presenceRate}%` : '-'}
                                      </TableCell>
                                      <TableCell>{formatDate(classItem.startDate)}</TableCell>
                                      <TableCell>{formatDate(classItem.endDate)}</TableCell>
                                      <TableCell className="text-center">
                                        <Badge variant={
                                          classItem.status === 'completed' ? 'outline' :
                                          classItem.status === 'in_progress' ? 'default' : 'secondary'
                                        }>
                                          {classItem.status.replace('_', ' ').charAt(0).toUpperCase() + 
                                           classItem.status.slice(1).replace('_', ' ')}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleClassClick(course.id, classItem)}
                                        >
                                          <Eye className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
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
                      <FormLabel>Class Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter class subject" {...field} />
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
                  name="sideMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side Material</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter side material" {...field} />
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
              {/* Class details */}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditCourseDialogOpen} onOpenChange={setIsEditCourseDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course information
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
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" type="button" onClick={() => setIsEditCourseDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
