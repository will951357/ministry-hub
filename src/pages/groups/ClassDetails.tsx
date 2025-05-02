
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { coursesData, membersData } from "./Learning";
import { ClassGeneralInfo } from "./components/ClassGeneralInfo";
import { ClassSessionsTab } from "./components/ClassSessionsTab";
import { ClassEvaluationsTab } from "./components/ClassEvaluationsTab";
import { ClassStudentsTab } from "./components/ClassStudentsTab";
import { Session, Evaluation, StudentDetail } from "./components/types";

const ClassDetails = () => {
  const { courseId, classId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  
  // Mock data for demonstration
  const course = coursesData.find(c => c.id === Number(courseId));
  const classItem = course?.classes.find(c => c.id === Number(classId));
  const [sessions, setSessions] = useState<Session[]>([
    {
      title: "Introduction to Theology",
      description: "Overview of theological concepts and history",
      sessionDate: new Date(),
      files: ["intro-slides.pdf", "reading-list.docx"],
      qrCodeData: `class-${classId}-session-1-${new Date().toISOString().split('T')[0]}`
    },
    {
      title: "Faith Foundations",
      description: "Core principles of faith and belief systems",
      sessionDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      files: ["foundations-handout.pdf"],
      qrCodeData: `class-${classId}-session-2-${new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]}`
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

  if (!course || !classItem) {
    return <div>Class not found</div>;
  }

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
            <ClassGeneralInfo classItem={classItem} membersData={membersData} />
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-4">
            <ClassSessionsTab classId={classId || ""} sessions={sessions} setSessions={setSessions} />
          </TabsContent>

          {/* Evaluations Tab */}
          <TabsContent value="evaluations" className="space-y-4">
            <ClassEvaluationsTab evaluations={evaluations} setEvaluations={setEvaluations} />
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <ClassStudentsTab 
              classItem={classItem}
              students={students}
              setStudents={setStudents}
              sessions={sessions}
              evaluations={evaluations}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClassDetails;
