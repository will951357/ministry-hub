
import React, { useState } from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, UserCheck, Users, Trash2, Check, Settings, Edit } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  accessLevelId: number;
  avatar: string;
};

type Permission = {
  id: string;
  name: string;
  description: string;
};

type AccessLevel = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  color?: string;
};

// Available permissions in the system
const availablePermissions: Permission[] = [
  { id: "people_view", name: "View People", description: "Can view members, visitors, and kids" },
  { id: "people_edit", name: "Edit People", description: "Can add/edit member information" },
  { id: "finance_view", name: "View Finance", description: "Can view donations and tithes" },
  { id: "finance_edit", name: "Edit Finance", description: "Can add/edit financial records" },
  { id: "events_view", name: "View Events", description: "Can view church events" },
  { id: "events_edit", name: "Edit Events", description: "Can create and manage events" },
  { id: "groups_view", name: "View Groups", description: "Can view groups and classes" },
  { id: "groups_edit", name: "Edit Groups", description: "Can create and manage groups" },
  { id: "app_view", name: "View App", description: "Can view app content" },
  { id: "app_edit", name: "Edit App", description: "Can edit app content" },
  { id: "admin_access", name: "Admin Access", description: "Can manage system admins" },
];

// Example permission categories
const permissionCategories = [
  { id: "people", name: "People Management", permissions: ["people_view", "people_edit"] },
  { id: "finance", name: "Finance", permissions: ["finance_view", "finance_edit"] },
  { id: "events", name: "Events", permissions: ["events_view", "events_edit"] },
  { id: "groups", name: "Groups", permissions: ["groups_view", "groups_edit"] },
  { id: "app", name: "App Management", permissions: ["app_view", "app_edit"] },
  { id: "admin", name: "Administration", permissions: ["admin_access"] },
];

// Initial access levels
const initialAccessLevels: AccessLevel[] = [
  { 
    id: 1, 
    name: "Full Access", 
    description: "Complete access to all system features",
    permissions: availablePermissions.map(p => p.id),
    color: "bg-red-100 border-red-500 text-red-700"
  },
  {
    id: 2,
    name: "Finance Manager",
    description: "Can manage all financial aspects",
    permissions: ["finance_view", "finance_edit"],
    color: "bg-blue-100 border-blue-500 text-blue-700"
  },
  {
    id: 3,
    name: "People Manager",
    description: "Can manage members and visitors",
    permissions: ["people_view", "people_edit"],
    color: "bg-green-100 border-green-500 text-green-700"
  },
];

// Initial admins
const initialAdmins: AdminUser[] = [
  { 
    id: 1, 
    name: "Pastor John Smith", 
    email: "pastor@gracecommunity.org", 
    accessLevelId: 1, 
    avatar: "https://github.com/shadcn.png" 
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    email: "sarah@gracecommunity.org", 
    accessLevelId: 2, 
    avatar: "" 
  },
  { 
    id: 3, 
    name: "Mike Williams", 
    email: "mike@gracecommunity.org", 
    accessLevelId: 3, 
    avatar: "" 
  },
];

export const AdminAccess = () => {
  const { toast } = useToast();
  const [adminsList, setAdminsList] = useState<AdminUser[]>(initialAdmins);
  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>(initialAccessLevels);
  const [activeTab, setActiveTab] = useState<string>("admins");
  
  // Dialog states
  const [addAdminDialogOpen, setAddAdminDialogOpen] = useState(false);
  const [addAccessLevelDialogOpen, setAddAccessLevelDialogOpen] = useState(false);
  const [editAccessLevelDialogOpen, setEditAccessLevelDialogOpen] = useState(false);
  
  // Form states
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    accessLevelId: 3 // Default to People Manager
  });
  
  const [newAccessLevel, setNewAccessLevel] = useState<Omit<AccessLevel, 'id'>>({
    name: "",
    description: "",
    permissions: []
  });
  
  const [editingAccessLevel, setEditingAccessLevel] = useState<AccessLevel | null>(null);
  
  // Handlers for admin management
  const handleAddAdmin = () => {
    const newAdminEntry = {
      ...newAdmin,
      id: adminsList.length + 1,
      avatar: ""
    };
    
    setAdminsList([...adminsList, newAdminEntry]);
    setAddAdminDialogOpen(false);
    setNewAdmin({
      name: "",
      email: "",
      accessLevelId: 3
    });
    
    toast({
      title: "Administrator added",
      description: `${newAdmin.name} has been added as an administrator.`,
    });
  };
  
  const handleUpdateAccessLevel = (id: number, accessLevelId: number) => {
    setAdminsList(adminsList.map(admin => 
      admin.id === id ? { ...admin, accessLevelId } : admin
    ));
    
    toast({
      title: "Access level updated",
      description: "Administrator access level has been updated successfully.",
    });
  };
  
  const handleRemoveAdmin = (id: number) => {
    setAdminsList(adminsList.filter(admin => admin.id !== id));
    
    toast({
      title: "Administrator removed",
      description: "The administrator has been removed from the system.",
    });
  };
  
  // Handlers for access level management
  const handleAddAccessLevel = () => {
    const newLevel: AccessLevel = {
      ...newAccessLevel,
      id: accessLevels.length + 1
    };
    
    setAccessLevels([...accessLevels, newLevel]);
    setAddAccessLevelDialogOpen(false);
    setNewAccessLevel({
      name: "",
      description: "",
      permissions: []
    });
    
    toast({
      title: "Access level created",
      description: `${newAccessLevel.name} access level has been created successfully.`,
    });
  };
  
  const handleUpdateAccessLevelDetails = () => {
    if (!editingAccessLevel) return;
    
    setAccessLevels(accessLevels.map(level => 
      level.id === editingAccessLevel.id ? editingAccessLevel : level
    ));
    
    setEditAccessLevelDialogOpen(false);
    setEditingAccessLevel(null);
    
    toast({
      title: "Access level updated",
      description: "Access level has been updated successfully.",
    });
  };
  
  const handleRemoveAccessLevel = (id: number) => {
    // Check if any admins are using this access level
    const adminsUsingLevel = adminsList.filter(admin => admin.accessLevelId === id);
    
    if (adminsUsingLevel.length > 0) {
      toast({
        title: "Cannot remove access level",
        description: "This access level is currently assigned to administrators.",
        variant: "destructive"
      });
      return;
    }
    
    setAccessLevels(accessLevels.filter(level => level.id !== id));
    
    toast({
      title: "Access level removed",
      description: "The access level has been removed from the system.",
    });
  };
  
  const handleEditAccessLevel = (level: AccessLevel) => {
    setEditingAccessLevel(level);
    setEditAccessLevelDialogOpen(true);
  };
  
  // Helper functions
  const getAccessLevelById = (id: number) => {
    return accessLevels.find(level => level.id === id) || accessLevels[0];
  };
  
  const getAccessLevelBadge = (accessLevelId: number) => {
    const level = getAccessLevelById(accessLevelId);
    const defaultClass = "border px-2 py-0.5 rounded-full text-xs font-medium";
    
    if (level.color) {
      return <span className={`${defaultClass} ${level.color}`}>{level.name}</span>;
    }
    
    // Default styling
    return <Badge variant="outline">{level.name}</Badge>;
  };
  
  // Modified version of togglePermission that accepts either AccessLevel or Omit<AccessLevel, "id">
  const togglePermission = (
    permissionId: string, 
    targetState: AccessLevel | Omit<AccessLevel, "id">
  ) => {
    const currentPermissions = [...targetState.permissions];
    
    if (currentPermissions.includes(permissionId)) {
      return {
        ...targetState,
        permissions: currentPermissions.filter(id => id !== permissionId)
      };
    } else {
      return {
        ...targetState,
        permissions: [...currentPermissions, permissionId]
      };
    }
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
              Manage access levels and administrators for your church management system.
            </CardDescription>
          </div>
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="admins">Administrators</TabsTrigger>
            <TabsTrigger value="access-levels">Access Levels</TabsTrigger>
          </TabsList>
          
          {/* Administrators Tab */}
          <TabsContent value="admins" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Dialog open={addAdminDialogOpen} onOpenChange={setAddAdminDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center">
                    <Plus className="mr-1 h-4 w-4" /> Add Administrator
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Administrator</DialogTitle>
                    <DialogDescription>
                      Add a church member as an administrator with specific access level.
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
                        value={newAdmin.accessLevelId.toString()} 
                        onValueChange={value => setNewAdmin({...newAdmin, accessLevelId: parseInt(value)})}
                      >
                        <SelectTrigger id="admin-role">
                          <SelectValue placeholder="Select an access level" />
                        </SelectTrigger>
                        <SelectContent>
                          {accessLevels.map(level => (
                            <SelectItem key={level.id} value={level.id.toString()}>
                              {level.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddAdminDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddAdmin} disabled={!newAdmin.name || !newAdmin.email}>
                      Add Administrator
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                          {getAccessLevelBadge(admin.accessLevelId)}
                          {admin.id === 1 && (
                            <Badge variant="secondary" className="ml-2">Primary Admin</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select 
                            value={admin.accessLevelId.toString()} 
                            onValueChange={value => handleUpdateAccessLevel(admin.id, parseInt(value))}
                            disabled={admin.id === 1} // Primary admin role can't be changed
                          >
                            <SelectTrigger className="h-8 w-40">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              {accessLevels.map(level => (
                                <SelectItem key={level.id} value={level.id.toString()}>
                                  {level.name}
                                </SelectItem>
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
          </TabsContent>
          
          {/* Access Levels Tab */}
          <TabsContent value="access-levels" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Dialog open={addAccessLevelDialogOpen} onOpenChange={setAddAccessLevelDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center">
                    <Plus className="mr-1 h-4 w-4" /> Create Access Level
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Access Level</DialogTitle>
                    <DialogDescription>
                      Define a new access level with specific permissions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-2">
                      <Label htmlFor="access-name">Name</Label>
                      <Input 
                        id="access-name" 
                        placeholder="Access level name"
                        value={newAccessLevel.name}
                        onChange={e => setNewAccessLevel({...newAccessLevel, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-description">Description</Label>
                      <Input 
                        id="access-description" 
                        placeholder="Brief description of this access level"
                        value={newAccessLevel.description}
                        onChange={e => setNewAccessLevel({...newAccessLevel, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="mb-2 text-sm font-medium">Permissions</h3>
                      
                      {permissionCategories.map(category => (
                        <div key={category.id} className="mb-4 border rounded-md p-4">
                          <h4 className="font-medium mb-2">{category.name}</h4>
                          <div className="space-y-2">
                            {availablePermissions
                              .filter(perm => category.permissions.includes(perm.id))
                              .map(permission => (
                                <div key={permission.id} className="flex items-start space-x-2">
                                  <Checkbox 
                                    id={`perm-${permission.id}`}
                                    checked={newAccessLevel.permissions.includes(permission.id)}
                                    onCheckedChange={() => {
                                      setNewAccessLevel(togglePermission(permission.id, newAccessLevel));
                                    }}
                                  />
                                  <div className="grid gap-1.5 leading-none">
                                    <Label
                                      htmlFor={`perm-${permission.id}`}
                                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      {permission.name}
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                      {permission.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddAccessLevelDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAddAccessLevel}
                      disabled={!newAccessLevel.name || newAccessLevel.permissions.length === 0}
                    >
                      Create Access Level
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Edit Access Level Dialog */}
              <Dialog open={editAccessLevelDialogOpen} onOpenChange={setEditAccessLevelDialogOpen}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Access Level</DialogTitle>
                    <DialogDescription>
                      Modify the access level permissions
                    </DialogDescription>
                  </DialogHeader>
                  {editingAccessLevel && (
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                      <div className="space-y-2">
                        <Label htmlFor="edit-access-name">Name</Label>
                        <Input 
                          id="edit-access-name" 
                          value={editingAccessLevel.name}
                          onChange={e => setEditingAccessLevel({
                            ...editingAccessLevel, 
                            name: e.target.value
                          })}
                          disabled={editingAccessLevel.id === 1} // Can't edit Full Access name
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-access-description">Description</Label>
                        <Input 
                          id="edit-access-description" 
                          value={editingAccessLevel.description}
                          onChange={e => setEditingAccessLevel({
                            ...editingAccessLevel, 
                            description: e.target.value
                          })}
                          disabled={editingAccessLevel.id === 1} // Can't edit Full Access desc
                        />
                      </div>
                      
                      <div className="pt-2">
                        <h3 className="mb-2 text-sm font-medium">Permissions</h3>
                        
                        {permissionCategories.map(category => (
                          <div key={category.id} className="mb-4 border rounded-md p-4">
                            <h4 className="font-medium mb-2">{category.name}</h4>
                            <div className="space-y-2">
                              {availablePermissions
                                .filter(perm => category.permissions.includes(perm.id))
                                .map(permission => (
                                  <div key={permission.id} className="flex items-start space-x-2">
                                    <Checkbox 
                                      id={`edit-perm-${permission.id}`}
                                      checked={editingAccessLevel.permissions.includes(permission.id)}
                                      onCheckedChange={() => {
                                        setEditingAccessLevel(
                                          togglePermission(permission.id, editingAccessLevel)
                                        );
                                      }}
                                      disabled={editingAccessLevel.id === 1} // Can't change Full Access perms
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                      <Label
                                        htmlFor={`edit-perm-${permission.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {permission.name}
                                      </Label>
                                      <p className="text-sm text-muted-foreground">
                                        {permission.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditAccessLevelDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleUpdateAccessLevelDetails}
                      disabled={!editingAccessLevel?.name || editingAccessLevel?.permissions.length === 0}
                    >
                      Update Access Level
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Access Level Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessLevels.map(level => (
                    <TableRow key={level.id}>
                      <TableCell>
                        <div className="font-medium">
                          {getAccessLevelBadge(level.id)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {level.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {level.permissions.length > 3 ? (
                            <>
                              <Badge variant="secondary">
                                {level.permissions.length} permissions
                              </Badge>
                            </>
                          ) : (
                            level.permissions.map(permId => {
                              const perm = availablePermissions.find(p => p.id === permId);
                              return perm ? (
                                <Badge variant="outline" key={permId}>
                                  {perm.name}
                                </Badge>
                              ) : null;
                            })
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditAccessLevel(level)}
                            disabled={level.id === 1} // Can't edit Full Access
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          {level.id !== 1 && ( // Can't remove Full Access
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remove access level?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove the "{level.name}" access level.
                                    This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRemoveAccessLevel(level.id)}>
                                    Remove Access Level
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
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t p-6 flex flex-col text-sm text-muted-foreground space-y-2">
        <div className="flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          <span>Custom access levels allow you to define exactly what each administrator can see and modify.</span>
        </div>
        <p>The Full Access level cannot be modified and grants complete control over all system functions.</p>
      </CardFooter>
    </>
  );
};

