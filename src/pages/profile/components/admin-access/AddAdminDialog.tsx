
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccessLevel } from "./types";

interface AddAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newAdmin: {
    name: string;
    email: string;
    accessLevelId: number;
  };
  onNewAdminChange: (field: string, value: string | number) => void;
  onAddAdmin: () => void;
  accessLevels: AccessLevel[];
}

export const AddAdminDialog: React.FC<AddAdminDialogProps> = ({ 
  open, 
  onOpenChange, 
  newAdmin, 
  onNewAdminChange, 
  onAddAdmin, 
  accessLevels 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onChange={e => onNewAdminChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input 
              id="admin-email" 
              type="email" 
              placeholder="administrator@example.com" 
              value={newAdmin.email}
              onChange={e => onNewAdminChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-role">Access Level</Label>
            <Select 
              value={newAdmin.accessLevelId.toString()} 
              onValueChange={value => onNewAdminChange('accessLevelId', parseInt(value))}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onAddAdmin} disabled={!newAdmin.name || !newAdmin.email}>
            Add Administrator
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
