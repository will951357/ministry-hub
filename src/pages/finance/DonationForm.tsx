
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
import { useEffect, useState, useRef } from "react";
import { mockDonations } from "@/data/donations";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Using the existing members from mock data as our donor list
const membersList = [...new Set(mockDonations.map(d => d.donor))].filter(Boolean);

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donor: "",
      donorType: "member",
      fund: "General",
      paymentMethod: "Cash",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    navigate("/finance/donations");
  }

  // Filter members based on search term
  const filteredMembers = searchTerm 
    ? membersList.filter(member =>
        member.toLowerCase().includes(searchTerm.toLowerCase()))
    : membersList;

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selecting a member from suggestions
  const handleSelectMember = (member: string) => {
    form.setValue("donor", member);
    setSearchTerm(member);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">New Donation</h1>
        <p className="text-muted-foreground">Record a new donation</p>
      </div>

      <div className="max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Row */}
              <FormField
                control={form.control}
                name="donor"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Donor Name</FormLabel>
                    <div className="relative">
                      <FormControl>
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
                      </FormControl>
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

              {/* Second Row */}
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

              {/* Third Row */}
              <SelectField
                control={form.control}
                name="paymentMethod"
                label="Payment Method"
                placeholder="Select payment method"
                options={["Cash", "Credit Card", "Check", "Bank Transfer"]}
              />

              <DateField control={form.control} />

              {/* Fourth Row */}
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Observation (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
