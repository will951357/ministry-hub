
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { AccessLevel } from "./types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface AccessLevelListProps {
  accessLevels: AccessLevel[];
  availablePermissions: {
    id: string;
    name: string;
    description: string;
  }[];
  onEditAccessLevel: (level: AccessLevel) => void;
  onRemoveAccessLevel: (id: number) => void;
}

export const AccessLevelList: React.FC<AccessLevelListProps> = ({
  accessLevels,
  availablePermissions,
  onEditAccessLevel,
  onRemoveAccessLevel
}) => {

  const getAccessLevelBadge = (level: AccessLevel) => {
    const defaultClass = "border px-2 py-0.5 rounded-full text-xs font-medium";
    
    if (level.color) {
      return <span className={`${defaultClass} ${level.color}`}>{level.name}</span>;
    }
    
    // Default styling
    return <Badge variant="outline">{level.name}</Badge>;
  };

  return (
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
                  {getAccessLevelBadge(level)}
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
                    onClick={() => onEditAccessLevel(level)}
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
                          <AlertDialogAction onClick={() => onRemoveAccessLevel(level.id)}>
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
  );
};
