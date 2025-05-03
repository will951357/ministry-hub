
// Shared types for admin access
export type AdminUser = {
  id: number;
  name: string;
  email: string;
  accessLevelId: number;
  avatar: string;
};

export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type AccessLevel = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  color?: string;
};
