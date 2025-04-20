
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Award, Users, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

export default function JourneyDetails() {
  const { journeyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // For now, we'll use the same sample data as in Journeys.tsx
  // In a real application, this would be fetched from an API
  const journey = sampleJourneys.find(j => j.id === Number(journeyId));

  if (!journey) {
    return (
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate('/people/journeys')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journeys
        </Button>
        <p>Journey not found.</p>
      </div>
    );
  }

  const downloadJourneyData = () => {
    const content = generateJourneyExport(journey);
    const blob = new Blob([content], { type: 'text/plain' });
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Button variant="ghost" onClick={() => navigate('/people/journeys')} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Journeys
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{journey.name}</h1>
          <p className="text-muted-foreground">{journey.description}</p>
          <div className="flex gap-2 mt-4">
            <Badge variant={journey.status === "active" ? "default" : "secondary"} 
                   className={journey.status === "active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}>
              {journey.status === "active" ? "Active" : "Completed"}
            </Badge>
            <Badge variant="outline" className="flex gap-1">
              Created {format(journey.createdAt, "MMM d, yyyy")}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Enrolled Members</p>
                  <h3 className="text-2xl font-bold">{journey.enrolledCount}</h3>
                </div>
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold">{journey.completedCount}</h3>
                </div>
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-medium">Journey Steps</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {journey.steps?.map((step, index) => (
              <AccordionItem value={step.id} key={step.id}>
                <AccordionTrigger className="hover:no-underline px-6">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-2">
                        {index + 1}
                      </div>
                      <span>{step.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-primary/80">
                        <Award className="mr-1 h-3 w-3" />
                        {step.points} pts
                      </Badge>
                      <Badge variant="outline">
                        <Users className="mr-1 h-3 w-3" />
                        {step.completions?.length || 0}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <div className="pl-10 space-y-3">
                    {step.subSteps.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-2">Sub-steps:</h4>
                        <ul className="space-y-1 text-sm ml-2">
                          {step.subSteps.map(subStep => (
                            <li key={subStep.id} className="flex items-center">
                              <ChevronRight className="h-3 w-3 mr-1 text-primary" />
                              {subStep.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {step.completions && step.completions.length > 0 ? (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Completed by:</h4>
                        <ul className="space-y-2">
                          {step.completions.map(completion => (
                            <li key={completion.participantId} 
                                className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                              <div className="flex items-center">
                                <div className="h-6 w-6 rounded-full bg-gray-200 mr-2 overflow-hidden">
                                  <img src={completion.participantAvatar} 
                                       alt={completion.participantName} 
                                       className="h-full w-full object-cover" />
                                </div>
                                <span>{completion.participantName}</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {format(completion.completedDate, "MMM d, yyyy")}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No completions yet</p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

// Helper function from the original Journeys page
const generateJourneyExport = (journey) => {
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

