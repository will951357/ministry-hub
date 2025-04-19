
import * as React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassStudentsProps {
  classId?: string;
}

const ClassStudents = ({ classId }: ClassStudentsProps) => {
  return (
    <CardContent className="p-6">
      <CardHeader className="px-0">
        <CardTitle>Students</CardTitle>
      </CardHeader>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Average Grade</TableHead>
            <TableHead>Last Assessment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add student rows here */}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default ClassStudents;
