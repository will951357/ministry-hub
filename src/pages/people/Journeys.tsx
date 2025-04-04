
import { useState } from "react";
import { format } from "date-fns";
import { PlusCircle, Users, Sparkles, CheckCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Sample data for journeys - in a real app this would come from an API
const sampleJourneys = [
  {
    id: 1,
    name: "New Believer Discipleship",
    description: "A 12-week journey for new believers to establish a strong foundation in faith.",
    createdAt: new Date(2023, 0, 15),
    status: "active",
    enrolledCount: 24,
    completedCount: 8,
  },
  {
    id: 2,
    name: "Baptism Preparation",
    description: "A 4-week journey preparing members for baptism and understanding its significance.",
    createdAt: new Date(2023, 2, 10),
    status: "active",
    enrolledCount: 12,
    completedCount: 5,
  },
  {
    id: 3,
    name: "Leadership Development",
    description: "A 6-month journey to equip and prepare potential leaders for ministry roles.",
    createdAt: new Date(2022, 8, 5),
    status: "completed",
    enrolledCount: 18,
    completedCount: 15,
  },
  {
    id: 4,
    name: "Marriage Enrichment",
    description: "An 8-week journey for couples to strengthen their marriage relationship.",
    createdAt: new Date(2023, 5, 20),
    status: "active",
    enrolledCount: 14,
    completedCount: 0,
  },
  {
    id: 5,
    name: "Prayer Warriors",
    description: "A continuous journey focused on developing a deeper prayer life and intercession.",
    createdAt: new Date(2022, 11, 1),
    status: "active",
    enrolledCount: 32,
    completedCount: 18,
  },
];

export default function Journeys() {
  const [journeys] = useState(sampleJourneys);

  // Calculate metrics
  const activeJourneys = journeys.filter(journey => journey.status === "active").length;
  const totalEnrolled = journeys.reduce((total, journey) => total + journey.enrolledCount, 0);
  const totalCompleted = journeys.reduce((total, journey) => total + journey.completedCount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-church-primary mb-2">Faith Journeys</h1>
        <p className="text-church-secondary">
          Track and support the spiritual journeys of your congregation members.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Journeys</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-church-accent" />
              {activeJourneys}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>People Enrolled</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-church-accent" />
              {totalEnrolled}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Journeys</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-church-accent" />
              {totalCompleted}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-church-primary">All Journeys</h2>
        <Button className="bg-church-accent hover:bg-church-accent/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Journey
        </Button>
      </div>

      {/* Journeys List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Journey</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journeys.map((journey) => (
                <TableRow key={journey.id} className="cursor-pointer hover:bg-church-muted">
                  <TableCell>
                    <div>
                      <div className="font-medium">{journey.name}</div>
                      <div className="text-sm text-church-secondary">{journey.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-church-secondary" />
                      <span>{format(journey.createdAt, "MMM d, yyyy")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={journey.status === "active" ? "default" : "secondary"}
                      className={journey.status === "active" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-gray-500 hover:bg-gray-600"
                      }
                    >
                      {journey.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-church-secondary" />
                        <span>{journey.enrolledCount} enrolled</span>
                      </div>
                      <div className="flex items-center text-sm text-church-secondary mt-1">
                        <CheckCircle className="mr-2 h-3 w-3" />
                        <span>{journey.completedCount} completed</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
