
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

const formSchema = z.object({
  donor: z.string().min(2, "Donor name must be at least 2 characters"),
  donorType: z.string(),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount",
  }),
  fund: z.string(),
  paymentMethod: z.string(),
  date: z.date(),
  observation: z.string().optional(),
});

export default function DonationForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorType: "member",
      fund: "General",
      paymentMethod: "Cash",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate("/finance/donations");
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">New Donation</h1>
        <p className="text-muted-foreground">Record a new donation</p>
      </div>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="donor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donor Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectField
              control={form.control}
              name="donorType"
              label="Donor Type"
              placeholder="Select donor type"
              options={["Member", "Visitor", "Institution"]}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SelectField
              control={form.control}
              name="fund"
              label="Fund"
              placeholder="Select fund"
              options={["General", "Building", "Missions", "Youth Ministry", "Community Outreach"]}
            />

            <SelectField
              control={form.control}
              name="paymentMethod"
              label="Payment Method"
              placeholder="Select payment method"
              options={["Cash", "Credit Card", "Check", "Bank Transfer"]}
            />

            <DateField control={form.control} />

            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observation (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">Save Donation</Button>
              <Button type="button" variant="outline" onClick={() => navigate("/finance/donations")}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
