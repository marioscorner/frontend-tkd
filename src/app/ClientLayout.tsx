"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import LayoutHeader from "@/components/LayoutHeader";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <LayoutHeader />
      <main className="flex-1 w-full mx-auto max-w-6xl px-4 py-8">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
