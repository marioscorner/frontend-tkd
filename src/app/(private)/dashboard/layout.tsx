// src/app/(private)/dashboard/layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
// Si quieres header/footer privados, impórtalos y añádelos en el JSX:
import HeaderPrivate from "@/components/HeaderPrivate";
// import Footer from "@/components/Footer";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    // Si no hay usuario, redirige a login con la ruta de retorno
    if (!user) {
      const qp = new URLSearchParams({ redirectTo: pathname }).toString();
      router.replace(`/login?${qp}`);
    }
  }, [loading, user, router, pathname]);

  // Evita pintar UI privada mientras aún no sabemos si hay sesión
  if (loading) return <div className="min-h-screen grid place-items-center text-sm text-gray-400">Comprobando sesión…</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* <HeaderPrivate /> */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
