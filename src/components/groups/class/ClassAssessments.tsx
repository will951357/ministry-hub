
import * as React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassAssessmentsProps {
  classId?: string;
}

const ClassAssessments = ({ classId }: ClassAssessmentsProps) => {
  return (
    <CardContent className="p-6">
      <CardHeader className="flex flex-row items-center justify-between px-0">
        <CardTitle>Assessments</CardTitle>
        <Button>Create New Assessment</Button>
      </CardHeader>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add assessment rows here */}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default ClassAssessments;
