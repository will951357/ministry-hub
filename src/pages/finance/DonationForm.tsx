
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { mockDonations } from "@/data/donations";
import { useClickOutside } from "@/hooks/use-click-outside";

// Using the existing members from mock data as our donor list - ensure it's never undefined
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useClickOutside(() => setIsDropdownOpen(false));

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

  // Make sure filteredMembers is always a valid array
  const filteredMembers = searchTerm 
    ? membersList.filter(member =>
        member.toLowerCase().includes(searchTerm.toLowerCase()))
    : membersList;

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
                          {...field}
                          onFocus={() => setIsDropdownOpen(true)}
                          onClick={() => setIsDropdownOpen(true)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            setSearchTerm(e.target.value);
                            setIsDropdownOpen(true);
                          }}
                          autoComplete="off"
                        />
                      </FormControl>
                      {isDropdownOpen && (
                        <div ref={dropdownRef} className="absolute w-full z-50">
                          <Command className="rounded-lg border shadow-md bg-popover">
                            <CommandInput 
                              placeholder="Search members..." 
                              value={searchTerm} 
                              onValueChange={(value) => {
                                setSearchTerm(value);
                              }}
                            />
                            <CommandEmpty>No members found.</CommandEmpty>
                            <CommandGroup className="max-h-48 overflow-auto">
                              {filteredMembers && filteredMembers.length > 0 ? filteredMembers.map((member) => (
                                <CommandItem
                                  key={member}
                                  value={member}
                                  onSelect={() => {
                                    form.setValue("donor", member);
                                    setIsDropdownOpen(false);
                                  }}
                                >
                                  {member}
                                </CommandItem>
                              )) : <CommandEmpty>No members found.</CommandEmpty>}
                            </CommandGroup>
                          </Command>
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
