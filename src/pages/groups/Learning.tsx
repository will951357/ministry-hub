
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, Book, FileText, Award, UserCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

// Sample courses data
const coursesData = [
  {
    id: 1,
    name: "Bible Study Foundations",
    description: "An introductory course on Bible study methods and interpretation.",
    status: "active" as const,
    startDate: "2025-05-10",
    endDate: "2025-08-10",
    dayOfWeek: "Sunday",
    maxApplicants: 30,
    currentApplicants: 12,
    minAverageGrade: 70,
    certificateType: "Standard",
    targetAudience: "Adult",
    sideMaterials: ["Study Guide", "Workbook"]
  },
  {
    id: 2,
    name: "Leadership Training",
    description: "Developing biblical leadership skills for ministry.",
    status: "active" as const,
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    dayOfWeek: "Wednesday",
    maxApplicants: 20,
    currentApplicants: 15,
    minAverageGrade: 75,
    certificateType: "Advanced",
    targetAudience: "Adult",
    sideMaterials: ["Leadership Manual", "Case Studies"]
  },
  {
    id: 3,
    name: "Children's Bible Stories",
    description: "Fun and engaging Bible storytelling for children.",
    status: "upcoming" as const,
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    dayOfWeek: "Saturday",
    maxApplicants: 25,
    currentApplicants: 0,
    minAverageGrade: 60,
    certificateType: "Kids",
    targetAudience: "Kids",
    sideMaterials: ["Activity Book", "Coloring Pages"]
  },
  {
    id: 4,
    name: "Youth Discipleship",
    description: "Discipleship program designed specifically for teenagers.",
    status: "active" as const,
    startDate: "2025-05-05",
    endDate: "2025-08-05",
    dayOfWeek: "Friday",
    maxApplicants: 35,
    currentApplicants: 28,
    minAverageGrade: 65,
    certificateType: "Standard",
    targetAudience: "Young",
    sideMaterials: ["Discussion Guide", "Media Resources"]
  },
  {
    id: 5,
    name: "Marriage Enrichment",
    description: "Strengthening marriages through biblical principles.",
    status: "completed" as const,
    startDate: "2025-01-10",
    endDate: "2025-04-10",
    dayOfWeek: "Saturday",
    maxApplicants: 20,
    currentApplicants: 18,
    minAverageGrade: 70,
    certificateType: "Advanced",
    targetAudience: "Adult",
    sideMaterials: ["Workbook", "Video Series"]
  },
  {
    id: 6,
    name: "Prayer Workshop",
    description: "Developing a deeper prayer life and understanding.",
    status: "upcoming" as const,
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    dayOfWeek: "Tuesday",
    maxApplicants: 30,
    currentApplicants: 5,
    minAverageGrade: 60,
    certificateType: "Standard",
    targetAudience: "Adult",
    sideMaterials: ["Prayer Guide"]
  }
];

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
}

export default function Learning() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
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
    setSelectedCourse(course);
    setIsDialogOpen(true);
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

  return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-church-primary">Learning</h1>
            <p className="text-church-secondary">
              Manage all courses and learning opportunities.
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus size={16} />
            <span>Create Course</span>
          </Button>
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
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Active Courses</p>
                  <p className="text-2xl font-semibold">{activeCourses.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-church-secondary">Upcoming</p>
                  <p className="text-2xl font-semibold">{upcomingCourses.length}</p>
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
            <div className="w-1/3">
              <Input 
                placeholder="Search courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Enrollment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCourses.map((course) => (
                    <TableRow 
                      key={course.id} 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleCourseClick(course)}
                    >
                      <TableCell className="font-medium">{course.name}</TableCell>
                      <TableCell>{course.targetAudience}</TableCell>
                      <TableCell>{course.dayOfWeek}s, {formatDate(course.startDate)} - {formatDate(course.endDate)}</TableCell>
                      <TableCell>{course.currentApplicants}/{course.maxApplicants}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(course.status)}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course details dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedCourse?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-church-secondary mb-1">Description</h4>
                <p>{selectedCourse.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Schedule</h4>
                  <p>{selectedCourse.dayOfWeek}s</p>
                  <p className="text-sm text-church-secondary">
                    {formatDate(selectedCourse.startDate)} - {formatDate(selectedCourse.endDate)}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Status</h4>
                  <Badge variant={getStatusBadgeVariant(selectedCourse.status)}>
                    {selectedCourse.status.charAt(0).toUpperCase() + selectedCourse.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Target Audience</h4>
                  <p>{selectedCourse.targetAudience}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Certificate Type</h4>
                  <p>{selectedCourse.certificateType}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Enrollment</h4>
                  <p>
                    <UserCheck size={16} className="inline mr-1" />
                    {selectedCourse.currentApplicants}/{selectedCourse.maxApplicants}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-church-secondary mb-1">Minimum Grade</h4>
                  <p>{selectedCourse.minAverageGrade}%</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-church-secondary mb-1">Side Materials</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.sideMaterials.map((material, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      <FileText size={12} />
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                <Button>
                  <FileText size={16} className="mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create course dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Enter information for the new course
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Form>
              <div className="space-y-4">
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter course description" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <Input placeholder="Kids, Young, Adult" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="certificateType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certificate Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard, Advanced, Kids" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="maxApplicants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Applicants</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="30" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    name="minGrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Average Grade (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="70" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  name="sideMaterials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Side Materials</FormLabel>
                      <FormControl>
                        <Input placeholder="Comma separated list of materials" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </Form>
            
            <p className="text-sm text-muted-foreground">
              This feature will be fully functional in the next release.
            </p>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success("Course created successfully!");
                setIsCreateDialogOpen(false);
              }}>
                <Plus size={16} className="mr-1" />
                Create Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
