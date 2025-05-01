
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Copy, UserPlus, Users } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Sample members data
const membersData = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "David Wilson" },
  { id: 6, name: "Jennifer Taylor" },
  { id: 7, name: "Daniel Martinez" },
  { id: 8, name: "Jessica Anderson" },
  { id: 9, name: "Christopher Thomas" },
  { id: 10, name: "Lisa Jackson" }
];

// Form schema
const groupFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  leader: z.string().min(1, { message: "Please select a leader" }),
});

type GroupFormValues = z.infer<typeof groupFormSchema>;

export default function CreateGroup() {
  const navigate = useNavigate();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [isSelectMembersOpen, setIsSelectMembersOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  
  // Initialize the form
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupFormSchema),
    defaultValues: {
      title: "",
      description: "",
      leader: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (values: GroupFormValues) => {
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one member for the group");
      return;
    }
    
    // Here you would normally send this data to an API
    // For now, we'll just simulate a successful creation
    
    // Generate a random invite link
    const linkId = Math.random().toString(36).substring(2, 10);
    const generatedInviteLink = `https://yourchurch.com/groups/join/${linkId}`;
    setInviteLink(generatedInviteLink);
    
    toast.success("Group created successfully!");
    
    // In a real app, you might navigate immediately or wait for API response
    // navigate(`/groups`);
  };
  
  const handleSelectMembers = () => {
    setIsSelectMembersOpen(true);
  };
  
  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };
  
  const getSelectedMemberNames = () => {
    return selectedMembers.map(id => 
      membersData.find(member => member.id === id)?.name
    ).filter(Boolean);
  };
  
  const copyInviteLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast.success("Invite link copied to clipboard!");
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/groups")}
            className="mr-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Groups
          </Button>
          <h1 className="text-2xl font-semibold text-church-primary">Create New Group</h1>
        </div>
        
        {inviteLink ? (
          <div className="bg-white rounded-lg border border-church-border p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-green-600">Group Created Successfully!</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Group Invite Link</h3>
              <div className="flex items-center">
                <Input 
                  value={inviteLink} 
                  readOnly
                  className="bg-muted pr-10 flex-1"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  className="ml-2" 
                  onClick={copyInviteLink}
                >
                  <Copy size={16} className="mr-1" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Share this link with others to invite them to join this group.
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate("/groups")}
              >
                Return to Groups
              </Button>
              <Button 
                onClick={() => {
                  // In a real app, you would navigate to the actual group
                  navigate("/groups");
                }}
              >
                View Group Details
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-church-border p-6 max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter group title" />
                      </FormControl>
                      <FormDescription>
                        The name of your group as it will appear to members.
                      </FormDescription>
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
                          {...field} 
                          placeholder="Enter a description for your group" 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Describe the purpose and activities of this group.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="leader"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Leader</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a leader" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {membersData.map((member) => (
                            <SelectItem key={member.id} value={member.id.toString()}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Every group requires one leader to manage activities.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Group Members</FormLabel>
                  <div className="mt-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={handleSelectMembers}
                    >
                      <UserPlus size={16} className="mr-2" />
                      Select Members
                    </Button>
                  </div>
                  
                  {selectedMembers.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <Users size={16} className="mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {selectedMembers.length} members selected
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getSelectedMemberNames().map((name, i) => (
                          <Badge key={i} variant="secondary">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Dialog open={isSelectMembersOpen} onOpenChange={setIsSelectMembersOpen}>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Select Group Members</DialogTitle>
                        <DialogDescription>
                          Choose members to add to this group.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="max-h-[300px] overflow-y-auto py-4">
                        {membersData.map((member) => (
                          <div key={member.id} className="flex items-center space-x-2 py-2">
                            <Checkbox 
                              id={`member-${member.id}`}
                              checked={selectedMembers.includes(member.id)}
                              onCheckedChange={() => toggleMemberSelection(member.id)}
                            />
                            <label 
                              htmlFor={`member-${member.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {member.name}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between">
                        <Button
                          variant="outline" 
                          onClick={() => setIsSelectMembersOpen(false)}
                        >
                          Cancel
                        </Button>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm">
                            {selectedMembers.length} selected
                          </span>
                          <DialogClose asChild>
                            <Button>Done</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => navigate("/groups")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Group</Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
