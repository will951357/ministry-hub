
import { AccessLevel } from "./types";

/**
 * Toggle a permission in a permissions array
 */
export function togglePermission<T extends { permissions: string[] }>(
  permissionId: string, 
  targetState: T
): T {
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
}

/**
 * Get an access level by ID
 */
export function getAccessLevelById(
  id: number, 
  accessLevels: AccessLevel[]
): AccessLevel {
  return accessLevels.find(level => level.id === id) || accessLevels[0];
}

/**
 * Check if any admins are using a specific access level
 */
export function adminsUsingAccessLevel(
  accessLevelId: number, 
  adminsList: { accessLevelId: number }[]
): boolean {
  return adminsList.some(admin => admin.accessLevelId === accessLevelId);
}
