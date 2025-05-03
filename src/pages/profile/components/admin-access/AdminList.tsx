
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AdminUser, AccessLevel } from "./types";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminListProps {
  adminsList: AdminUser[];
  accessLevels: AccessLevel[];
  onUpdateAccessLevel: (id: number, accessLevelId: number) => void;
  onRemoveAdmin: (id: number) => void;
}

export const AdminList: React.FC<AdminListProps> = ({ 
  adminsList, 
  accessLevels, 
  onUpdateAccessLevel, 
  onRemoveAdmin 
}) => {
  
  const getAccessLevelById = (id: number) => {
    return accessLevels.find(level => level.id === id) || accessLevels[0];
  };
  
  const getAccessLevelBadge = (accessLevelId: number) => {
    const level = getAccessLevelById(accessLevelId);
    const defaultClass = "border px-2 py-0.5 rounded-full text-xs font-medium";
    
    if (level.color) {
      return <span className={`${defaultClass} ${level.color}`}>{level.name}</span>;
    }
    
    return <Badge variant="outline">{level.name}</Badge>;
  };

  return (
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
                    onValueChange={value => onUpdateAccessLevel(admin.id, parseInt(value))}
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
                          <AlertDialogAction onClick={() => onRemoveAdmin(admin.id)}>
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
  );
};
