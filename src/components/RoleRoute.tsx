"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/types/auth";

type Props = {
  children: ReactNode;
  allow: Role[];
};

export default function RoleRoute({ children, allow }: Props) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    const authorized = allow.some((role) => hasRole(role));
    if (!authorized) {
      router.replace("/app/private");
    }
  }, [user, loading, allow, hasRole, router]);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (!user) return null;

  const authorized = allow.some((role) => hasRole(role));
  if (!authorized) return null;

  return <>{children}</>;
}
