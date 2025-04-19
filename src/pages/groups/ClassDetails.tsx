
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, CalendarIcon, FileText, Users } from "lucide-react";
import { coursesData } from "./Learning";
import { format } from "date-fns";

const ClassDetails = () => {
  const { courseId, classId } = useParams();
  const course = coursesData.find(c => c.id === Number(courseId));
  const classItem = course?.classes.find(c => c.id === Number(classId));

  if (!course || !classItem) {
    return <div>Class not found</div>;
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{classItem.subject}</h1>
            <p className="text-muted-foreground">{course.name}</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Class Session
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="sessions">Class Sessions</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Class Details</h3>
                  <div className="space-y-2">
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
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Statistics</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Students</p>
                      <p>{classItem.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Grade</p>
                      <p>{classItem.averageGrade}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Presence Rate</p>
                      <p>{classItem.presenceRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {classItem.description && (
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{classItem.description}</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Upcoming Sessions</h3>
                <Button>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Session
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <p>No upcoming sessions scheduled.</p>
                <p className="text-sm">Click the button above to schedule a new session.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Assessments</h3>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Create Assessment
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <p>No assessments created yet.</p>
                <p className="text-sm">Click the button above to create your first assessment.</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Students</h3>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <p>No students enrolled yet.</p>
                <p className="text-sm">Click the button above to add students to this class.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClassDetails;
