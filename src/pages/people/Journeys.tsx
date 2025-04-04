
import { useState } from "react";
import { format } from "date-fns";
import { 
  PlusCircle, 
  Users, 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  X, 
  Plus, 
  Award, 
  List, 
  Trash2 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

// Type definitions for our journey structure
type SubStep = {
  id: string;
  name: string;
};

type Step = {
  id: string;
  name: string;
  points: number;
  subSteps: SubStep[];
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
  const [isAddJourneyOpen, setIsAddJourneyOpen] = useState(false);
  const [newJourney, setNewJourney] = useState<{
    name: string;
    description: string;
    steps: Step[];
  }>({
    name: "",
    description: "",
    steps: []
  });
  const { toast } = useToast();

  // Calculate metrics
  const activeJourneys = journeys.filter(journey => journey.status === "active").length;
  const totalEnrolled = journeys.reduce((total, journey) => total + journey.enrolledCount, 0);
  const totalCompleted = journeys.reduce((total, journey) => total + journey.completedCount, 0);

  // Function to generate a unique ID for steps and sub-steps
  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Handlers for managing steps
  const addStep = () => {
    setNewJourney(prev => ({
      ...prev,
      steps: [...prev.steps, { id: generateId(), name: "", points: 0, subSteps: [] }]
    }));
  };

  const updateStep = (id: string, field: keyof Omit<Step, 'id' | 'subSteps'>, value: string | number) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeStep = (id: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== id)
    }));
  };

  // Handlers for managing sub-steps
  const addSubStep = (stepId: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, subSteps: [...step.subSteps, { id: generateId(), name: "" }] }
          : step
      )
    }));
  };

  const updateSubStep = (stepId: string, subStepId: string, name: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId
          ? { 
              ...step, 
              subSteps: step.subSteps.map(subStep => 
                subStep.id === subStepId ? { ...subStep, name } : subStep
              )
            }
          : step
      )
    }));
  };

  const removeSubStep = (stepId: string, subStepId: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId
          ? { 
              ...step, 
              subSteps: step.subSteps.filter(subStep => subStep.id !== subStepId)
            }
          : step
      )
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate the form
    if (!newJourney.name.trim()) {
      toast({
        title: "Error",
        description: "Journey name is required",
        variant: "destructive"
      });
      return;
    }

    if (newJourney.steps.length === 0) {
      toast({
        title: "Error",
        description: "At least one step is required",
        variant: "destructive"
      });
      return;
    }

    for (const step of newJourney.steps) {
      if (!step.name.trim()) {
        toast({
          title: "Error",
          description: "All steps must have a name",
          variant: "destructive"
        });
        return;
      }
    }

    // Create new journey
    const newJourneyEntry: Journey = {
      id: Math.max(0, ...journeys.map(j => j.id)) + 1,
      name: newJourney.name,
      description: newJourney.description,
      createdAt: new Date(),
      status: "active",
      enrolledCount: 0,
      completedCount: 0,
      steps: newJourney.steps
    };

    // Add to journeys list
    setJourneys([...journeys, newJourneyEntry]);
    
    // Reset form and close dialog
    setNewJourney({
      name: "",
      description: "",
      steps: []
    });
    setIsAddJourneyOpen(false);

    toast({
      title: "Success",
      description: "Journey created successfully",
    });
  };

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
        <Button 
          className="bg-church-accent hover:bg-church-accent/90"
          onClick={() => setIsAddJourneyOpen(true)}
        >
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

      {/* Add Journey Dialog */}
      <Dialog open={isAddJourneyOpen} onOpenChange={setIsAddJourneyOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Faith Journey</DialogTitle>
            <DialogDescription>
              Design a spiritual growth path with steps and points for your congregation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Journey Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Journey Details</h3>
              <div className="space-y-2">
                <label htmlFor="journeyName" className="text-sm font-medium">
                  Journey Name
                </label>
                <Input
                  id="journeyName"
                  placeholder="e.g., Prayer Warrior, Bible Study, etc."
                  value={newJourney.name}
                  onChange={(e) => setNewJourney({ ...newJourney, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="journeyDescription" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="journeyDescription"
                  placeholder="Describe the purpose and goals of this journey..."
                  value={newJourney.description}
                  onChange={(e) => setNewJourney({ ...newJourney, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            {/* Steps Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Journey Steps</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addStep}
                  className="text-church-accent"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Step
                </Button>
              </div>

              {newJourney.steps.length === 0 && (
                <div className="text-center py-6 border border-dashed rounded-md">
                  <List className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No steps added yet</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={addStep}
                    className="mt-2 text-church-accent"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add your first step
                  </Button>
                </div>
              )}

              {/* Step List */}
              <div className="space-y-4">
                {newJourney.steps.map((step, stepIndex) => (
                  <Card key={step.id} className="relative">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-church-accent">
                          Step {stepIndex + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(step.id)}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Step Name and Points */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label htmlFor={`step-name-${step.id}`} className="text-xs font-medium block mb-1">
                            Step Name
                          </label>
                          <Input
                            id={`step-name-${step.id}`}
                            placeholder="e.g., Complete Daily Prayer"
                            value={step.name}
                            onChange={(e) => updateStep(step.id, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor={`step-points-${step.id}`} className="text-xs font-medium block mb-1">
                            <span className="flex items-center">
                              <Award className="h-3 w-3 mr-1 text-church-accent" />
                              Points
                            </span>
                          </label>
                          <Input
                            id={`step-points-${step.id}`}
                            type="number"
                            min="0"
                            placeholder="10"
                            value={step.points || ''}
                            onChange={(e) => updateStep(step.id, 'points', parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      {/* Sub-Steps Section */}
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full justify-between border border-dashed">
                            <span className="flex items-center">
                              <Plus className="h-3 w-3 mr-1" />
                              {step.subSteps.length > 0
                                ? `Sub-steps (${step.subSteps.length})`
                                : "Add sub-steps (optional)"}
                            </span>
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 space-y-2">
                          {step.subSteps.map((subStep) => (
                            <div key={subStep.id} className="flex items-center space-x-2">
                              <Input
                                placeholder="e.g., Attend Sunday service"
                                value={subStep.name}
                                onChange={(e) => updateSubStep(step.id, subStep.id, e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubStep(step.id, subStep.id)}
                                className="h-8 w-8 p-0 text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addSubStep(step.id)}
                            className="w-full justify-center border border-dashed mt-2 text-church-accent"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add another sub-step
                          </Button>
                        </CollapsibleContent>
                      </Collapsible>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddJourneyOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-church-accent hover:bg-church-accent/90"
            >
              Create Journey
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
