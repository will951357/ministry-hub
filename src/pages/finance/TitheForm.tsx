
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectField } from "./components/SelectField";
import { DateField } from "./components/DateField";
import { useState, useRef } from "react";
import { titheRecords } from "@/data/tithes";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Get unique members from existing tithe records
const membersList = [...new Set(titheRecords.map(record => record.memberName))];

const formSchema = z.object({
  memberName: z.string().min(2, "Member name must be at least 2 characters"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount",
  }),
  frequency: z.enum(["weekly", "monthly", "quarterly", "yearly", "one-time"]),
  date: z.date(),
  notes: z.string().optional(),
});

export default function TitheForm() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberName: "",
      frequency: "monthly",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: "Tithe recorded",
      description: `Successfully recorded ${values.amount} tithe from ${values.memberName}`,
    });
    
    navigate("/finance/tithes");
  }

  // Filter members based on search term
  const filteredMembers = searchTerm 
    ? membersList.filter(member =>
        member.toLowerCase().includes(searchTerm.toLowerCase()))
    : membersList;

  // Handle selecting a member from suggestions
  const handleSelectMember = (member: string) => {
    form.setValue("memberName", member);
    setSearchTerm(member);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/finance/tithes')}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Record Tithe</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Member Name */}
              <FormField
                control={form.control}
                name="memberName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          ref={inputRef}
                          {...field}
                          value={searchTerm || field.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSearchTerm(value);
                            field.onChange(value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          onClick={() => setShowSuggestions(true)}
                          autoComplete="off"
                        />
                        {showSuggestions && filteredMembers.length > 0 && (
                          <div
                            ref={suggestionsRef}
                            className="absolute mt-1 w-full z-50 bg-background rounded-md border shadow-lg py-1 max-h-60 overflow-auto"
                          >
                            {filteredMembers.map((member) => (
                              <div
                                key={member}
                                className={cn(
                                  "px-2 py-1.5 text-sm cursor-pointer hover:bg-muted flex items-center",
                                  field.value === member && "bg-muted"
                                )}
                                onClick={() => handleSelectMember(member)}
                              >
                                {member}
                                {field.value === member && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
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

              {/* Frequency */}
              <SelectField
                control={form.control}
                name="frequency"
                label="Frequency"
                placeholder="Select frequency"
                options={["weekly", "monthly", "quarterly", "yearly", "one-time"]}
              />

              {/* Date */}
              <DateField control={form.control} />

              {/* Notes (full width) */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Add any additional notes here" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-start">
              <Button type="submit">Save Tithe</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
