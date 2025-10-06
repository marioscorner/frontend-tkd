export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}
