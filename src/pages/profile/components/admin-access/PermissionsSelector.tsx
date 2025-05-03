
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PermissionSelectorProps {
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
  selectedPermissions: string[];
  onPermissionChange: (permissionId: string) => void;
  disableEditing?: boolean;
}

export const PermissionsSelector: React.FC<PermissionSelectorProps> = ({
  permissionCategories,
  availablePermissions,
  selectedPermissions,
  onPermissionChange,
  disableEditing = false
}) => {
  return (
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
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => onPermissionChange(permission.id)}
                    disabled={disableEditing}
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
  );
};
