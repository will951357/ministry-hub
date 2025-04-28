
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SelectField } from "./components/SelectField";
import { DateField } from "./components/DateField";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, "Fund name must be at least 3 characters"),
  description: z.string().min(10, "Please provide a more detailed description"),
  goal: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid goal amount",
  }),
  startDate: z.date(),
  endDate: z.date().optional(),
  ministry: z.string(),
  status: z.enum(["active", "upcoming", "completed", "archived"]),
});

export default function FundForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      goal: "",
      ministry: "General",
      status: "active",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Fund created",
      description: `Successfully created ${values.name} fund`,
    });
    navigate("/finance/funds");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/finance/funds')}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create New Fund</h1>
      </div>
  
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fund Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fund Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Building Renovation" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Goal Amount */}
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              {/* Ministry */}
              <SelectField
                control={form.control}
                name="ministry"
                label="Ministry"
                placeholder="Select ministry"
                options={["General", "Youth", "Children", "Worship", "Missions", "Outreach", "Education"]}
              />
  
              {/* Status */}
              <SelectField
                control={form.control}
                name="status"
                label="Status"
                placeholder="Select status"
                options={["active", "upcoming", "completed", "archived"]}
              />
              
              {/* Start Date */}
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <DateField 
                  control={form.control} 
                  name="startDate"
                />
                <FormMessage />
              </FormItem>
  
              {/* End Date (Optional) */}
              <FormItem className="flex flex-col">
                <FormLabel>End Date (Optional)</FormLabel>
                <DateField 
                  control={form.control} 
                  name="endDate" 
                  isOptional={true}
                />
                <FormMessage />
              </FormItem>
  
              {/* Description (full width) */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Describe the purpose and goals of this fund"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
  
            <div className="flex justify-start">
              <Button type="submit">Create Fund</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
