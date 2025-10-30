"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";

type Blocked = { id: number; username: string };

export default function BlockedPage() {
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/friends/blocks/")
      .then((r) => setBlocked(r.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 sm:px-8">
      <div className="w-full max-w-6xl mx-auto bg-[var(--card)] rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-2">Bloqueados</h1>
        <p className="text-sm text-gray-400 mb-6">
          Usuarios que no pueden interactuar contigo.
        </p>

        {loading && <p className="text-sm text-gray-400">Cargando…</p>}
        {!loading && blocked.length === 0 && (
          <p className="text-sm text-gray-400">No hay usuarios bloqueados.</p>
        )}
        <ul className="space-y-2">
          {blocked.map((u) => (
            <li key={u.id} className="bg-black/20 rounded-xl p-4">{u.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
