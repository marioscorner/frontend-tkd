
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import HeaderPublic from "@/components/HeaderPublic";
import HeaderPrivate from "@/components/HeaderPrivate";
import FooterPublic from "@/components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPrivate = pathname?.startsWith("/dashboard"); // URL real (los grupos de ruta NO salen en la URL)

  return (
    <AuthProvider>
      {/* Header fijo, escoge uno u otro */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {isPrivate ? <HeaderPrivate /> : <HeaderPublic />}
      </div>

      {/* deja espacio para el header y el footer fijos */}
      <main className="min-h-screen pt-20 pb-16">{children}</main>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <FooterPublic />
      </div>
    </AuthProvider>
  );
}
