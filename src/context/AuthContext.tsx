"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getProfile, loginUser, logoutUser } from "@/lib/auth";
import type { User, Role } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

// 🔒 1. Creamos el contexto, sin permitir undefined
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    const u = await loginUser(email, password);
    setUser(u);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const hasRole = (...roles: Role[]) => !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

// 🔒 2. Hook seguro (garantiza que nunca será undefined)
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
