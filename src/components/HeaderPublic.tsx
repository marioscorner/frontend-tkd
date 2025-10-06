"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function HeaderPublic() {
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <header className="border-b bg-white p-4 shadow">
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <div className="font-bold text-xl text-gray-800">
          🥋 Taekwondo Mario Gutiérrez
        </div>

        {/* Menú */}
        <ul className="flex gap-4 text-gray-700">
          <li>
            <Link href="/" className="hover:underline">Inicio</Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">Sobre mí</Link>
          </li>
          <li>
            <Link href="/docs" className="hover:underline">Docs</Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link href="/login" className="hover:underline">Login</Link>
            </li>
          )}

          {isLoggedIn && (
            <>
              <li>
                <Link href="/dashboard/perfil" className="hover:underline">
                  Perfil {user?.name && `(${user.name})`}
                </Link>
              </li>
              <li>
                <button 
                  onClick={logout} 
                  className="text-red-600 hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}
