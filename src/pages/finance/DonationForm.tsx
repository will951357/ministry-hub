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
  donorName: z.string().min(2, "Donor name must be at least 2 characters"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount",
  }),
  donorType: z.enum(["member", "visitor", "institution"]),
  fund: z.string(),
  paymentMethod: z.string(),
  date: z.date(),
  observation: z.string().optional(),
});

export default function DonationForm() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorName: "",
      amount: "",
      donorType: "member",
      fund: "General",
      paymentMethod: "Credit Card",
      observation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Donation recorded",
      description: `Successfully recorded ${values.amount} donation from ${values.donorName}`,
    });
    navigate("/finance/donations");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/finance/donations')}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Record Donation</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Donor Name */}
              <FormField
                control={form.control}
                name="donorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donor Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. John Smith" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Donor Type */}
              <SelectField
                control={form.control}
                name="donorType"
                label="Donor Type"
                placeholder="Select donor type"
                options={["member", "visitor", "institution"]}
              />

              {/* Fund */}
              <SelectField
                control={form.control}
                name="fund"
                label="Fund"
                placeholder="Select fund"
                options={["General", "Building", "Missions", "Youth Ministry", "Community Outreach"]}
              />

              {/* Payment Method */}
              <SelectField
                control={form.control}
                name="paymentMethod"
                label="Payment Method"
                placeholder="Select payment method"
                options={["Credit Card", "Cash", "Bank Transfer", "Check"]}
              />

              {/* Date */}
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <DateField 
                  control={form.control} 
                  name="date"
                />
                <FormMessage />
              </FormItem>

              {/* Observation (full width) */}
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Observation (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Add any additional notes here" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start">
              <Button type="submit">Save Donation</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
