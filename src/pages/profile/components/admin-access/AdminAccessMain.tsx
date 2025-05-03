
import React, { useState } from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, Plus, UserCheck, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our component files
import { AdminList } from './AdminList';
import { AddAdminDialog } from './AddAdminDialog';
import { AccessLevelList } from './AccessLevelList';
import { AccessLevelDialog } from './AccessLevelDialog';

// Import types and utils
import { AdminUser, AccessLevel, Permission } from './types';
import { togglePermission, adminsUsingAccessLevel } from './utils';

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
    if (adminsUsingAccessLevel(id, adminsList)) {
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

  const handleNewAdminChange = (field: string, value: string | number) => {
    setNewAdmin({
      ...newAdmin,
      [field]: value
    });
  };
  
  const handleNewAccessLevelChange = (field: string, value: string) => {
    setNewAccessLevel({
      ...newAccessLevel,
      [field]: value
    });
  };
  
  const handleEditAccessLevelChange = (field: string, value: string) => {
    if (editingAccessLevel) {
      setEditingAccessLevel({
        ...editingAccessLevel,
        [field]: value
      });
    }
  };
  
  const handleNewAccessLevelPermissionToggle = (permissionId: string) => {
    setNewAccessLevel(togglePermission(permissionId, newAccessLevel));
  };
  
  const handleEditAccessLevelPermissionToggle = (permissionId: string) => {
    if (editingAccessLevel) {
      setEditingAccessLevel(prev => {
        if (!prev) return prev;
        return togglePermission(permissionId, prev);
      });
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
              <AddAdminDialog
                open={addAdminDialogOpen}
                onOpenChange={setAddAdminDialogOpen}
                newAdmin={newAdmin}
                onNewAdminChange={handleNewAdminChange}
                onAddAdmin={handleAddAdmin}
                accessLevels={accessLevels}
              />
            </div>
            
            <AdminList
              adminsList={adminsList}
              accessLevels={accessLevels}
              onUpdateAccessLevel={handleUpdateAccessLevel}
              onRemoveAdmin={handleRemoveAdmin}
            />
          </TabsContent>
          
          {/* Access Levels Tab */}
          <TabsContent value="access-levels" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Button size="sm" className="flex items-center" onClick={() => setAddAccessLevelDialogOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Create Access Level
              </Button>
              
              {/* Add Access Level Dialog */}
              <AccessLevelDialog
                isEdit={false}
                open={addAccessLevelDialogOpen}
                onOpenChange={setAddAccessLevelDialogOpen}
                accessLevel={newAccessLevel}
                onAccessLevelChange={handleNewAccessLevelChange}
                onPermissionChange={handleNewAccessLevelPermissionToggle}
                onSave={handleAddAccessLevel}
                permissionCategories={permissionCategories}
                availablePermissions={availablePermissions}
              />
              
              {/* Edit Access Level Dialog */}
              {editingAccessLevel && (
                <AccessLevelDialog
                  isEdit={true}
                  open={editAccessLevelDialogOpen}
                  onOpenChange={setEditAccessLevelDialogOpen}
                  accessLevel={editingAccessLevel}
                  onAccessLevelChange={handleEditAccessLevelChange}
                  onPermissionChange={handleEditAccessLevelPermissionToggle}
                  onSave={handleUpdateAccessLevelDetails}
                  permissionCategories={permissionCategories}
                  availablePermissions={availablePermissions}
                />
              )}
            </div>
            
            <AccessLevelList
              accessLevels={accessLevels}
              availablePermissions={availablePermissions}
              onEditAccessLevel={handleEditAccessLevel}
              onRemoveAccessLevel={handleRemoveAccessLevel}
            />
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
