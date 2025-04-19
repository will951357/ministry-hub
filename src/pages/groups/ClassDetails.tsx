
import * as React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ClassGeneralInfo from "@/components/groups/class/ClassGeneralInfo";
import ClassSessions from "@/components/groups/class/ClassSessions";
import ClassAssessments from "@/components/groups/class/ClassAssessments";
import ClassStudents from "@/components/groups/class/ClassStudents";
import { useParams } from "react-router-dom";

const ClassDetails = () => {
  const { classId } = useParams();

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="sessions">Class Sessions</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <Card className="mt-6">
            <TabsContent value="general">
              <ClassGeneralInfo classId={classId} />
            </TabsContent>
            
            <TabsContent value="sessions">
              <ClassSessions classId={classId} />
            </TabsContent>
            
            <TabsContent value="assessments">
              <ClassAssessments classId={classId} />
            </TabsContent>
            
            <TabsContent value="students">
              <ClassStudents classId={classId} />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClassDetails;
