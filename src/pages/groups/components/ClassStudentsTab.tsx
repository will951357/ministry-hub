
import { useState } from "react";
import { Plus, User, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

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

interface Session {
  title: string;
  description: string;
  sessionDate: Date;
  files: string[];
}

interface Evaluation {
  title: string;
  description: string;
  questions: any[];
}

interface ClassStudentsTabProps {
  classItem: any;
  students: StudentDetail[];
  setStudents: React.Dispatch<React.SetStateAction<StudentDetail[]>>;
  sessions: Session[];
  evaluations: Evaluation[];
}

export const ClassStudentsTab = ({ 
  classItem, 
  students, 
  setStudents,
  sessions, 
  evaluations 
}: ClassStudentsTabProps) => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);

  // Helper function to get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Function to toggle student selection
  const toggleStudentSelection = (studentId: number) => {
    setSelectedStudents(prev => 
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
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

  const handleUpdateStudents = () => {
    toast.success(`${selectedStudents.length} students enrolled`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Students</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleUpdateStudents}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Students
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Students Overview */}
          <div>
            <h3 className="text-md font-medium mb-3">Students Overview</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Average Grade</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-full h-2 rounded-full",
                          student.attendance >= 80 ? "bg-green-200" : "bg-amber-200"
                        )}>
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              student.attendance >= 80 ? "bg-green-500" : "bg-amber-500"
                            )} 
                            style={{ width: `${student.attendance}%` }} 
                          />
                        </div>
                        <span className="font-medium text-sm">{student.attendance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-full h-2 rounded-full",
                          student.averageGrade >= 80 ? "bg-green-200" :
                          student.averageGrade >= 70 ? "bg-amber-200" : "bg-red-200"
                        )}>
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              student.averageGrade >= 80 ? "bg-green-500" :
                              student.averageGrade >= 70 ? "bg-amber-500" : "bg-red-500"
                            )} 
                            style={{ width: `${student.averageGrade}%` }} 
                          />
                        </div>
                        <span className="font-medium text-sm">{student.averageGrade}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.attendance >= (classItem?.minAttendance || 80) && 
                      student.averageGrade >= (classItem?.minGrade || 70) ? (
                        <Badge className="bg-green-500">Passing</Badge>
                      ) : (
                        <Badge variant="destructive">At Risk</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Attendance Tracking */}
          <div className="pt-4 border-t">
            <h3 className="text-md font-medium mb-3">Attendance Tracking</h3>
            <div className="border rounded-lg overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Student</TableHead>
                    {sessions.map((session, index) => (
                      <TableHead key={index} className="text-center">
                        <div className="min-w-24">
                          <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                            {session.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(session.sessionDate, "MMM d")}
                          </div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      {student.sessionAttendance.map((attendance, sessionId) => (
                        <TableCell key={sessionId} className="text-center py-2">
                          <Checkbox
                            className="mx-auto"
                            checked={attendance.attended}
                            onCheckedChange={() => toggleStudentAttendance(student.id, attendance.sessionId)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Evaluation Grades */}
          <div className="pt-4 border-t">
            <h3 className="text-md font-medium mb-3">Evaluation Grades</h3>
            <div className="border rounded-lg overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Student</TableHead>
                    {evaluations.map((evaluation, index) => (
                      <TableHead key={index} className="text-center">
                        <div className="min-w-24">
                          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {evaluation.title}
                          </div>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      {evaluations.map((evaluation, evalIndex) => {
                        const gradeEntry = student.evaluationGrades.find(
                          g => g.evaluationId === evalIndex + 1
                        );
                        return (
                          <TableCell key={evalIndex} className="text-center py-2">
                            <Input
                              type="number"
                              min={0}
                              max={100}
                              value={gradeEntry?.grade || ""}
                              onChange={(e) => updateStudentGrade(
                                student.id, 
                                evalIndex + 1, 
                                parseInt(e.target.value) || 0
                              )}
                              className="w-16 h-8 text-center mx-auto"
                            />
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center">
                        <Badge className={cn(
                          student.averageGrade >= 80 ? "bg-green-500" :
                          student.averageGrade >= 70 ? "bg-amber-500" : "bg-red-500"
                        )}>
                          {student.averageGrade}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
