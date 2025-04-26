import { useState } from "react";
import { format } from "date-fns";
import { PlusCircle, Users, Sparkles, CheckCircle, Calendar, X, Plus, Award, List, Trash2, ChevronRight, ArrowLeft, FileText, TrendingUp, TrendingDown, Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useNavigate } from "react-router-dom";

const sampleParticipants = [{
  id: 1,
  name: "John Smith",
  avatar: "/placeholder.svg"
}, {
  id: 2,
  name: "Maria Garcia",
  avatar: "/placeholder.svg"
}, {
  id: 3,
  name: "David Lee",
  avatar: "/placeholder.svg"
}, {
  id: 4,
  name: "Sarah Johnson",
  avatar: "/placeholder.svg"
}, {
  id: 5,
  name: "Michael Brown",
  avatar: "/placeholder.svg"
}, {
  id: 6,
  name: "Lisa Chen",
  avatar: "/placeholder.svg"
}, {
  id: 7,
  name: "James Wilson",
  avatar: "/placeholder.svg"
}, {
  id: 8,
  name: "Emily Davis",
  avatar: "/placeholder.svg"
}];

const generateStepCompletions = (stepId: string) => {
  const completedCount = Math.floor(Math.random() * 6) + 1;
  const participants = [...sampleParticipants].sort(() => 0.5 - Math.random()).slice(0, completedCount);
  return participants.map(participant => ({
    participantId: participant.id,
    participantName: participant.name,
    participantAvatar: participant.avatar,
    completedDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
  }));
};

const sampleJourneys = [{
  id: 1,
  name: "New Believer Discipleship",
  description: "A 12-week journey for new believers to establish a strong foundation in faith.",
  createdAt: new Date(2023, 0, 15),
  status: "active",
  enrolledCount: 24,
  completedCount: 8,
  steps: [{
    id: "step-1-1",
    name: "Complete Foundations Course",
    points: 50,
    subSteps: [{
      id: "sub-1-1",
      name: "Attend all 4 sessions"
    }, {
      id: "sub-1-2",
      name: "Complete workbook"
    }],
    completions: generateStepCompletions("step-1-1")
  }, {
    id: "step-1-2",
    name: "Daily Bible Reading (30 days)",
    points: 100,
    subSteps: [{
      id: "sub-2-1",
      name: "Read Old Testament selections"
    }, {
      id: "sub-2-2",
      name: "Read New Testament selections"
    }],
    completions: generateStepCompletions("step-1-2")
  }, {
    id: "step-1-3",
    name: "Join a Small Group",
    points: 75,
    subSteps: [],
    completions: generateStepCompletions("step-1-3")
  }]
}, {
  id: 2,
  name: "Baptism Preparation",
  description: "A 4-week journey preparing members for baptism and understanding its significance.",
  createdAt: new Date(2023, 2, 10),
  status: "active",
  enrolledCount: 12,
  completedCount: 5,
  steps: [{
    id: "step-2-1",
    name: "Study the Meaning of Baptism",
    points: 30,
    subSteps: [],
    completions: generateStepCompletions("step-2-1")
  }, {
    id: "step-2-2",
    name: "Write Personal Testimony",
    points: 50,
    subSteps: [],
    completions: generateStepCompletions("step-2-2")
  }]
}, {
  id: 3,
  name: "Leadership Development",
  description: "A 6-month journey to equip and prepare potential leaders for ministry roles.",
  createdAt: new Date(2022, 8, 5),
  status: "completed",
  enrolledCount: 18,
  completedCount: 15,
  steps: [{
    id: "step-3-1",
    name: "Leadership Training Sessions",
    points: 200,
    subSteps: [],
    completions: generateStepCompletions("step-3-1")
  }, {
    id: "step-3-2",
    name: "Serving in Ministry (weekly for 3 months)",
    points: 300,
    subSteps: [],
    completions: generateStepCompletions("step-3-2")
  }, {
    id: "step-3-3",
    name: "Complete Leadership Book Reading (3 books)",
    points: 150,
    subSteps: [],
    completions: generateStepCompletions("step-3-3")
  }]
}, {
  id: 4,
  name: "Marriage Enrichment",
  description: "An 8-week journey for couples to strengthen their marriage relationship.",
  createdAt: new Date(2023, 5, 20),
  status: "active",
  enrolledCount: 14,
  completedCount: 0,
  steps: [{
    id: "step-4-1",
    name: "Attend Marriage Workshop Sessions",
    points: 100,
    subSteps: [],
    completions: generateStepCompletions("step-4-1")
  }, {
    id: "step-4-2",
    name: "Complete Marriage Devotional Together",
    points: 75,
    subSteps: [],
    completions: generateStepCompletions("step-4-2")
  }]
}, {
  id: 5,
  name: "Prayer Warriors",
  description: "A continuous journey focused on developing a deeper prayer life and intercession.",
  createdAt: new Date(2022, 11, 1),
  status: "active",
  enrolledCount: 32,
  completedCount: 18,
  steps: [{
    id: "step-5-1",
    name: "Daily Prayer Challenge (21 days)",
    points: 100,
    subSteps: [],
    completions: generateStepCompletions("step-5-1")
  }, {
    id: "step-5-2",
    name: "Join Prayer Team (3 months)",
    points: 250,
    subSteps: [],
    completions: generateStepCompletions("step-5-2")
  }]
}];

type SubStep = {
  id: string;
  name: string;
};

type Completion = {
  participantId: number;
  participantName: string;
  participantAvatar: string;
  completedDate: Date;
};

type Step = {
  id: string;
  name: string;
  points: number;
  subSteps: SubStep[];
  completions?: Completion[];
};

type Journey = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: string;
  enrolledCount: number;
  completedCount: number;
  steps?: Step[];
};

export default function Journeys() {
  const [journeys, setJourneys] = useState<Journey[]>(sampleJourneys);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const activeJourneys = journeys.filter(journey => journey.status === "active").length;
  const totalEnrolled = journeys.reduce((total, journey) => total + journey.enrolledCount, 0);
  const totalCompleted = journeys.reduce((total, journey) => total + journey.completedCount, 0);
  const completedChangePercent = Math.floor(Math.random() * 50) - 20;
  const isPositiveTrend = completedChangePercent > 0;
  const generateId = () => Math.random().toString(36).substring(2, 9);
  const addStep = () => {
    
  };
  const updateStep = (id: string, field: keyof Omit<Step, 'id' | 'subSteps'>, value: string | number) => {
    
  };
  const removeStep = (id: string) => {
    
  };
  const addSubStep = (stepId: string) => {
    
  };
  const updateSubStep = (stepId: string, subStepId: string, name: string) => {
    
  };
  const removeSubStep = (stepId: string, subStepId: string) => {
    
  };
  const handleSubmit = () => {
    
  };
  const handleJourneyClick = (journey: Journey) => {
    navigate(`/people/journeys/${journey.id}`);
  };
  const generateJourneyExport = (journey: Journey): string => {
    if (!journey) return '';
    let content = `Journey: ${journey.name}\n`;
    content += `Description: ${journey.description}\n`;
    content += `Created: ${format(journey.createdAt, "MMM d, yyyy")}\n`;
    content += `Status: ${journey.status}\n`;
    content += `Participants: ${journey.enrolledCount} enrolled, ${journey.completedCount} completed\n\n`;
    content += "STEPS:\n";
    journey.steps?.forEach((step, index) => {
      content += `\n${index + 1}. ${step.name} (${step.points} points)\n`;
      if (step.subSteps && step.subSteps.length > 0) {
        content += "   Sub-steps:\n";
        step.subSteps.forEach(subStep => {
          content += `   - ${subStep.name}\n`;
        });
      }
      content += "   Completed by:\n";
      if (step.completions && step.completions.length > 0) {
        step.completions.forEach(completion => {
          content += `   - ${completion.participantName} (${format(completion.completedDate, "MMM d, yyyy")})\n`;
        });
      } else {
        content += "   - No completions yet\n";
      }
    });
    return content;
  };
  const downloadJourneyData = (journey: Journey) => {
    if (!journey) return;
    const content = generateJourneyExport(journey);
    const blob = new Blob([content], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${journey.name.replace(/\s+/g, '_')}_journey.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Success",
      description: "Journey data downloaded successfully"
    });
  };
  const downloadAllJourneysData = () => {
    const allContent = journeys.map(journey => generateJourneyExport(journey)).join("\n\n-------------------\n\n");
    const blob = new Blob([allContent], {
      type: 'text/plain'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "all_journeys_data.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Success",
      description: "All journeys data downloaded successfully"
    });
  };
  const filteredJourneys = journeys.filter(journey => journey.name.toLowerCase().includes(searchTerm.toLowerCase()) || journey.description.toLowerCase().includes(searchTerm.toLowerCase()));
  const journeyStats = <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard title="Active Journeys" value={activeJourneys.toString()} icon={<Sparkles className="h-5 w-5" />} className="bg-white" description="Create journeys and engage your community" />
      
      <StatsCard title="People Enrolled" value={totalEnrolled.toString()} description={`${totalCompleted} people completed their journeys`} icon={<Users className="h-5 w-5" />} className="bg-white" />
      
      <StatsCard title="Completed Journeys" value={totalCompleted.toString()} icon={<CheckCircle className="h-5 w-5" />} trend={{
      value: Math.abs(completedChangePercent),
      isPositive: isPositiveTrend
    }} className="bg-white" description="Compared to last month" />
    </div>;

  return <div className="space-y-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-church-primary mb-2">Faith Journeys</h1>
          <p className="text-church-secondary">
            Track and support the spiritual journeys of your congregation members.
          </p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto" 
          onClick={() => navigate("/people/journeys/new")}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Journey
        </Button>
      </div>

      {journeyStats}

      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-[600px]">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search journeys..." 
              className="pl-10 w-full" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="flex gap-2 justify-end sm:justify-start">
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter size={18} />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1 shrink-0" 
              onClick={downloadAllJourneysData}
            >
              <Download size={18} />
              <span className="hidden sm:inline">Download All</span>
            </Button>
          </div>
        </div>
      </div>

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
              {filteredJourneys.map(journey => <TableRow key={journey.id} className="cursor-pointer hover:bg-church-muted" onClick={() => handleJourneyClick(journey)}>
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
                    <Badge variant={journey.status === "active" ? "default" : "secondary"} className={journey.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}>
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
                </TableRow>)}
              {filteredJourneys.length === 0 && <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No journeys found matching your search.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      
    </div>;
}
