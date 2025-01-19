// src/app/types/auth.ts

export type UserRole = 'user' | 'serviceProvider' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  // Add other user properties
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}