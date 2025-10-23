"use client";

import Link from "next/link";

export default function HeaderPublic() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="font-bold text-xl">🥋 Taekwondo Mario Gutiérrez</div>
        <ul className="flex gap-4 text-sm font-medium">
          <li><Link href="/" className="hover:underline">Inicio</Link></li>
          <li><Link href="/about" className="hover:underline">Sobre mí</Link></li>
          <li><Link href="/docs" className="hover:underline">Docs</Link></li>
          <li><Link href="/login" className="hover:underline">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}
