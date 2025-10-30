// services/auth.ts
import api from "@/lib/api";

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  return api.post("/api/users/register/", data);
}

export async function loginUser(data: { email: string; password: string }) {
  return api.post("/api/users/login/", data);
}

export async function getProfile() {
  return api.get("/api/users/profile/");
}

export async function updateProfile(data: Record<string, unknown>) {
  return api.put("/api/users/profile/", data);
}

// --- Verificación de email ---
export async function requestEmailVerify(email: string) {
  await api.post("/api/users/email/verify/request/", { email });
}

export async function confirmEmailVerify(uid: number, token: string) {
  return api.post("/api/users/email/verify/confirm/", { uid, token });
}

// --- Reset de contraseña ---
export async function requestPasswordReset(email: string) {
  await api.post("/api/users/password/reset/request/", { email });
}

export async function confirmPasswordReset(
  uid: number,
  token: string,
  new_password: string
) {
  return api.post("/api/users/password/reset/confirm/", {
    uid,
    token,
    new_password,
  });
}

// --- Logout con blacklist ---
export async function logout(refresh: string) {
  try {
    await api.post("/api/users/logout/", { refresh });
  } finally {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}
