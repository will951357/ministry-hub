
import { useState } from "react";
import { PlusCircle, Search, Filter, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  contactOption: z.string().optional(),
  alimentaryRestriction: z.string().optional(),
  specialNecessities: z.string().optional(),
  identificationPassword: z.string().min(4, "Password must be at least 4 characters").max(10, "Password must be at most 10 characters"),
  parentConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface Kid {
  id: string;
  name: string;
  birthDate: string;
  contactOption: string;
  alimentaryRestriction: string;
  specialNecessities: string;
  identificationPassword: string;
}

export default function Kids() {
  const [kids, setKids] = useState<Kid[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      contactOption: "",
      alimentaryRestriction: "",
      specialNecessities: "",
      identificationPassword: "",
      parentConsent: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    const newKid: Kid = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      birthDate: data.birthDate,
      contactOption: data.contactOption || "",
      alimentaryRestriction: data.alimentaryRestriction || "",
      specialNecessities: data.specialNecessities || "",
      identificationPassword: data.identificationPassword,
    };

    setKids([...kids, newKid]);
    setShowForm(false);
    form.reset();
    
    toast({
      title: "Success!",
      description: "Kid has been added to the registry.",
    });
  };

  const filteredKids = kids.filter(kid => 
    kid.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kids Registry</h1>
            <p className="text-muted-foreground">
              Manage all children registered in the church
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Child
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Register New Child</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter child's full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Birth Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactOption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Optional Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="Additional contact information" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="alimentaryRestriction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alimentary Restrictions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any food allergies or dietary restrictions" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="specialNecessities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Necessities</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List any special needs or medical conditions" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="identificationPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification Password</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Create a unique ID password for the child" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="parentConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I confirm that I am the parent/guardian and consent to store this information
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Child</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search kids..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
              prefix={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        {kids.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Baby className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">No children registered yet</h2>
            <p className="mb-8 mt-2 text-center text-sm text-muted-foreground max-w-sm">
              Start by adding children to the registry. You'll be able to manage their information and generate identification QR codes.
            </p>
            <Button onClick={() => setShowForm(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add First Child
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b bg-muted/50">
                  <tr className="text-left">
                    <th className="h-12 px-4 font-medium">Name</th>
                    <th className="h-12 px-4 font-medium">Birth Date</th>
                    <th className="h-12 px-4 font-medium">ID Password</th>
                    <th className="h-12 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKids.map((kid) => (
                    <tr key={kid.id} className="border-b">
                      <td className="p-4">{kid.name}</td>
                      <td className="p-4">{kid.birthDate}</td>
                      <td className="p-4">{kid.identificationPassword}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            QR Code
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
