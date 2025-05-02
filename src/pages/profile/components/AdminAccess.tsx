
import React, { useState } from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, UserCheck, Users, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AccessRole = "finance" | "people" | "events" | "app" | "full";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: AccessRole;
  avatar: string;
};

const admins: AdminUser[] = [
  { 
    id: 1, 
    name: "Pastor John Smith", 
    email: "pastor@gracecommunity.org", 
    role: "full", 
    avatar: "https://github.com/shadcn.png" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    email: "sarah@gracecommunity.org", 
    role: "finance", 
    avatar: "" 
  },
  { 
    id: 3, 
    name: "Mike Williams", 
    email: "mike@gracecommunity.org", 
    role: "people", 
    avatar: "" 
  },
];

const roleOptions = [
  { value: "finance", label: "Finance Access" },
  { value: "people", label: "People Access" },
  { value: "events", label: "Events Access" },
  { value: "app", label: "App Management" },
  { value: "full", label: "Full Access" },
];

const getRoleBadge = (role: AccessRole) => {
  switch (role) {
    case "finance":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Finance</Badge>;
    case "people":
      return <Badge variant="outline" className="border-green-500 text-green-500">People</Badge>;
    case "events":
      return <Badge variant="outline" className="border-purple-500 text-purple-500">Events</Badge>;
    case "app":
      return <Badge variant="outline" className="border-orange-500 text-orange-500">App</Badge>;
    case "full":
      return <Badge variant="outline" className="border-red-500 text-red-500">Full Access</Badge>;
    default:
      return null;
  }
};

export const AdminAccess = () => {
  const { toast } = useToast();
  const [adminsList, setAdminsList] = useState<AdminUser[]>(admins);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "people" as AccessRole
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const handleAddAdmin = () => {
    const newAdminEntry = {
      ...newAdmin,
      id: adminsList.length + 1,
      avatar: ""
    };
    
    setAdminsList([...adminsList, newAdminEntry]);
    setAddDialogOpen(false);
    setNewAdmin({
      name: "",
      email: "",
      role: "people"
    });
    
    toast({
      title: "Administrator added",
      description: `${newAdmin.name} has been added as an administrator.`,
    });
  };
  
  const handleUpdateRole = (id: number, newRole: AccessRole) => {
    setAdminsList(adminsList.map(admin => 
      admin.id === id ? { ...admin, role: newRole } : admin
    ));
    
    toast({
      title: "Role updated",
      description: "Administrator role has been updated successfully.",
    });
  };
  
  const handleRemoveAdmin = (id: number) => {
    setAdminsList(adminsList.filter(admin => admin.id !== id));
    
    toast({
      title: "Administrator removed",
      description: "The administrator has been removed from the system.",
    });
  };
  
  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
              System Administrators
            </CardTitle>
            <CardDescription>
              Manage users who have administrative access to your church system.
            </CardDescription>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center">
                <Plus className="mr-1 h-4 w-4" /> Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Administrator</DialogTitle>
                <DialogDescription>
                  Add a church member as an administrator with specific system access.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Name</Label>
                  <Input 
                    id="admin-name" 
                    placeholder="Administrator name" 
                    value={newAdmin.name}
                    onChange={e => setNewAdmin({...newAdmin, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="administrator@example.com" 
                    value={newAdmin.email}
                    onChange={e => setNewAdmin({...newAdmin, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-role">Access Level</Label>
                  <Select 
                    value={newAdmin.role} 
                    onValueChange={value => setNewAdmin({...newAdmin, role: value as AccessRole})}
                  >
                    <SelectTrigger id="admin-role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddAdmin} disabled={!newAdmin.name || !newAdmin.email}>Add Administrator</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6 rounded-md border p-4">
          <div className="flex items-start">
            <div className="mr-4 mt-0.5">
              <UserCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Your plan includes 3 administrators</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have used {adminsList.length} of 3 administrator accounts. 
                <a href="#" className="ml-1 text-primary underline">Upgrade your plan</a> to add more administrators.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Administrator</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminsList.map(admin => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={admin.avatar} alt={admin.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {admin.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{admin.name}</p>
                        <p className="text-sm text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getRoleBadge(admin.role)}
                      {admin.id === 1 && (
                        <Badge variant="secondary" className="ml-2">Primary Admin</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select 
                        value={admin.role} 
                        onValueChange={value => handleUpdateRole(admin.id, value as AccessRole)}
                        disabled={admin.id === 1} // Primary admin role can't be changed
                      >
                        <SelectTrigger className="h-8 w-40">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {admin.id !== 1 && ( // Don't allow removing primary admin
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove administrator?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will revoke {admin.name}'s administrative access to the system.
                                They can still access the system as a regular member.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveAdmin(admin.id)}>
                                Remove Admin
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-6 flex flex-col text-sm text-muted-foreground space-y-2">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          <span>Administrator accounts can access specific areas of the church management system based on their assigned role.</span>
        </div>
        <p>The primary administrator cannot be removed and has full access to all system features.</p>
      </CardFooter>
    </>
  );
};
