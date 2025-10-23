"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode, useMemo } from "react";
import HeaderPrivate from "@/components/HeaderPrivate";
import Footer from "@/components/Footer";
import RoleRoute from "@/components/RoleRoute";
import type { Role } from "@/types/auth";

interface PrivateLayoutProps {
  children: ReactNode;
  /** Roles permitidos por defecto si no hay regla específica */
  allow?: Role[];
}

/**
 * Reglas de acceso por prefijo de ruta.
 * Si la ruta empieza por ese prefijo, solo los roles indicados podrán acceder.
 * Se evalúan en orden, el primero que coincida se aplica.
 */
const routeRules: Array<{ prefix: string; allow: Role[] }> = [
  { prefix: "/dashboard/admin", allow: ["ADMIN"] },
  { prefix: "/dashboard/panel", allow: ["ADMIN", "INSTRUCTOR"] },
  // Ejemplo: chats disponible para todos
  { prefix: "/dashboard/chats", allow: ["ADMIN", "INSTRUCTOR", "ALUMNO"] },
];

export default function PrivateLayout({ children, allow }: PrivateLayoutProps) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  /** Roles por defecto si la ruta no coincide con ninguna regla */
  // fallbackRoles moved inside useMemo to avoid changing the dependency reference every render

  /** Determinar roles requeridos para esta ruta */
  const neededRoles: Role[] = useMemo(() => {
    const fallbackRoles: Role[] = allow ?? ["ADMIN", "INSTRUCTOR", "ALUMNO"];
    const match = routeRules.find((r) => pathname.startsWith(r.prefix));
    return match ? match.allow : fallbackRoles;
  }, [pathname, allow]);

  /** Redirigir a login si no hay usuario */
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  /** Redirigir si el rol no tiene permiso para la ruta */
  useEffect(() => {
    if (!loading && user) {
      const authorized = neededRoles.some((role) => hasRole(role));
      if (!authorized) {
        router.replace("/dashboard");
      }
    }
  }, [loading, user, neededRoles, hasRole, router]);

  if (loading) {
    return <div className="p-8 text-center">Cargando...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Encabezado */}
      <HeaderPrivate />

      {/* Contenido */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <RoleRoute allow={neededRoles}>{children}</RoleRoute>
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
