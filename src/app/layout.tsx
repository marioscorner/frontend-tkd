import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taekwondo Mario Gutiérrez",
  description: "Plataforma oficial del gimnasio de Taekwondo - Mario Gutiérrez",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <AuthProvider>
          <main className="flex flex-col min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
