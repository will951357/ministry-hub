
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassGeneralInfoProps {
  classId?: string;
}

const ClassGeneralInfo = ({ classId }: ClassGeneralInfoProps) => {
  return (
    <CardContent className="p-6">
      <CardHeader>
        <CardTitle>Class Information</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Description</h3>
          <p className="text-sm text-muted-foreground">
            Detailed description of the class and its objectives.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Schedule</h3>
          <p className="text-sm text-muted-foreground">
            Class schedule and duration information.
          </p>
        </div>
      </div>
    </CardContent>
  );
};

export default ClassGeneralInfo;
