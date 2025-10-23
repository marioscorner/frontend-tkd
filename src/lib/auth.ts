import API from "./api";
import type { AuthResponse, User, Role } from "@/types/auth";

export async function registerUser(
  email: string,
  username: string,
  password: string,
  role?: Role
): Promise<AuthResponse> {
  const payload: Record<string, unknown> = { email, username, password };
  if (role) payload.role = role;

  const res = await API.post<AuthResponse>("users/register/", payload);
  return res.data;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const res = await API.post<AuthResponse>("users/login/", { email, password });
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  return res.data.user;
}

export function logoutUser(): void {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

export async function getProfile(): Promise<User> {
  const res = await API.get<User>("users/profile/");
  return res.data;
}
