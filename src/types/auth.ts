export type Role = "ADMIN" | "INSTRUCTOR" | "ALUMNO";
export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  access: string; // Contiene el Role
  refresh: string;
}
