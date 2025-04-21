
import { useState } from "react";
import { Plus, X, Award } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useNavigate } from "react-router-dom";

export default function CreateJourney() {
  const [newJourney, setNewJourney] = useState<{
    name: string;
    description: string;
    steps: {
      id: string;
      name: string;
      points: number;
      subSteps: {
        id: string;
        name: string;
      }[];
    }[];
  }>({
    name: "",
    description: "",
    steps: []
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  const addStep = () => {
    setNewJourney(prev => ({
      ...prev,
      steps: [...prev.steps, {
        id: generateId(),
        name: "",
        points: 0,
        subSteps: []
      }]
    }));
  };
  
  const updateStep = (id: string, field: 'name' | 'points', value: string | number) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => step.id === id ? {
        ...step,
        [field]: value
      } : step)
    }));
  };
  
  const removeStep = (id: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== id)
    }));
  };
  
  const addSubStep = (stepId: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => step.id === stepId ? {
        ...step,
        subSteps: [...step.subSteps, {
          id: generateId(),
          name: ""
        }]
      } : step)
    }));
  };
  
  const updateSubStep = (stepId: string, subStepId: string, name: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => step.id === stepId ? {
        ...step,
        subSteps: step.subSteps.map(subStep => subStep.id === subStepId ? {
          ...subStep,
          name
        } : subStep)
      } : step)
    }));
  };
  
  const removeSubStep = (stepId: string, subStepId: string) => {
    setNewJourney(prev => ({
      ...prev,
      steps: prev.steps.map(step => step.id === stepId ? {
        ...step,
        subSteps: step.subSteps.filter(subStep => subStep.id !== subStepId)
      } : step)
    }));
  };

  const handleSubmit = () => {
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
    
    // Here you would typically save the journey
    toast({
      title: "Success",
      description: "Journey created successfully"
    });
    navigate("/people/journeys");
  };

  return (
    <div className="space-y-6 px-4 md:px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-church-primary">Create New Faith Journey</h1>
        <Button variant="outline" onClick={() => navigate("/people/journeys")}>Cancel</Button>
      </div>
      
      <div className="space-y-6">
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
              onChange={e => setNewJourney({
                ...newJourney,
                name: e.target.value
              })} 
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
              onChange={e => setNewJourney({
                ...newJourney,
                description: e.target.value
              })} 
              rows={3} 
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Journey Steps</h3>
            <Button variant="outline" size="sm" onClick={addStep} className="text-church-accent">
              <Plus className="mr-1 h-4 w-4" />
              Add Step
            </Button>
          </div>

          {newJourney.steps.length === 0 && (
            <div className="text-center py-6 border border-dashed rounded-md">
              <Plus className="h-8 w-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No steps added yet</p>
              <Button variant="ghost" size="sm" onClick={addStep} className="mt-2 text-church-accent">
                <Plus className="mr-1 h-4 w-4" />
                Add your first step
              </Button>
            </div>
          )}

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
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label htmlFor={`step-name-${step.id}`} className="text-xs font-medium block mb-1">
                        Step Name
                      </label>
                      <Input 
                        id={`step-name-${step.id}`} 
                        placeholder="e.g., Complete Daily Prayer" 
                        value={step.name} 
                        onChange={e => updateStep(step.id, 'name', e.target.value)} 
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
                        onChange={e => updateStep(step.id, 'points', parseInt(e.target.value) || 0)} 
                      />
                    </div>
                  </div>

                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-full justify-between border border-dashed"
                      >
                        <span className="flex items-center">
                          <Plus className="h-3 w-3 mr-1" />
                          {step.subSteps.length > 0 
                            ? `Sub-steps (${step.subSteps.length})` 
                            : "Add sub-steps (optional)"}
                        </span>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2">
                      {step.subSteps.map(subStep => (
                        <div key={subStep.id} className="flex items-center space-x-2">
                          <Input 
                            placeholder="e.g., Attend Sunday service" 
                            value={subStep.name} 
                            onChange={e => updateSubStep(step.id, subStep.id, e.target.value)} 
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

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/people/journeys")}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-church-accent hover:bg-church-accent/90">
          Create Journey
        </Button>
      </div>
    </div>
  );
}
