
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Edit, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QuestionChoice {
  text: string;
  isCorrect: boolean;
}

interface EvaluationQuestion {
  question: string;
  choices: QuestionChoice[];
}

interface Evaluation {
  title: string;
  description: string;
  questions: EvaluationQuestion[];
}

interface ClassEvaluationsTabProps {
  evaluations: Evaluation[];
  setEvaluations: React.Dispatch<React.SetStateAction<Evaluation[]>>;
}

export const ClassEvaluationsTab = ({ evaluations, setEvaluations }: ClassEvaluationsTabProps) => {
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [editingEvaluationIndex, setEditingEvaluationIndex] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newChoices, setNewChoices] = useState<QuestionChoice[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false }
  ]);
  const [questions, setQuestions] = useState<EvaluationQuestion[]>([]);

  const evaluationForm = useForm({
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const updateChoiceText = (index: number, text: string) => {
    const updatedChoices = [...newChoices];
    updatedChoices[index].text = text;
    setNewChoices(updatedChoices);
  };

  const updateChoiceCorrect = (index: number) => {
    const updatedChoices = newChoices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index
    }));
    setNewChoices(updatedChoices);
  };

  const addQuestion = () => {
    if (newQuestion.trim() && newChoices.some(choice => choice.text.trim())) {
      const validChoices = newChoices.filter(choice => choice.text.trim());
      
      if (!validChoices.some(choice => choice.isCorrect)) {
        validChoices[0].isCorrect = true;
      }
      
      setQuestions([...questions, {
        question: newQuestion,
        choices: validChoices
      }]);
      
      setNewQuestion("");
      setNewChoices([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false }
      ]);
      
      toast.success("Question added");
    } else {
      toast.error("Please enter a question and at least one choice");
    }
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleAddEvaluation = () => {
    const evaluationData = {
      title: evaluationForm.getValues("title"),
      description: evaluationForm.getValues("description"),
      questions: [...questions]
    };

    if (!evaluationData.title) {
      toast.error("Please enter an evaluation title");
      return;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    if (editingEvaluationIndex !== null) {
      // Update existing evaluation
      const updatedEvaluations = [...evaluations];
      updatedEvaluations[editingEvaluationIndex] = evaluationData;
      setEvaluations(updatedEvaluations);
      toast.success("Evaluation updated");
    } else {
      // Add new evaluation
      setEvaluations([...evaluations, evaluationData]);
      toast.success("Evaluation added");
    }
    
    // Reset form
    evaluationForm.reset();
    setQuestions([]);
    setEditingEvaluation(null);
    setEditingEvaluationIndex(null);
  };

  const editEvaluation = (index: number) => {
    const evaluation = evaluations[index];
    evaluationForm.reset({
      title: evaluation.title,
      description: evaluation.description
    });
    setQuestions([...evaluation.questions]);
    setEditingEvaluation(evaluation);
    setEditingEvaluationIndex(index);
  };

  const removeEvaluation = (index: number) => {
    const updatedEvaluations = [...evaluations];
    updatedEvaluations.splice(index, 1);
    setEvaluations(updatedEvaluations);
    toast.success("Evaluation removed");
  };

  const cancelEditEvaluation = () => {
    evaluationForm.reset();
    setQuestions([]);
    setEditingEvaluation(null);
    setEditingEvaluationIndex(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Evaluations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...evaluationForm}>
          <div className="space-y-4 border rounded-md p-4 bg-muted/30">
            <h3 className="font-medium">
              {editingEvaluation ? "Edit Evaluation" : "Create Evaluation"}
            </h3>
            
            <FormField
              control={evaluationForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evaluation Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter evaluation title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={evaluationForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the evaluation" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="space-y-3 pt-2">
              <FormLabel>Add Multiple Choice Question</FormLabel>
              <div className="space-y-4">
                <Input 
                  placeholder="Enter your question" 
                  value={newQuestion} 
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                
                <div className="space-y-3">
                  <FormLabel>Choices (select the correct answer)</FormLabel>
                  {newChoices.map((choice, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <RadioGroup 
                        value={choice.isCorrect ? index.toString() : undefined}
                        onValueChange={() => updateChoiceCorrect(index)}
                        className="flex-shrink-0"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} />
                        </div>
                      </RadioGroup>
                      <Input 
                        placeholder={`Choice ${index + 1}`} 
                        value={choice.text} 
                        onChange={(e) => updateChoiceText(index, e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button type="button" onClick={addQuestion}>
                  Add Question
                </Button>
              </div>
            </div>

            {questions.length > 0 && (
              <div className="space-y-4 border-t pt-4 mt-4">
                <h4 className="font-medium">Questions for this evaluation</h4>
                <div className="space-y-3">
                  {questions.map((q, index) => (
                    <div key={index} className="p-3 border rounded-md space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="font-medium">{q.question}</div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeQuestion(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      <div className="pl-3 space-y-1 text-sm">
                        {q.choices.map((choice, choiceIndex) => (
                          <div key={choiceIndex} className="flex items-center gap-2">
                            <div className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center text-xs border",
                              choice.isCorrect ? "bg-green-500 text-white border-green-500" : "border-gray-300"
                            )}>
                              {String.fromCharCode(65 + choiceIndex)}
                            </div>
                            <div>{choice.text}</div>
                            {choice.isCorrect && (
                              <Badge className="ml-1 bg-green-100 text-green-800 hover:bg-green-100">
                                Correct
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4 flex justify-end gap-2">
              {editingEvaluation && (
                <Button type="button" variant="outline" onClick={cancelEditEvaluation}>
                  Cancel
                </Button>
              )}
              <Button type="button" onClick={handleAddEvaluation}>
                {editingEvaluation ? "Update Evaluation" : "Add Evaluation"}
              </Button>
            </div>
          </div>
        </Form>
        
        {evaluations.length > 0 && (
          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Existing Evaluations</h3>
            <div className="space-y-4">
              {evaluations.map((evaluation, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-medium">{evaluation.title}</h4>
                      <p className="text-sm text-muted-foreground">{evaluation.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => editEvaluation(index)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-700" 
                        onClick={() => removeEvaluation(index)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">{evaluation.questions.length} questions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
