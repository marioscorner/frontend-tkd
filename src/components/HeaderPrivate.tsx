// src/components/HeaderPrivate.tsx
"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderPrivate() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-gray-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="font-bold text-lg">Área privada 🥋</div>
        <ul className="flex gap-4 text-sm font-medium items-center">
          <li><Link href="/dashboard" className="hover:underline">Inicio</Link></li>
          <li><Link href="/dashboard/docs" className="hover:underline">Documentos</Link></li>
          <li><Link href="/dashboard/profile" className="hover:underline">Perfil</Link></li>
          {user && <li className="opacity-80">Bienvenido, <span className="font-semibold">{user.username}</span></li>}
          {user && (
            <li>
              <button onClick={logout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
                Cerrar sesión
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
