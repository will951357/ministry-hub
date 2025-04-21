
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { visitorSchema } from "@/pages/people/Visitors";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Smartphone } from "lucide-react";

export default function EditVisitor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const isNewVisitor = !id;

  const form = useForm({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      cellGroup: "",
      visitMethod: "in-person"
    },
  });

  const onSubmit = (data: z.infer<typeof visitorSchema>) => {
    // In a real app, this would send data to your backend
    console.log(data);
    
    toast({
      title: isNewVisitor ? "Visitor Added" : "Visitor Updated",
      description: isNewVisitor 
        ? "The new visitor has been successfully added." 
        : "The visitor has been successfully updated.",
    });
    navigate("/people/visitors");
  };

  const cellGroups = [
    "North Side",
    "Downtown",
    "West Side",
    "Youth Group",
    "College Ministry"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/people/visitors")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-church-primary">
          {isNewVisitor ? "Add New Visitor" : "Edit Visitor"}
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
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cellGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cell Group</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a cell group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cellGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="visitMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visit Method</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How did they attend?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in-person">
                        <div className="flex items-center">
                          <Building size={16} className="mr-2" />
                          In Person
                        </div>
                      </SelectItem>
                      <SelectItem value="app">
                        <div className="flex items-center">
                          <Smartphone size={16} className="mr-2" />
                          Via App
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit">
                {isNewVisitor ? "Add Visitor" : "Update Visitor"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
