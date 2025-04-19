
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

interface ClassSessionsProps {
  classId?: string;
}

const ClassSessions = ({ classId }: ClassSessionsProps) => {
  return (
    <CardContent className="p-6">
      <CardHeader className="flex flex-row items-center justify-between px-0">
        <CardTitle>Class Sessions</CardTitle>
        <Button>Schedule New Session</Button>
      </CardHeader>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Agenda</TableHead>
            <TableHead>Materials</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add session rows here */}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default ClassSessions;
