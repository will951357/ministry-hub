
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PermissionsSelector } from './PermissionsSelector';
import { AccessLevel } from "./types";

interface AccessLevelDialogProps {
  isEdit: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accessLevel: Partial<AccessLevel>;
  onAccessLevelChange: (field: string, value: string) => void;
  onPermissionChange: (permissionId: string) => void;
  onSave: () => void;
  permissionCategories: {
    id: string;
    name: string;
    permissions: string[];
  }[];
  availablePermissions: {
    id: string;
    name: string;
    description: string;
  }[];
}

export const AccessLevelDialog: React.FC<AccessLevelDialogProps> = ({
  isEdit,
  open,
  onOpenChange,
  accessLevel,
  onAccessLevelChange,
  onPermissionChange,
  onSave,
  permissionCategories,
  availablePermissions
}) => {
  // Check if we're editing the Full Access level (id === 1)
  const isFullAccess = isEdit && accessLevel.id === 1;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Access Level' : 'Create New Access Level'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Modify the access level permissions' : 'Define a new access level with specific permissions'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="access-name">Name</Label>
            <Input 
              id="access-name" 
              placeholder="Access level name"
              value={accessLevel.name || ''}
              onChange={e => onAccessLevelChange('name', e.target.value)}
              disabled={isFullAccess}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="access-description">Description</Label>
            <Input 
              id="access-description" 
              placeholder="Brief description of this access level"
              value={accessLevel.description || ''}
              onChange={e => onAccessLevelChange('description', e.target.value)}
              disabled={isFullAccess}
            />
          </div>
          
          <PermissionsSelector
            permissionCategories={permissionCategories}
            availablePermissions={availablePermissions}
            selectedPermissions={accessLevel.permissions || []}
            onPermissionChange={onPermissionChange}
            disableEditing={isFullAccess}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSave}
            disabled={!accessLevel.name || (accessLevel.permissions && accessLevel.permissions.length === 0)}
          >
            {isEdit ? 'Update Access Level' : 'Create Access Level'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
