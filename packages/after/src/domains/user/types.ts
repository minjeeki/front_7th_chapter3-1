export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export type UserRole = User['role'];
export type UserStatus = User['status'];

export interface CreateUserInput {
  username: string;
  email: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

