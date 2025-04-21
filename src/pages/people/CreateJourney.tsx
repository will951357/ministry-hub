
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const journeySchema = z.object({
  name: z.string().min(2, { message: "Journey name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Please provide a detailed description." }),
  steps: z.array(z.object({
    name: z.string().min(2),
    points: z.number().min(0),
    subSteps: z.array(z.object({
      name: z.string()
    }))
  }))
});

type JourneyFormValues = z.infer<typeof journeySchema>;

export default function CreateJourney() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<JourneyFormValues>({
    resolver: zodResolver(journeySchema),
    defaultValues: {
      name: "",
      description: "",
      steps: []
    },
  });

  const onSubmit = (data: JourneyFormValues) => {
    console.log(data);
    toast({
      title: "Journey Created",
      description: "The new journey has been successfully created.",
    });
    navigate("/people/journeys");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/people/journeys")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-church-primary">
          Create New Journey
        </h1>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journey Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Prayer Warrior, Bible Study" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the purpose and goals of this journey..." 
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => navigate("/people/journeys")}
              >
                Cancel
              </Button>
              <Button type="submit">
                Create Journey
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
